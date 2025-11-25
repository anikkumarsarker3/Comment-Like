import React from 'react';

const LeftSide = () => {
    return (
        <aside className="w-64 bg-white shadow p-4 space-y-4 hidden md:block">
            <h2 className="text-xl font-semibold mb-4">Explore</h2>
            <nav className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>📘</span> <span>Learning</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>📊</span> <span>Insights</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>👥</span> <span>Find Friends</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>🔖</span> <span>Bookmarks</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>👪</span> <span>Groups</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <span>🎮</span> <span>Gaming</span>
                </div>
            </nav>
        </aside>
    );
};

export default LeftSide;