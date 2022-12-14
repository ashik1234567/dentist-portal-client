import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Pages/Shared/Navbar';
import Appointment from './Pages/Appointment/Appointment';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointment from './Pages/Dashboard/MyAppointment';
import MyRview from './Pages/Dashboard/MyReview';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Review from './Pages/Review/Review';
import Users from './Pages/Dashboard/Users';
import RequireAdmin from './Pages/Login/RequireAdmn';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctors from './Pages/Dashboard/ManageDoctors';
import PatientList from './Pages/Dashboard/PatientList';

function App() {
  return (
    //max-w-7xl mx-auto for larger display
    <div className='p-2' > 

      <Navbar> </Navbar>
      <Routes>
        <Route path='/' element={<Home> </Home>}> </Route>
        <Route path='/home' element={<Home> </Home>}> </Route>
        <Route path='/about' element={<About> </About>}> </Route>
        
        <Route path='appointment' element={
        <RequireAuth>
          <Appointment> </Appointment>
        </RequireAuth>}> </Route>

        <Route path='dashboard' element={
        <RequireAuth>
          <Dashboard> </Dashboard>
        </RequireAuth>}> 
          <Route index element={<MyAppointment></MyAppointment>}> </Route>
          <Route path='review' element={<Review> </Review>}> </Route>
          <Route path='history' element={<MyHistory> </MyHistory>}> </Route>
          <Route path='users' element={<RequireAdmin> <Users> </Users> </RequireAdmin>}> </Route>
          <Route path='addDoctor' element={<RequireAdmin> <AddDoctor> </AddDoctor> </RequireAdmin>}> </Route>
          <Route path='manageDoctors' element={<RequireAdmin> <ManageDoctors> </ManageDoctors> </RequireAdmin>}> </Route>
          <Route path='patient' element={<RequireAdmin> <PatientList> </PatientList> </RequireAdmin>}> </Route>
        </Route>

        <Route path='/login' element={<Login> </Login>}> </Route>
        <Route path='/signup' element={<SignUp> </SignUp>}> </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
