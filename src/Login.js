import React, { useState } from 'react';
import './Signup.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Username:', loginInfo.username);
        console.log('Password:', loginInfo.password);
        // Add your authentication logic here
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter your username...'
                        value={loginInfo.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? <a href="/signup">Register</a></span>
            </form>
        </div>
    );
}

export default Login;
