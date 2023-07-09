import { Container, Button, Spinner, Table } from "react-bootstrap"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSalesGrouped, reset } from "../slices/salesGroup-slice"
import { ToastContainer } from "react-toastify"
import { exportFile } from "../utils/excel"
import { FaDownload } from "react-icons/fa"


function SalesGroup() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {salesGroup, isLoading} = useSelector((state) => state.salesGroup)

  useEffect(() => {
    dispatch(getAllSalesGrouped())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const handleDownloadTable = () => {
    const data = salesGroup.map((sale) => {
      return {
        Item_Name: sale.item.item_name,
        Sold_Quantity: sale.total_quantity,
        Total_Amount: sale.total_sales,
        Total_Profit: sale.total_profit,
      };
    });
    exportFile('salesGrouped', data);
  };



  return (
    <div>
        <Header />
        <Button style={{position: 'absolute', right:'30px', margin: '10px'}} variant="primary" onClick={() => navigate('/sales')}> Back</Button>
    
        <Container>
            <h1 style={{ marginTop:'40px'}}>Sales by Stock</h1>
            <p style={{ marginTop:'10px'}}>Manage your sales categoricaly</p>
            <Button variant="primary" style={{ padding:'10px'}} onClick={handleDownloadTable}>Download Table <FaDownload style={{marginTop: '-4px'}}/></Button>
            <br />
            {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
            {!isLoading && salesGroup.length === 0 ?
            (<p style={{ marginTop:'10px'}}>No sales available</p>)
            :
            (<Table responsive striped style={{ marginTop:'20px', fontSize: '16px'}}>
                <thead>
                    <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Sold Quantity</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Total Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {salesGroup.map((sale) => (
                        <tr key={sale._id}>
                            <td>{sale.item.item_name}</td>
                            <td>{sale.total_quantity}</td>
                            <td>{sale.total_sales}</td>
                            <td>{sale.total_profit}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
            <ToastContainer />
        </Container>

    </div>
  )
}

export default SalesGroup