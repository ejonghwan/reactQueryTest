import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserQuery, useUpdateUserNameMutation } from './hooks/useUserQuery';

const UserProfile = () => {

    const { id } = useParams();
    const {data, isLoading, isSuccess, isError} = useUserQuery({userId: id, cacheTime: 200, staleTime: 200})
    const [UserName, setUserName] = useState(null)

    const userMutation = useUpdateUserNameMutation()
    
    const handleSubmit = e => {
        e.preventDefault();
        // updateUserName
        // console.log(UserName)
        userMutation.mutate(UserName)
        console.log(userMutation)
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