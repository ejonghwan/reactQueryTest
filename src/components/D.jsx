import React, { memo } from 'react';

const D = ({ Count, interval }) => {
    console.log('d child')
    return (
        <div>
            D : {Count}
            <button onClick={interval}>child btn</button>
        </div>
    );
};

export default memo(D);