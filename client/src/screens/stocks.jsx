import { Button, Container, ToastContainer, Table } from "react-bootstrap"
import Header from "../components/Header"
import { Link, useNavigate } from "react-router-dom"
import { getAllStock, reset } from "../slices/stocks-slice"
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import StockComp from "../components/stockComp"
import { exportFile } from "../utils/excel"
import { FaDownload, FaPlus } from "react-icons/fa"



function Stocks() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {stocks, isLoading} = useSelector((state) => state.stocks)


    useEffect(() => {
        dispatch(getAllStock())
        return () => {
            dispatch(reset())
        }

    }, [dispatch])



    const handleDownloadTable = () => {
        const data = stocks.map((stock) => {
            return {
                Item_Name: stock.item_name,
                Item_Quantity: stock.item_quantity,
                Item_Price: stock.item_price,
            };
        });
        exportFile('stocks', data);
    };


  return (
    <div>
        <Header />
        <Button style={{position: 'absolute', right:'30px', margin: '10px'}} variant="primary" onClick={() => navigate('/dashboard')}> Back</Button>
    
        <Container >
            <h1 style={{ marginTop:'40px'}}>Stocks</h1>
            <p style={{ marginTop:'10px'}}>Manage your stocks</p>
            <Link to='/addstock'><Button variant="success" style={{ padding:'10px'}}>Add Stock <FaPlus style={{marginTop:'-4px'}}/></Button></Link>
            <Button variant="primary" style={{ padding:'10px', marginLeft:'10px'}} onClick={handleDownloadTable}>Download Table <FaDownload style={{marginTop:'-4px'}}/></Button>
            <br />
            {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
            {!isLoading && stocks.length === 0 ? 
            (<p style={{ marginTop:'10px'}}>No stocks available</p>)
            :
            (<Table responsive striped style={{ marginTop:'20px', fontSize: '16px'}}>
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
            </Table>)}
            <ToastContainer />
        </Container>
    </div>
  )
}

export default Stocks