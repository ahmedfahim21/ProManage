import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './screens/register.jsx'
import ErrorPage from './screens/error-page.jsx'
import Login from './screens/login.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  { name: 'Home', path: '/', element: <App/>, errorElement: <ErrorPage /> },
  { name: 'Register', path: '/register', element: <Register/> },
  { name: 'Login', path: '/login', element: <Login /> },
  // { name: 'Dashboard', path: '/dashboard', component: App },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>, 
)
