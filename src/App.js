import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/dashboard/Dashboard';
import NoPage from './components/shared/NoPage';
import UserDetail from './components/userSetup/UserDetail';
import UserList from './components/userSetup/UserList';
// import SignIn from './components/signin/SignIn.js';
import { useEffect, useState } from 'react';
import SignIn from './components/signin/SignIn';
import axios from 'axios';
import RoleDetails from './components/role/RoleDetails';
import ModuleDetails from './components/moduleAndProcess/ModuleDetails';
import FeatureSetup from './components/features/FeatureSetup';
import ProcessDetails from './components/process/ProcessDetails';
import ProjectDetails from './components/projects/ProjectDetails';
import ProjectList from './components/projects/ProjectList';
import UserTicketList from './components/userTickets/UserTicketList';
import UserTicketDetails from './components/userTickets/UserTicketDetails';

function App() {
const [user,setUser] = useState([]);
const UserLogin = async (userdetails)=>{

  try {
    const data = {email:userdetails.email.value,password:userdetails.password.value}
    await axios.post('http://localhost:3001/api/users/validate',data)
    .then((res)=>{
      const userData = res.data;
      //console.log(userData);
      setUser(userData);
      localStorage.setItem("userLoginDetails",JSON.stringify(userData));
    }).catch(()=>{
      localStorage.removeItem("userLoginDetails");
      setUser([]);
    })
  } catch (error) {
    localStorage.removeItem("userLoginDetails");
    setUser([]);
  }
}

useEffect(()=>{
  const userLogindata = localStorage.getItem("userLoginDetails");
  if(userLogindata!==null&&userLogindata!==undefined&&userLogindata!==""){
    setUser(userLogindata);
  }
},[user]);



const UserLogOut = ()=>{
  localStorage.removeItem("userLoginDetails");
  setUser([]);
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.length===0?<SignIn UserLogin={UserLogin} />:<Layout user={user} UserLogOut={UserLogOut} />}>
          <Route index element={<Dashboard />} />
          <Route path="/master/userdetail" element={<UserDetail />} />
          <Route path="/master/roledetail" element={<RoleDetails />} />
          <Route path="/master/projectdetails" element={<ProjectDetails />} />
          <Route path="/master/projectlist" element={<ProjectList />} />
          <Route path="/master/modulesetup" element={<ModuleDetails />} />
          <Route path="/master/featuresetup" element={<FeatureSetup />} />
          <Route path="/master/procesdetail" element={<ProcessDetails />} />
          <Route path="/master/userdetail/:id" element={<UserDetail />} />
          <Route path="/master/userlist" element={<UserList />} />
          <Route path="/userTickets" element={<UserTicketList />} />
          <Route path="/userTickets/details" element={<UserTicketDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
