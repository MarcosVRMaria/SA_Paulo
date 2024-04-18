import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/register/register.jsx';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Epi from './pages/epi/epi.jsx';


const paginas = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/cadastro",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/home",
    element: <Home />
  }, {
    path: "/epi",
    element: <Epi />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={paginas} />

)