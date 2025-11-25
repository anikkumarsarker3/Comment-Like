
import regImg from '../../assets/images/login.png'
import logo from '../../assets/images/logo.svg'
import shapImg1 from '../../assets/images/shape1.svg'
import shapImg2 from '../../assets/images/shape2.svg'
import shapImg3 from '../../assets/images/shape3.svg'
import { Link, Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Login = () => {
    const { user, loading, logIn, createuserByGoogle } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm()
    if (loading) {
        return <p>Loading...</p>
    }
    if (user) {
        return <Navigate to='/'></Navigate>
    }
    const onSubmit = (data) => {
        // console.log(data)
        logIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: "Successfull Login",
                    text: "You clicked the button!",
                    icon: "success"
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Login fail",
                });
            })
    }
    const handleGoogleLogin = () => {
        createuserByGoogle()
            .then(() => {
                Swal.fire({
                    title: "Successfull Login",
                    icon: "success"
                });
            })
    }
    return (
        <div className='relative flex justify-around bg-gray-100 dark:bg-gray-900 items-center z-5'>
            <div className=''>
                <img src={regImg} alt="" className='max-h-screen' />
            </div>

            <img src={shapImg1} alt="" className='absolute top-0 left-0' />
            <img src={shapImg2} alt="" className='absolute top-0 right-0 z-0 w-1/3' />
            <img src={shapImg3} alt="" className='absolute right-0 bottom-0 w-1/3' />


            <div className="max-w-md px-6 py-10 bg-white rounded-2xl dark:bg-gray-900 z-10">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-10"
                    />
                </div>

                {/* Headings */}
                <p className="text-center text-gray-500 mb-1">Welcome back</p>
                <h2 className="text-center text-2xl font-semibold mb-8">Login to your account</h2>

                {/* Google button */}
                <button onClick={handleGoogleLogin} className="btn w-full bg-gray-100 dark:bg-gray-900 text-gray-700 border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign-in with google
                </button>


                {/* OR divider */}
                <div className="flex items-center mb-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-400">Or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:border-blue-500 outline-none"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {
                        errors.email && (
                            <p className='text-red-600'>{errors.email.message}</p>)
                    }

                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:border-blue-500 outline-none"
                        {
                        ...register('password', { required: 'Password is required' })
                        }
                    />
                    {
                        errors.password && (
                            <p className='text-red-600'>{errors.password.message}</p>)
                    }


                    {/* Checkbox */}
                    <div className='flex justify-between items-center mb-6'>
                        <div className="flex justify-center items-center">
                            <input
                                type="checkbox"
                                className="mr-2 h-4 w-4 text-blue-600"
                            />
                            <span className="text-gray-600 text-sm">
                                Remember me
                            </span>
                        </div>
                        <p className='text-blue-400'>Forgot password?</p>
                    </div>

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
                    Don’t have an account?
                    <Link to='/register' className="text-blue-600 font-medium ml-1">Create New Account</Link>

                </p>
            </div>

        </div>
    );
};

export default Login;