import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {toast} from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import './Signup.css'; // Remove this line if not needed

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = signupInfo;

        if (!name || !username || !email || !password) {
            return handleError('All fields are required (name, username, email, and password)');
        }

        try {
            const url = 'http://localhost:5000/api/v1/user/signup'; // Adjust URL if needed
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();

            // If the signup is successful
            if (response.ok) {
                handleSuccess('User registered successfully!');
                toast.success("User registered successfully!")
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                // Handle error response gracefully
                const error = result.error || result.message;
                if (error && error.details && error.details.length > 0) {
                    handleError(error.details[0].message); // If error.details exists
                } else {
                    handleError(error || 'An unknown error occurred.'); // Fallback for unknown errors
                }
            }

        } catch (err) {
            handleError('Internal server error. Please try again later.');
            console.error('Signup error:', err);
        }
    };

    const handleError = (message) => {
        console.error(message);
    };

    const handleSuccess = (message) => {
        console.log(message);
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#141332] ">
            <div className="w-1/4 p-8 space-y-3 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-black">Signup</h1>
                <form onSubmit={handleSignup} className="space-y-4 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor='username'>Username</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='username'
                            placeholder='Enter your username...'
                            value={signupInfo.username}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        Signup
                    </button>
                    <span className="block text-center text-sm">
                        Already have an account? 
                        <Link to="/login" className="text-indigo-600 hover:underline"> Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
