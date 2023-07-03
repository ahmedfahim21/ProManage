import { Button, Container, ToastContainer } from "react-bootstrap"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { getAllStock, reset } from "../slices/stocks-slice"
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import StockComp from "../components/stockComp"



function Stocks() {

    const dispatch = useDispatch()

    const {stocks, isLoading} = useSelector((state) => state.stocks)


    useEffect(() => {
        dispatch(getAllStock())
        return () => {
            dispatch(reset())
        }

    }, [dispatch])

    if(isLoading){
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    }


  return (
    <div>
        <Header />
        <Container >
            <h1 style={{ marginTop:'40px'}}>Stocks</h1>
            <p style={{ marginTop:'10px'}}>Manage your stocks</p>
            <Link to='/addstock'><Button variant="success" style={{ marginTop:'10px'}}>Add Stock</Button></Link>
            <br />
            {stocks.length === 0 ? 
            (<p style={{ marginTop:'10px'}}>No stocks available</p>)
            :
            (<table className="table table-striped" style={{ marginTop:'20px', fontSize: '16px'}}>
                <thead>
                    <tr>  
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Quantity</th>
                    <th scope="col">Item Price</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <StockComp key={stock._id} stock={stock}/>
                    ))}
                </tbody>
            </table>)}
            <ToastContainer />
        </Container>
    </div>
  )
}

export default Stocks