import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
import "./Signup.css"

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = loginInfo;
        if (!username || !password) {
            return handleError('username and password are required')
        }
        console.log("inside handle login")
        try {
            console.log("inside handle login");
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
            
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div className='container' onSubmit={handleLogin}>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='username'
                        placeholder='Enter your username...'
                        value={loginInfo.username}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account ?
                    <Link to="/signup">Register</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login