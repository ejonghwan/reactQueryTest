import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/userinfo">user info</Link></li>
                <li><Link to="/users">users</Link></li>
                <li><Link to="/memo">memo</Link></li>
                <li><Link to="/state">state</Link></li>
                <li><Link to="/effect">effect</Link></li>
                <li><Link to="/ref">ref</Link></li>
                <li><Link to="/usememo">useMemo</Link></li>
                <li><Link to="/usecallback">useCallback</Link></li>
            </ul>
        </nav>
    );
};

export default memo(Header);