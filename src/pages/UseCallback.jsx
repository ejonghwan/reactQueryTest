import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import UseCallbackBox from './UseCallbackBox';

const UseCallback = () => {

    /*
        함수형 컴포넌트에서 함수가 재실행(리랜더링) 된다면 안쪽 변수는 모두 초기화됨. 
        때문에 변수에 함수를 할당한 값도 초기화 되는데 이걸 useCallback으로 감싸주면 메모리에 담아둠 
    */

    // const calc = num => num + 1; //이 값은 리랜더링 될 때마다 함수가 다시 대입됨
    // const calc2 = useCallback(num => { return num + 1 }, []) // 이 값은 재렌더링 되더라도 함수가 다시 생성안됨






    // #######################   예제 1
    /*
        아래 소스에서 useEffect는 someFnc가 변경될때만 실행되게 했는데 넘버를 변경할때마다 계속 실행됨. 
        이유는 someFnc = 함수 자체가 래퍼런스 타입이기 때문에 이 컴포넌트 함수가 재실행되면서 기존 함수의 주소값과 새로 만들어진 주소값을 대조했을떄 react는 주소값이 다르니 이게 계속 다른 함수라고 생각하는 것.
        (개중요 - 함수가 새로 실행(리랜더링)되면 함수자체가 새로운 메모리에 새로운 주소값으로 들어감)

    */
    const [num, setNum] = useState(0);
    // const someFnc = () => {
    //     console.log(`sumFnc n: ${num}`)
    //     return;
    // }

    const someFnc = useCallback(() => {
        // 이렇게 useCallback으로 감싸주면 여기에 담기는 값은 메모이제이션 되어 함수가 재실행(리렌더링)되어도 새로운 메모리의 주소값에 담기지않고 계속 같은걸 쓰게됨.
        console.log(`sumFnc n: ${num}`)
        return;
    }, [num]) //[]이라면 메모이제이션했을때 0이어서 넘버를 변경해도 변경되지않음. 의존성에 업데이트 변수값을 넣어줘야함

    useEffect(() => {
        console.log('someFnc 가 변경 되었습니다')
    }, [someFnc])







     // #######################   예제 2
    const [size, setSizes] = useState(100)
    const [isDark, setIsDark] = useState(false)

    // 박스키울땐 자식에 있는 useEffect 박스키우기가 실행되는게 맞지만 isDark가 변경될떄도 계속 자식 함수도 계속 실행됨. 
    // const createBoxStyle = () => {
    //     return {
    //         backgroundColor: 'red',
    //         width: `${size}px`,
    //         height: `${size}px`,
    //     }
    // }

    const createBoxStyle = useCallback(() => {
        // useCallback 쓰면 더이상 자식 박스키우기 함수가 실행되지 않음.
        return {
            backgroundColor: 'red',
            width: `${size}px`,
            height: `${size}px`,
        }
    }, [size])

    return (
        <div>
            <h2>예제 1 - 유즈이팩트 재렌더링이 되는 이유</h2>
            <div>
                <input type="number" value={num} onChange={e => setNum(e.target.value)} />       
                <button onClick={someFnc}>call someFnc</button>
            </div>




            <br /><br /><br /><br /><br /><br /><br /><br /><br />




            <h2>예제 2 </h2>
            <div style={{ backgroundColor: `${isDark ? 'black': ''}` }}>
                <input type="number" value={size} onChange={e => setSizes(e.target.value)} />
                <button onClick={e => setIsDark(!isDark)}>이거 변경할 시 createBoxStyle함수 다시생성</button>
                <UseCallbackBox createBoxStyle={createBoxStyle} />
            
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br />


        </div>
    );
};

export default UseCallback;