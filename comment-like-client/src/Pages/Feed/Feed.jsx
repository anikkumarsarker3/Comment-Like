import React, { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Story from "./Story";
import PostInputBox from "./PostInputBox";
import PostCard from "./PostCard";
// const promisePost = fetch('http://localhost:3000/posts').then(res => res.json())



export default function Feed() {
    const [refresh, setRefresh] = useState(false);

    const refreshPosts = () => setRefresh(prev => !prev);
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="sticky top-0 h-screen">
                <LeftSide></LeftSide>
            </div>

            {/* MIDDLE FEED */}
            <main className="flex-1 max-w-2xl mx-auto p-4">
                <Story></Story>
                <PostInputBox refreshPosts={refreshPosts}></PostInputBox>

                <PostCard refresh={refresh}></PostCard>

            </main>
            <div className="sticky top-0 h-screen">
                <RightSide></RightSide>
            </div>

        </div>
    );
}
