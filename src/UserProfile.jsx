import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserQuery, useUpdateUserNameMutation } from './hooks/useUserQuery';
import { useMutation } from '@tanstack/react-query';

const UserProfile = () => {

    const { id } = useParams();
    const {data, isLoading, isSuccess, isError} = useUserQuery({id: Number(id), cacheTime: 200, staleTime: 200})
    const [UserName, setUserName] = useState(data?.name)

    const userMutation = useUpdateUserNameMutation()
    
    useEffect(() => {
        console.log(data)
        console.log('name', data?.name)
    }, [isSuccess, data])

    const handleSubmit = e => {
        e.preventDefault();
        userMutation.mutate({ userName: UserName, id: id })
    }

    return (
        <div>
            {isLoading && <div>...loading</div>}
            {isSuccess && (
                <div>
                    <h2>user Profile {id}</h2>
                    <p>name: {data.name}</p>
                    <p>email: {data.email}</p>
                    <p>phone: {data.phone}</p>
                    <p>website: {data.website}</p>
                </div>
            )}


            <br /><br /><br />

            <form onSubmit={handleSubmit}>
                <input type="text" value={UserName || ''} onChange={e => setUserName(e.target.value)} />
                <button>update</button>
            </form>
        </div>
    );
};

export default UserProfile;