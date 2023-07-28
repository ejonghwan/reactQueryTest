import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserQuery from './hooks/useUserQuery';

const UserProfile = () => {

    const { id } = useParams();
    const {data, isLoading, isSuccess, isError} = useUserQuery({userId: id, cacheTime: 200, staleTime: 200})

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
        </div>
    );
};

export default UserProfile;