import React, { useState, useRef } from 'react';

const Ref = () => {

    const [State, setState] = useState(0)
    const ref = useRef(0)
    let val = 0;

    /*
        state는 값이 변경될떄마다 Ref 컴포넌트 자체가 리렌더링 되기 떄문에 
        값이 올라간게 화면에 출력됨 
        ref는 리렌더링이 되어도 값이 초기화 되지 않기 때문에 값은 올라가되 화면은 리렌더링 안됨 
        val은 이 함수 자체가 리렌더링 되면서 계속 초기화됨
    */
    const state_up = e => setState(prev => prev + 1)
    const ref_up = e => ref.current = ref.current + 1
    const val_up = e => val += 1 
    

    return (
        <div>
            <p>state : {State}</p>
            <p>ref : {ref.current}</p>
            <p>val : {val}</p>

            <button onClick={state_up}>state</button>
            <button onClick={ref_up}>ref</button>
            <button onClick={val_up}>val</button>

        </div>
    );
};

export default Ref;