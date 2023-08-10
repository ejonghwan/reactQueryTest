import React, { useState } from 'react';



// function havyWork() {
//     console.log('havyWork')
// }


const State = () => {

    // 1. 계속 렌더링 되는 초기 상태
    const heavyWork = () => {
        // 초기값에 어떠한 계산이 들어가는 경우. 렌더링마다 이 함수는 계속 실행됨. 해결방법은 아래
        console.log('heavyWork')
        return ['김개똥', '이개똥']
    }
    
    // const [Name, setName] = useState(heavyWork()) // state 변경될때마다 계속 무거운 작업이 실행됨
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



    // 2. 인풋 상태를 한번에 사용할 때
    const [list, setList] = useState([{ title: '테스트1', content: '테스트1' }]) 
    const [form, setForm] = useState({ title: '', content: '' })
    const { title, content } = form;
    const handleInputChange = e => {
        const { name, value } = e.target;
        // setForm(prev => {
        //     return { ...prev, [name]: value  }
        // })
        setForm({ ...form, [name]: value  }) // 얘는 앞에 넣음 안됨. 뒤에 있는게 덮어씌우는거라
        console.log(form)
    }
    const handleClick2 = e => {
        setList(prev => [form, ...prev])
        console.log(list)
       
    }


    return (
        <div>
            state
        
            {/* 예제 1 */}
            <h2>예제 1 무거운작업 리렌더링 안되게함.</h2>
            <input type="text" value={Input} onChange={handleChange} />
            <button onClick={handleClick}>click</button>
            <div>
                {Name.map((item, idx) => 
                    <div key={idx}>{item}</div>
                )}
            </div>





            {/* 예제 2 */}
            <h2>예제 2 여러개인풋 하나의 이벤트로 </h2>
            <div>
                <input type="text" value={title} onChange={handleInputChange} name="title" />
                <input type="text" value={content} onChange={handleInputChange} name="content" />
                <button onClick={handleClick2}>ex2</button>
            </div>
            <div>
                {list.map((item, idx) => (
                    <div key={idx}>
                        <p>제목:{item.title}</p>
                        <p>컨텐츠: {item.content}</p>
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default State;