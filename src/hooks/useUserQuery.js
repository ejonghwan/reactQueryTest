import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const getUser = async ({ queryKey }) => {
    // console.log(queryKey[1].userId)
    let res = null;
    queryKey[1].id ?
        (res = await axios.get(`https://jsonplaceholder.typicode.com/users/${queryKey[1].id}`) ) :
        (res = await axios.get(`https://jsonplaceholder.typicode.com/users/`)) 
    // console.log('res?', res)
    const data = res.data;
    return data;
}


// 캐싱타임은 브라우저 내부적인 값이라 서버랑 비교하지않음.
// 새로고침했을 때는 변경되는데 리액트 컴포넌트 변경되었다고 변경되진 않음
// 즉 컴포넌트가 변경되었을 때마다 서버데이터랑 매칭하려면 캐싱타임을 0으로 줘야함
export const useUserQuery = ({ id, cacheTime, staleTime }) => {
    return useQuery(['userData', { id: id }], getUser, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        // cacheTime: 1000 * cacheTime,
        // staleTime: 1000 * staleTime,
        cacheTime: 0,
        staleTime: 0
    });
}



export const updateUserName = async ({ userName, id }) => {
    console.log('query?', userName, id)
    const res = await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: userName
    })
    return res;
} 

export const useUpdateUserNameMutation = () => {
    const queryClient = useQueryClient([]);
    return useMutation(updateUserName, {
        
        onSuccess: (data) => {
            console.log('data?', data.data)
            queryClient.setQueryData(['userData', { id: data.data.id }], data.data)
        }
    })
}



// export default useUserQuery

