import React, { useState } from 'react';



// function havyWork() {
//     console.log('havyWork')
// }


const State = () => {

    const heavyWork = () => {
        console.log('heavyWork')
        return ['김개똥', '이개똥']
    }
    
    // const [Name, setName] = useState(heavyWork()) //계속 무거운 작업이 실행됨
    const [Name, setName] = useState(() => heavyWork()) // 이렇게 해결
    const [Input, setInput] = useState("")

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleClick = e => {
        setName(prev => {
            return [Input, ...prev]
        })
    }


    return (
        <div>
            state
        
            <input type="text" value={Input} onChange={handleChange} />
            <button onClick={handleClick}>click</button>


            <div>
                {Name.map((item, idx) => 
                    <div key={idx}>{item}</div>
                )}
            </div>
           
        </div>
    );
};

export default State;