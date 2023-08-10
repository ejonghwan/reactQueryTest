import React, { useState, useEffect } from 'react';

const UseCallbackBox = ({ createBoxStyle }) => {


    const [style, setStyle] = useState({})
    useEffect(() => {
        console.log('자식 컴포넌트 박스키우기')
        setStyle(createBoxStyle())
    }, [createBoxStyle])

    return <div style={style}></div>
        
};

export default UseCallbackBox;