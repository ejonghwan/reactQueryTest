import React, { useEffect, useState } from 'react';



const useFetch = (baseURL, initalType) => {

    const [data, setData] = useState(null)


    const fetchURL = type => {
        fetch(`${baseURL}/${type}`)
        .then(res => res.json())
        .then(res => setData(res))

    }

    useEffect(() => {
        fetchURL(initalType)
    }, [])

    return {
        data,
        fetchURL
    }

};

export default useFetch;