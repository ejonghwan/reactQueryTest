import React from 'react';


import A from '../components/A';
import B from '../components/B';
import C from '../components/C';
import { useEffect, useState, useCallback } from 'react';
import D from '../components/D';


const Memo = () => {

    
  const [Count, setCount] = useState(0)
  const [Val, setVal] = useState('')
 
  const interval = useCallback(() => {
      setCount(prev => prev + 1)
      // console.log(Count)
  }, [setCount])


  const handleChange = e => {
    setVal(e.target.value)
  }


  /*
    memo중요!
    memo로 최적화를 해놔도 자식 컴포넌트에 래퍼런스타입을 넘겨줄땐 재렌더링이 됨. 
    react는 프롭비교를 하기떄문에 재렌더링시 주소값이 달라지면 메모가 되어도 prop가 달라졌구나 라고 생각해서 렌더링이 되기 떄문 
    이떈 useMemo도 해줘야됨 

    자식으로 넘겨주는 
    const name = { first: 'a', last: 'b' } 를 넘겨줄땐 useMemo로 감싸줌
    const fn = () => {} 함수일땐 useCallback으 로 감싸줌
     
    하지만 메모이제이션은 과부하 걸리는 것만 해야됨
  */

    return (
        <div>


        {/* 
          memo는 부모에서 상태가 변경되어 재렌더링 될 때 자식들도 같이 되는데 자식들을 감싸주면 부모만 리렌더링이 됨 
        */}
        <h3>Compoennts Test</h3> 
        <A />
        <B />
        <C />  
        {/* <h3>{Count}</h3> */}


        {/* 
          useCallback은 함수를 재사용하려고 쓰는 거임. (가상돔이 함수를 다시 만드는걸 방지) 
          그냥 사용만으로는 최적화가 진행되진 않지만 useMemo랑 같이 사용하면 ?
        */}
        <D Count={Count} interval={interval}/>
        {/* {Count} */}
        {/* <button onClick={interval}>d click</button> */}

        {/* 
          useMemo는 함수의 어떤 계산값을 메모이제이션 하려고 사용
          "특정값 계산하는 A함수"
          A함수로 값을 계산하고 멈춰있는 상태에서 다른 컴포넌트가 업데이트 되어 화면을 리렌더링 하게되면 A 함수도 리렌더링이 됨
        */}



        <div><input value={Val} onChange={handleChange} /></div>

        </div>
    );
};

export default Memo;


