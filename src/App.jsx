
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes, Route, Switch, Link } from 'react-router-dom';
import Header from './Header';
import UserInfo from './UserInfo';
import Users from './Users';
import UserProfile from './UserProfile';



import State from './pages/State'
import Memo from './pages/Memo'
import Effect from './pages/Effect'
import Ref from './pages/Ref'


const App = () => {
  const queryClient = new QueryClient();



  return (

      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <Routes>
           <Route path="/" element={<UserInfo />} />
           <Route path="userinfo" element={<UserInfo />} />
           <Route path="users" element={<Users />} />
           <Route path="userprofile/:id" element={<UserProfile />} />


           <Route path="state" element={<State />} />
           <Route path="memo" element={<Memo />} />
           <Route path="effect" element={<Effect />} />
           <Route path="ref" element={<Ref />} />
         </Routes>
         


      
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>

  );
}

export default App;
