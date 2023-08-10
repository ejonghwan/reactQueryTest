import React from 'react';
import { useInput } from '../hooks/useInput';
import useFetch from '../hooks/useFetch';



const baseURL = 'https://jsonplaceholder.typicode.com'


const CustomHooks = () => {

    /*
        기본구조 
        const useEat = (food) => {
            Hooks 
            return [eat, setFood]
        }


        - 커스텀 훅안에서의 훅은 독립적


    */


    // 1번쨰 
    const pop = () => alert(value)
    const [value, handler, handleClick] = useInput("hi", pop)
    

    // 2번쨰 
    // const {data, fetchURL} = useFetch(baseURL, "users");

    // 응용
    const {data: userData} = useFetch(baseURL, "users");
    const {data: postsData} = useFetch(baseURL, "posts");
    const {data: todosData} = useFetch(baseURL, "todos");


    return (
        <div>
            
            <h2>useInput</h2>
            <input type="text" value={value} onChange={handler} />
            <button onClick={handleClick}>asdasd</button>

            <br /><br /><br /><br /><br /><br /><br />

            <h2>useFetch</h2>
            <div>
                {/* <button onClick={() => fetchURL("users")}>users</button>
                <button onClick={() => fetchURL("posts")}>posts</button>
                <button onClick={() => fetchURL("todos")}>todos</button>
                <pre>{JSON.stringify(data, null, 2)}</pre> */}

                {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
                {postsData && <pre>{JSON.stringify(postsData[0], null, 2)}</pre>}
                {todosData && <pre>{JSON.stringify(todosData[0], null, 2)}</pre>}


            </div>


        </div>



        
    );
};

export default CustomHooks;