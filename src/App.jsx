
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route, Switch, Link } from 'react-router-dom';


import Header from './Header';
import UserInfo from './UserInfo';
import Users from './Users';
import UserProfile from './UserProfile';

const App = () => {
  const queryClient = new QueryClient();

  return (

      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <Routes>
           <Route path="userinfo" element={<UserInfo />} />
           <Route path="users" element={<Users />} />
           <Route path="userprofile/:id" element={<UserProfile />} />
         </Routes>
         
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>

  );
}

export default App;
