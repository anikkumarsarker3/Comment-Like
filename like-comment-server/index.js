const express = require("express");
const cors = require("cors");
require('dotenv').config()
const admin = require("firebase-admin");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const PORT = 3000;



const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors({
    origin: [
        "https://appify-c59b9.web.app",
        "https://fascinating-cheesecake-194c8e.netlify.app",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ----- MongoDB Connection -----
const uri = process.env.MONGO_uri;
const client = new MongoClient(uri);
let db, usersCol, postsCol;

async function connectDB() {
    db = client.db("socialmedia");
    usersCol = db.collection("users");
    postsCol = db.collection("posts");
    // console.log("Connected to MongoDB");
}
connectDB();

// ----- JWT Middleware -----
const verifyJWT = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Unauthorized Access!' });

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized Access!', err });
    }
}

// ----- User APIs -----
app.post("/user", async (req, res) => {
    try {
        const { email, name } = req.body;
        const user = { email, name, created_at: new Date() };
        const result = await usersCol.insertOne(user);
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/user", async (req, res) => {
    try {
        const { email } = req.query;
        let query = {};
        if (email) query = { email };
        const result = await usersCol.find(query).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post("/posts", verifyJWT, async (req, res) => {
    try {
        const { author_id, author_name, content, image, visibility } = req.body;
        const post = {
            author_email: req.userEmail,
            author_id,
            author_name,
            content,
            image,
            visibility: visibility || "public",
            likes: [],
            comments: [],
            created_at: new Date()
        };

        const result = await postsCol.insertOne(post);
        res.send(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get posts (newest first, public + own posts)
app.get("/posts", verifyJWT, async (req, res) => {
    try {
        const query = {
            $or: [
                { visibility: "public" },
                { author_email: req.userEmail }
            ]
        };
        const posts = await postsCol.find(query).sort({ created_at: -1 }).toArray();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like/unlike a post
app.patch("/posts/:id/like", verifyJWT, async (req, res) => {
    try {
        const postId = req.params.id;
        const email = req.userEmail;

        const post = await postsCol.findOne({ _id: new ObjectId(postId) });
        if (!post) return res.status(404).json({ error: "Post not found" });

        const update = post.likes.includes(email)
            ? { $pull: { likes: email } }    // unlike
            : { $addToSet: { likes: email } }; // like

        await postsCol.updateOne({ _id: new ObjectId(postId) }, update);
        const updatedPost = await postsCol.findOne({ _id: new ObjectId(postId) });

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Comment on a post
app.post("/posts/:id/comment", verifyJWT, async (req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;
        const comment = {
            _id: new ObjectId(),
            email: req.userEmail,
            text,
            likes: [],
            replies: [],
            created_at: new Date()
        };

        await postsCol.updateOne(
            { _id: new ObjectId(postId) },
            { $push: { comments: comment } }
        );

        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like a comment
app.patch("/posts/:postId/comment/:commentId/like", verifyJWT, async (req, res) => {
    try {
        await postsCol.updateOne(
            { _id: new ObjectId(req.params.postId), "comments._id": new ObjectId(req.params.commentId) },
            { $addToSet: { "comments.$.likes": req.userEmail } }
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reply to a comment
app.post("/posts/:postId/comment/:commentId/reply", verifyJWT, async (req, res) => {
    try {
        const { text } = req.body;
        const reply = {
            _id: new ObjectId(),
            email: req.userEmail,
            text,
            likes: [],
            created_at: new Date()
        };

        await postsCol.updateOne(
            { _id: new ObjectId(req.params.postId), "comments._id": new ObjectId(req.params.commentId) },
            { $push: { "comments.$.replies": reply } }
        );

        res.json(reply);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Appify server Running');
});

// ----- Start Server -----
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
