import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './screens/register.jsx'
import ErrorPage from './screens/error-page.jsx'
import Login from './screens/login.jsx'
import Dashboard from './screens/dashboard.jsx'
import Stocks from './screens/stocks.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import StocksPage from './screens/addStock.jsx'
import UpdateStock from './screens/updateStock.jsx'
import Sales from './screens/sales.jsx'
import SalesPage from './screens/addSale.jsx'
import SalesGroupPage from './screens/salesGroup.jsx'
import DailySales from './screens/dailySales.jsx'
import Expenses from './screens/expenses.jsx'
import AddExpenses from './screens/addExpenses.jsx'

const router = createBrowserRouter([
  { name: 'Home', path: '/', element: <App/>, errorElement: <ErrorPage /> },
  { name: 'Register', path: '/register', element: <Register/> },
  { name: 'Login', path: '/login', element: <Login /> },
  { name: 'Private', path: '/', element: <PrivateRoute />,
    children: [
      { name: 'Dashboard', path: '/dashboard', element: <Dashboard /> },
      { name: 'Stocks', path: '/stocks', element: <Stocks /> },
      { name: 'AddStock', path: '/addstock', element: <StocksPage /> },
      { name: 'UpdateStock', path: '/updatestock/:id', element: <UpdateStock/>},
      { name: 'Sales', path: '/sales', element: <Sales /> },
      { name: 'AddSale', path: '/addsale', element: <SalesPage /> },
      { name: 'SaleGroup', path: '/salesgroup', element: <SalesGroupPage /> },
      { name: 'DailySales', path: '/dailysales', element: <DailySales />},
      { name: 'Expenses', path: '/expenses', element: <Expenses/>},
      { name: 'AddExpenses', path: '/addexpenses', element: <AddExpenses/>},
    ]  
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>, 
)
