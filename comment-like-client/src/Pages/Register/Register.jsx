import React, { use } from 'react';
import regImg from '../../assets/images/registration.png'
import logo from '../../assets/images/logo.svg'
import shapImg1 from '../../assets/images/shape1.svg'
import shapImg2 from '../../assets/images/shape2.svg'
import shapImg3 from '../../assets/images/shape3.svg'
import { Link, Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm()
    const axioxSecure = useAxiosSecure();
    const { user, setUser, loading, createuser, createuserByGoogle, logoutUser, updateElement } = useAuth();
    const pass = watch('password')
    const rePass = watch('reaptPassword')
    // console.log(pass)
    if (user) {
        return <Navigate to='/'></Navigate>
    }

    const onSubmit = (data) => {
        console.log(data)
        const name = data.firstName + ' ' + data.lastName;
        createuser(data.email, data.password)
            .then(() => {
                axioxSecure.post('/user', { name, email: data.email })
                updateElement({ displayName: name })
                logoutUser()
                    .then(() => {
                        setUser(null)
                    })
                Swal.fire({
                    title: "Successfull registration",
                    text: "Please login",
                    icon: "success"
                });

            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Registration fail",
                });
            })
    }
    const handleGoogleRegister = () => {
        createuserByGoogle()
            .then((data) => {
                axioxSecure.post('/user', { name: data.user.displayName, email: data.user.email })
                logoutUser()
                setUser(null);
                Swal.fire({
                    title: "Successfull registration",
                    text: "Please login with Google",
                    icon: "success"
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Registration fail",
                });
            })
    }


    return (
        <div className='relative flex justify-around bg-gray-100 dark:bg-gray-900 items-center z-5'>
            <div className=''>
                <img src={regImg} alt="" className='h-screen' />
            </div>

            <img src={shapImg1} alt="" className='absolute top-0 left-0' />
            <img src={shapImg2} alt="" className='absolute top-0 right-0 z-0 w-1/3' />
            <img src={shapImg3} alt="" className='absolute right-0 bottom-0 w-1/3' />


            <div className="w-md px-6 py-10 bg-white rounded-2xl dark:bg-gray-900 z-10 mr-5">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="logo"
                        className=""
                    />
                </div>

                {/* Headings */}
                <p className="text-center text-gray-500 mb-1">Get Started Now</p>
                <h2 className="text-center text-2xl font-semibold mb-8">Registration</h2>

                {/* Google button */}
                <button onClick={handleGoogleRegister} className="btn w-full bg-gray-100 dark:bg-gray-900 text-gray-700 border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Register with google
                </button>


                {/* OR divider */}
                <div className="flex items-center mb-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-400">Or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:border-blue-500 outline-none"
                        {...register('firstName', { required: 'First Name is requrid' })}
                    />
                    {
                        errors.firstName && (
                            <p className='text-red-600'>{errors.firstName.message}</p>)
                    }
                    <label className="block text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:border-blue-500 outline-none"
                        {...register('lastName', { required: 'Last Name is required' })}
                    />
                    {
                        errors.lastName && (
                            <p className='text-red-600'>{errors.lastName.message}</p>)
                    }
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:border-blue-500 outline-none"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {
                        errors.email && (
                            <p className='text-red-600'>{errors.email.message}</p>)
                    }

                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:border-blue-500 outline-none"
                        {...register('password', {
                            required: "Password is required", pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message:
                                    "Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be at least 6 characters long",
                            }
                        })}
                    />
                    {
                        errors.password && (
                            <p className='text-red-600'>{errors.password.message}</p>)
                    }
                    <label className="block text-gray-700 mb-1">Repeat Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:border-blue-500 outline-none"
                        {
                        ...register('reaptPassword', {
                            required: "Password is required", pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                message:
                                    "Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be at least 6 characters long",
                            }
                        })
                        }
                    />

                    {
                        pass !== rePass ? <p className='text-red-600'>Password no match</p> : ''
                    }
                    {/* Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 text-blue-600"
                            {...register('checkBox', { required: "You must agree to continue" })}
                        />
                        <span className="text-gray-600 text-sm">
                            I agree to terms & conditions
                        </span>

                    </div>
                    {
                        errors.checkBox && <p className='text-red-500 mb-4'>{errors.checkBox.message}</p>
                    }

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium"
                    >
                        Login now
                    </button>
                </form>

                {/* Bottom text */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?

                    <Link to='/login' className="text-blue-600 font-medium ml-1">Login</Link>
                </p>
            </div>

        </div>
    );
};

export default Register;