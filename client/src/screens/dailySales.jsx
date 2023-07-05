import { Button, Container, Spinner } from "react-bootstrap"
import Header from "../components/Header"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllDailySales, reset } from "../slices/dailySales-slice"
import { useNavigate } from "react-router-dom"

function DailySales() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {dailySales, isLoading} = useSelector((state) => state.dailySales)

    useEffect(() => {
        dispatch(getAllDailySales())
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

  return (
    <div>
        <Header />
        <Button style={{position: 'absolute', right:'30px', margin: '10px'}} onClick={()=> navigate('/dashboard')}>Back</Button>
        <Container style={{marginTop: '20px'}}>
        <h1>Daily Sales</h1>
        {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
        <table className="table table-striped" style={{ marginTop:'20px', fontSize: '16px'}}>
            <thead>
                <tr>
                <th scope="col">Date(YYYY-MM-DD)</th>
                <th scope="col">Total Quantity</th>
                <th scope="col">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {dailySales.map((dailySale) => (
                    <tr key={dailySale._id}>
                        <td>{dailySale.date.slice(0,10).split('-').reverse().join('-')}</td>
                        <td>{dailySale.total_quantity}</td>
                        <td>{dailySale.total_sales}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </Container>

    </div>
  )
}

export default DailySales