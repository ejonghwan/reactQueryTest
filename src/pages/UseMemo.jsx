import React, { useState, useMemo } from 'react';

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

        const [ hardNum, setHardNum ] = useState(1);
        const [ easyNum, setEasyNum ] = useState(1);

        // const hardSum = hardCalc(hardNum) //적용 전 소스
        const hardSum = useMemo(() => {
            return hardCalc(hardNum) //useMemo로 변경해주면 얘는 다시 계산하지않음
        }, [hardNum])
        const easySum = easyCalc(easyNum)


    return (
        <div>

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


        </div>
    );
};

export default UseMemo;