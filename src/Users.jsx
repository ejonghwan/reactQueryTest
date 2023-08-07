import React, { useEffect } from 'react';
import { useUserQuery } from './hooks/useUserQuery';
import { Link } from 'react-router-dom';

const Users = () => {

    const {data, isLoading, isSuccess, isError} = useUserQuery({ cacheTime: 500, staleTime: 500})

    return (
        <div>
            <h2>Users</h2>

            {isLoading && 'loading'}
            {isSuccess && data.map((user, idx) => (
                    <div key={idx}>
                        <Link to={`/userprofile/${user.id}`}>{user.name}</Link>
                    </div>
                )
            )}

            <button>click</button>
        </div>
    );
};

export default Users;