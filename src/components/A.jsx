import React, { useState, useEffect, memo } from 'react';

const A = () => {

    const [Count, setCount] = useState(0)

    // useEffect(() => {
    //     setInterval(() => {
    //       setCount(prev => prev + 1)
    //       console.log(Count)
    //     }, 2000)
    //   }, [])

    return (
        <div>
            A: {Count}
        </div>
    );
};

export default memo(A);