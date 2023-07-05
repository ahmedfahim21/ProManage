import { Container, Button, Spinner } from "react-bootstrap"
import Header from "../components/Header"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSales, reset } from "../slices/sales-slice"
import SalesComp from "../components/salesComp.jsx"
import { ToastContainer } from "react-toastify"


function Sales() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {sales, isLoading} = useSelector((state) => state.sales)

  useEffect(() => {
    dispatch(getAllSales())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  



  return (
    <div>
        <Header />
        <Button style={{position: 'absolute', right:'30px', margin: '10px'}} variant="primary" onClick={() => navigate('/dashboard')}> Back</Button>
    
        <Container>
            <h1 style={{ marginTop:'40px'}}>Sales</h1>
            <p style={{ marginTop:'10px'}}>Manage your sales</p>
            <Link to='/addsale'><Button variant="success" style={{ marginTop:'10px'}}>Add Sales</Button></Link>
            <br />
            {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
            {!isLoading && sales.length === 0 ?
            (<p style={{ marginTop:'10px'}}>No sales available</p>)
            :
            (<table className="table table-striped" style={{ marginTop:'20px', fontSize: '16px'}}>
                <thead>
                    <tr>
                    <th scope="col">Date(YYYY-MM-DD)</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Sold Quantity</th>
                    <th scope="col">Sold Price</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <SalesComp key={sale._id} sale={sale}/>
                    ))}
                </tbody>
            </table>)}
            <ToastContainer />
        </Container>

    </div>
  )
}

export default Sales