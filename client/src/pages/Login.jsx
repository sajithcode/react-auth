import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            window.location.href = '/'; // Redirect to home page
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div>
          <NavBar />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
