import React, { useState, useMemo, useEffect } from 'react';

function hardCalc(number) {
    console.log('heavy')
    for(let i = 0; i < 999999999; i++) {} //생각하는 시간
    return number + 10000;
}

function easyCalc(number) {
    console.log('easy')
    return number + 1;
}

const UseMemo = () => {


    /*
        함수는 렌더링 > 컴포넌트 함수호출 > 모든 내부 변수 초기화 단계를 거침 

        function calc() { 엄청난 계산 return 10 }
        function Component() {
            const value = calc()
            return <div>{value}</div>
        }

        만약 이 형태면 value는 리렌더링마다 초기화되며 calc는 그떄마다 다시 계산함


        해결) useMEmo 사용 
        const value = useMemo(() => calc(), []) 어레이 옵션엔 useEffect랑 같음
        메모리에 저장해두고 사용할떄 꺼내서 사용

        주의)
        메모리에 저장해둔다는 것 조차 메모리를 차지하기 떄문에 
        필요한 것만 넣어야됨 
    */



        // 아래 소스는 hard를 변경했을 때 1초 늦게 적용됨. 무거운 계산떔에..근데 easy를 눌러도 똑같음 그건 리렌더링 되면서 하드도 같이 다시 계산하기때문.. 이걸 useMemo로  hard가 변경됐을때만 계산하게 바꿔줘야됨 


        // ### 첫번쨰 예제 무거운 작업  
        const [ hardNum, setHardNum ] = useState(1);
        const [ easyNum, setEasyNum ] = useState(1);

        // const hardSum = hardCalc(hardNum) //적용 전 소스
        const hardSum = useMemo(() => {
            return hardCalc(hardNum) //useMemo로 변경해주면 얘는 다시 계산하지않음
        }, [hardNum])
        const easySum = easyCalc(easyNum)












        //### 두번째 예제 - 래퍼런스 참조하는 데이터타입은 재렌더링 일으킴
        const [number, setNumber] = useState(0);
        const [isKorea, setIsKorea] = useState(true); 

        //이게 불리언값이면 useEffect 넘버는 재 렌더링 안일어남.
        // const location = isKorea ? '한국' : '외국'

        // 이게 래퍼런스 타입이면 주소값을 담기떔에 같은 값이어도 계속 변경된다고 useEffect가 생각해서 계속 location에 객체값을 다시 대입함. 그래서 계속 재렌더링이 일어남. 이럴때 useMemo 사용
        // const location = {
        //     country: isKorea ? '한국' : '외국' 
        // }
        
        const location = useMemo(() => {
            // 이렇게 감싸주면 넘버를 변경해도 더이상 useEffect가 실행되지않음
            return { country: isKorea ? '한국' : '외국' }
        }, [isKorea])

        useEffect(() => {
            console.log('useEffect 실행')
        }, [location])

    return (
        <div>
             <h2>예제 1  무거운 계산까지 렌더링 기다림</h2>
            <div>
                <h3>어려운 계산</h3>
                <input type="number" value={hardNum} onChange={e => setHardNum(parseInt(e.target.value))}/>
                <span>+ 10000 = {hardSum}</span>
            </div>

            <div>
                <h3>쉬운 계산</h3>
                <input type="number" value={easyNum} onChange={e => setEasyNum(parseInt(e.target.value))}/>
                <span>+ 10000 = {easySum}</span>
            </div>

            <br /><br /><br /><br /><br /><br />




            <h2>예제 2 - 래퍼런스 참조하는 데이터타입들 재렌더링 되는거 막아줌</h2>
            <h3>하루 몇끼 먹음?</h3>
            <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
            <hr />
            <h3>어느 나라에 있음?</h3>
            <p>나라: {location.country}</p>
            <button onClick={() => setIsKorea(!isKorea)}>go</button>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />


        </div>
    );
};

export default UseMemo;