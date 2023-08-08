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

export const useUserQuery = ({ id, cacheTime, staleTime }) => {
    return useQuery(['userData', { id: id }], getUser, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 1000 * cacheTime,
        staleTime: 1000 * staleTime,
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

