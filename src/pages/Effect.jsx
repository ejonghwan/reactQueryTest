import React, { useState, useEffect } from 'react';

const Effect = () => {

    const [Num, setNum] = useState(0)

    const handleNumUp = e => {
        setNum(prev => prev + 1)
    }

    // 사용방법 1
    useEffect(() => {
        console.log('리렌더링이 계속 되더라도 맨처음만 실행')

        return () => {
            console.log('컴포넌트가 언마운트 될떄 실행됨')
            // clearInterval removeEventListener clearTimeout 등 페이지가 언마운트될때 클린업 
        }
    }, [])

      // 사용방법 2
    useEffect(() => {
        console.log('num state가 변경될 리렌더링되니깐 그떄마다 여기도 실행됨')
    }, [Num])




    // 실험1 
    // useEffect 의존성에 함수는 왜 넣는걸까 ? 함수는 안에 값이 변경되어도 useEffect가 실행되지않음. useState의 두번째 인자 함수를 변경해도 안되는데..흠.. 
    return (
        <div>
            
            <button onClick={handleNumUp}>num {Num}</button>

        </div>
    );
};

export default Effect;