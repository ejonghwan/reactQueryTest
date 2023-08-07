import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import  { useUserQuery } from './hooks/useUserQuery';

const UserInfo = () => {
   
    // const { data, isLoading, isSuccess, isError } = useQuery(['user', 2], getUser, {
    //     refetchOnWindowFocus: false,
    //     refetchOnMount: false,
    //     staleTime: 1000 * 5, // default 0ms
    //     // staleTime: 1000 * 60 * 60 * 24, //하루
    //     cacheTime: 1000 * 5, // 캐시에 데이터 유지시키는 시간. default 5분이 지나면 GC가 삭제
    // })


    // 커스텀 훅은 함수 안이나 useEffect 훅 안에서 호출 불가능. state 하나 만들어서 그거에 담기 
    const {data, isLoading, isSuccess, isError} = useUserQuery({userId: 5, cacheTime: 500, staleTime: 500})

    console.log(data)



    return (
        <div>
            <h2>user Info</h2>
            {isLoading && 'loading'}
            {isSuccess && <h2>{data.name}</h2>}

            <button>click</button>
        </div>
    );
};

export default UserInfo;