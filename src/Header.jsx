import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/userinfo">user info</Link></li>
                <li><Link to="/users">users</Link></li>
            </ul>
        </nav>
    );
};

export default Header;