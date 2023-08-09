import React from 'react';

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


    return (
        <div>




        </div>
    );
};

export default UseMemo;