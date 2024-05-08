import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/register/register.jsx';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Epi from './pages/epi/epi.jsx';
import EmployeeManagement from './pages/employeeManagement/employeeManagement.jsx';
import Emprestimos from './pages/emprestimos/emprestimos.jsx';
import Historico from './pages/history/history.jsx';

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
    path: "/epi",
    element: <Epi />
  }, {
    path: "/home",
    element: <Home />
  },
  {
    path: "/funcionarios",
    element: <EmployeeManagement />
  },
  {
    path: "/emprestimos",
    element: <Emprestimos />
  },
  {
    path: "/historico",
    element: <Historico />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={paginas} />

)