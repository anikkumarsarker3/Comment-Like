import React from 'react';
import ChatImg1 from '../../assets/images/chat1_img.png'
import ChatImg2 from '../../assets/images/chat2_img.png'
import ChatImg3 from '../../assets/images/chat3_img.png'

const RightSide = () => {
    return (
        <aside className="w-72 bg-white shadow p-4 space-y-6 hidden lg:block">
            <div>
                <h3 className="font-semibold mb-3">You Might Like</h3>
                <div className="flex items-center gap-3">
                    <img src={ChatImg1} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-semibold">Radovan SkillArena</p>
                        <button className="text-blue-600 text-sm font-medium">Follow</button>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Your Friends</h3>
                <div className="flex items-center gap-3 mb-3">
                    <img src={ChatImg2} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">Steve Jobs</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <img src={ChatImg3} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">Ryan Roslansky</p>
                        <p className="text-xs text-gray-500">CEO of LinkedIn</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default RightSide;