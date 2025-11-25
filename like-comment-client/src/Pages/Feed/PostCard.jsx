import React, { useEffect, useState } from 'react';
import commonimage from '../../assets/images/profile.png';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PostCard = ({ refresh }) => {
    const { user, loading } = useAuth();
    const [posts, setPosts] = useState([]);
    const axios = useAxiosSecure();
    const [showLikes, setShowLikes] = useState({});
    const [showComments, setShowComments] = useState({});
    const [commentText, setCommentText] = useState({}); // store per-post comment text

    useEffect(() => {
        fetchPosts();
    }, [refresh]);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/posts', {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async (postId) => {
        await axios.patch(`/posts/${postId}/like`, { email: user.email });
        fetchPosts();
    };

    const handleComment = async (postId) => {
        if (!commentText[postId]) return;
        const res = await axios.post(`/posts/${postId}/comment`, {
            email: user.email,
            text: commentText[postId]
        });
        setCommentText(prev => ({ ...prev, [postId]: '' }));
        setPosts(prevPosts => prevPosts.map(post =>
            post._id === postId
                ? { ...post, comments: [...(post.comments || []), res.data] }
                : post
        ));
    };

    const handleCommentLike = async (postId, commentId) => {
        try {
            await axios.patch(`/posts/${postId}/comment/${commentId}/like`, { email: user.email });
            setPosts(prevPosts => prevPosts.map(post => {
                if (post._id !== postId) return post;
                return {
                    ...post,
                    comments: (post.comments || []).map(comment => {
                        if (comment._id !== commentId) return comment;
                        // Prevent duplicate likes
                        const alreadyLiked = comment.likes?.includes(user.email);
                        return {
                            ...comment,
                            likes: alreadyLiked ? comment.likes : [...(comment.likes || []), user.email]
                        };
                    })
                };
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleReply = async (postId, commentId, replyText) => {
        if (!replyText) return;
        try {
            const res = await axios.post(`/posts/${postId}/comment/${commentId}/reply`, {
                email: user.email,
                text: replyText
            });

            setPosts(prevPosts => prevPosts.map(post => {
                if (post._id !== postId) return post;
                return {
                    ...post,
                    comments: (post.comments || []).map(comment => {
                        if (comment._id !== commentId) return comment;
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), res.data]
                        };
                    })
                };
            }));
        } catch (err) {
            console.log(err);
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <>
            {posts.map(post => (
                <div key={post._id} className="bg-white p-4 rounded-xl shadow mb-5">
                    <div className="flex items-center gap-3 mb-3">
                        <img src={commonimage} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{post.author_name}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} • {post.visibility}
                            </p>
                        </div>
                    </div>

                    <p className="mb-3">{post.content}</p>
                    {post.image && <img src={post.image} className="w-full rounded-lg mb-3" />}

                    {/* LIKE / COMMENT / SHARE */}
                    <div className="flex justify-between items-center text-gray-600 text-sm border-t pt-4 mt-4">

                        {/* LIKE BUTTON + TOOLTIP */}
                        <div
                            onMouseEnter={() => setShowLikes(prev => ({ ...prev, [post._id]: true }))}
                            onMouseLeave={() => setShowLikes(prev => ({ ...prev, [post._id]: false }))}
                            className="relative"
                        >
                            <button
                                onClick={() => handleLike(post._id)}
                                className="btn rounded-full flex items-center gap-2 hover:text-blue-600 hover:font-bold transition"
                            >
                                👍 Like ({post.likes.length})
                            </button>

                            {showLikes[post._id] && post.likes.length > 0 && (
                                <div className="absolute -top-10 left-0 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 whitespace-nowrap">
                                    {post.likes.join(", ")}
                                </div>
                            )}
                        </div>

                        {/* COMMENT BUTTON */}
                        <div>
                            <button
                                onClick={() => setShowComments(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
                                className="btn rounded-full flex items-center gap-2 hover:text-blue-600 transition"
                            >
                                💬 Comment
                            </button>

                            {showComments[post._id] && (
                                <div className="mt-3 space-y-2">
                                    {post.comments?.map(comment => (
                                        <div key={comment._id} className="border p-2 rounded">
                                            <p className="text-sm">{comment.email}: {comment.text}</p>
                                            <button
                                                className="text-xs text-blue-500"
                                                onClick={() => handleCommentLike(post._id, comment._id)}
                                            >
                                                👍 {comment.likes.length}
                                            </button>

                                            {/* Reply */}
                                            <div className="mt-1">
                                                {comment.replies?.map(reply => (
                                                    <p key={reply._id} className="text-xs ml-4">{reply.email}: {reply.text}</p>
                                                ))}
                                                <ReplyBox onReply={(text) => handleReply(post._id, comment._id, text)} />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            className="border p-1 flex-1 rounded"
                                            value={commentText[post._id] || ''}
                                            onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                                        />
                                        <button
                                            onClick={() => handleComment(post._id)}
                                            className="bg-blue-500 text-white px-2 rounded"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="flex items-center gap-2 hover:text-blue-600 transition">↗ Share</button>
                    </div>
                </div>
            ))}
        </>
    );
};

const ReplyBox = ({ onReply }) => {
    const [replyText, setReplyText] = useState("");
    return (
        <div className="flex gap-2 mt-1">
            <input
                type="text"
                placeholder="Reply..."
                className="border p-1 flex-1 rounded text-xs"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
            />
            <button
                className="bg-gray-300 px-2 rounded text-xs"
                onClick={() => { onReply(replyText); setReplyText(""); }}
            >
                Reply
            </button>
        </div>
    );
};

export default PostCard;
