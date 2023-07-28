import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getUser = async ({ queryKey }) => {
    // console.log(queryKey[1].userId)
    let res = null;
    queryKey[1].userId ?
        (res = await axios.get(`https://jsonplaceholder.typicode.com/users/${queryKey[1].userId}`) ) :
        (res = await axios.get(`https://jsonplaceholder.typicode.com/users/`)) 
        
   
    console.log('res?', res)
    const data = res.data;
    return data;
}

const useUserQuery = ({ userId, cacheTime, staleTime }) => {
    return useQuery(['userData', { userId: userId }], getUser, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 1000 * cacheTime,
        staleTime: 1000 * staleTime,
    });
}

export default useUserQuery

