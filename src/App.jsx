import { useContext } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
// import Navbar from "./components/Navbar";
// import { Outlet } from "react-router-dom";
import AdminProfile from './pages/AdminProfile.jsx'
import LoginOption from './pages/LoginOption.jsx'
import StudentHome from './pages/StudentHome.jsx';
import AdminHome from './pages/AdminHome.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminViewTestPapersList from "./pages/AdminViewTestPapersList.jsx";
import AdminViewStudentsList from "./pages/AdminViewStudentsList.jsx";
import CreatePaper from "./pages/CreatePaper.jsx";
import AdminViewParticularTestPaper from "./pages/AdminViewParticularTestPaper.jsx";
import TestOverview from "./pages/TestOverview.jsx";
import Instruction from "./pages/Instruction.jsx";
import StudentViewRunningTestPaper from "./pages/StudentViewRunningTestPaper.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import StudentViewDoneTestPaper from "./pages/StudentViewDoneTestPaper.jsx";

function App() {
    const {user} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? (user?.isAdmin ? <AdminHome/> : <StudentHome/>) : <LoginOption/> }/>
                <Route path='/studentSignup' element={ user ? <Navigate to="/" /> : <Signup/>}/>
                {/* <Route path='/adminSignup' element={ user ? <Navigate to="/" /> : <Signup/>}/> */}
                <Route path='/studentLogin' element={ user ? <Navigate to="/" /> : <Login/>}/>
                <Route path='/adminLogin' element={ user ? <Navigate to="/" /> : <Login/>}/>
                <Route path='/adminProfile/:id' element={user?.isAdmin ? <AdminProfile/> : <Navigate to="/" />}/>

                <Route path='/paperList' element={ user?.isAdmin ? <AdminViewTestPapersList/> : <Navigate to="/" />}/>
                <Route path='/paperList/paper/:id' element={ user?.isAdmin ? <AdminViewParticularTestPaper/> : <Navigate to="/" />}/>
                <Route path='/studentList' element={ user?.isAdmin ? <AdminViewStudentsList/> : <Navigate to="/" />}/>
                <Route path='/createPaper' element={ user?.isAdmin ? <CreatePaper/> : <Navigate to="/" />}/>

                <Route path='/paper/:id/instruction' element={ (user && !user?.isAdmin) ? <Instruction/> : <Navigate to="/" />}/>
                <Route path='/paper/:id/running-exam' element={ (user && !user?.isAdmin) ? <StudentViewRunningTestPaper/> : <Navigate to="/" />}/>
                <Route path='/paper/:id/thank-you' element={ (user && !user?.isAdmin) ? <ThankYou/> : <Navigate to="/" />}/>
                <Route path='/paper/:id/overview' element={ (user && !user?.isAdmin) ? <TestOverview/> : <Navigate to="/" />}/>
                <Route path='/paper/:id/overview/responses' element={ (user && !user?.isAdmin) ? <StudentViewDoneTestPaper/> : <Navigate to="/" />}/>
                {/* make error page for not exist routes and create route for that */}
            </Routes>
        </BrowserRouter>
    )

    // return (
    //     <>
    //         <Navbar/>
    //         <Outlet/>
    //     </>
    // );
}

export default App;
