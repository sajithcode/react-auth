import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const email = localStorage.getItem('email'); // Retrieve email from localStorage

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                {email && (
                    <li>

                        Welcome, {email}
                    </li>
                )}
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
