import React from 'react'
import ReactDOM from 'react-dom/client'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext';
// import Signup from './pages/Signup.jsx'
// import Login from './pages/Login.jsx'
// import AdminProfile from './pages/AdminProfile.jsx'
// import LoginOption from './pages/LoginOption.jsx'
// import StudentHome from './pages/StudentHome.jsx';
// import AdminHome from './pages/AdminHome.jsx';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App/>,
//         children: [
//             {
//                 path: '',
//                 element: <LoginOption/>
//             },
//             {
//                 path: '/studentHome',
//                 element: <StudentHome/>
//             },
//             {
//                 path: '/adminHome',
//                 element: <AdminHome/>
//             },
//             {
//                 path: '/studentSignup',
//                 element: <Signup/>
//             },
//             {
//                 path: '/AdminSignup',
//                 element: <Signup/>
//             },
//             {
//                 path: '/studentLogin',
//                 element: <Login/>
//             },
//             {
//                 path: '/adminLogin',
//                 element: <Login/>
//             },
//             {
//                 path: 'profile',
//                 element: <AdminProfile/>
//             },
//         ]
//     }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
)
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <AuthContextProvider>
//             <RouterProvider router={router} />
//         </AuthContextProvider>
//     </React.StrictMode>
// )
