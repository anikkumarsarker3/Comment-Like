import React from 'react';
import { useForm } from 'react-hook-form';
import profile from '../../assets/images/profile.png'
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PostInputBox = ({ refreshPosts }) => {
    const { user, loading } = useAuth();
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure();

    if (loading) {
        return <p>Loading...</p>
    }

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        axios.post(`https://api.imgbb.com/1/upload?key=27c1fb04334e761096debf5bd8cd0993`, formData)
            .then(res => {
                const img_url = res.data.data.url
                axiosSecure.get(`/user?email=${user.email}`)
                    .then(res => {
                        const post = {
                            author_id: res.data[0]._id,
                            author_name: user.displayName,
                            email: user.email,
                            content: data.content,
                            image: img_url,
                            visibility: data.mode,
                            likes: []
                        }
                        axiosSecure.post(`/posts`, post)
                        refreshPosts();
                    })
                reset();
            })


        // console.log()
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-3">
                    <img
                        src={profile}
                        className="w-10 h-10 rounded-full"
                    />
                    {/* <textarea name="" id=""></textarea> */}
                    <textarea
                        rows={2}
                        cols={30}
                        type="text"
                        placeholder="Write something..."
                        className="flex-1 bg-gray-100 px-4 py-2 rounded-2xl outline-none row-5"
                        {...register('content')}
                    />
                    <select class="border border-gray-200 rounded-lg px-3 py-2 " {...register('mode')}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                <div className="flex justify-between mt-4 text-gray-600 text-sm">

                    <label className="flex items-center space-x-1 font-semibold cursor-pointer">
                        <span>📷</span>
                        <span>Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register?.("image")}
                        />
                    </label>

                    <button className="hover:text-blue-600">🎥 Video</button>
                    <button className="hover:text-blue-600">📅 Event</button>
                    <button className="hover:text-blue-600">📝 Article</button>
                    <button type='submit' className="btn bg-blue-600 text-white px-4 py-1 rounded-lg">Post</button>
                </div>
            </form>
        </div >
    );
};

export default PostInputBox;