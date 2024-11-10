import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import "./Signup.css"; // Remove this line if not needed

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = loginInfo;
        if (!username || !password) {
            return handleError('Username and password are required');
        }
        console.log("inside handle login");
        try {
            const url = `http://localhost:5000/api/v1/user/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
                credentials: 'include'  // Ensures cookies are sent with the request
            });
        
            const result = await response.json();
            console.log(result);

            navigate('/Dashboard');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center min-h-screen bg-[#141332]">
            <div className="w-1/4 p-8 space-y-3 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-black">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor='username'>Username</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='username'
                            placeholder='Enter your username...'
                            value={loginInfo.username}
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
                            value={loginInfo.password}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        Login
                    </button>
                    <span className="block text-center text-sm">
                        Don't have an account? 
                        <Link to="/signup" className="text-indigo-600 hover:underline"> Register</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
