import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteStock } from '../slices/stocks-slice'
import { useNavigate } from 'react-router-dom'

function StockComp(stocks) {

    const stock = stocks.stock

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteHandler = (id) => async () => {
      try{
        //confirm dialog box
        const confirm = window.confirm('Are you sure you want to delete this stock?')
        if(confirm){
          dispatch(deleteStock(id))
          navigate(0)
        }


      }
      catch(err){
        console.log(err)
      }
    }

    const updateHandler = (stock) => async () => {
      try{
        navigate(`/updatestock/${stock._id}`, {state: {stock}})
      }
      catch(err){
        console.log(err)
      }
    }



  return (
    <>
    <tr key={stock._id}>
        <td>{stock.item_name}</td>
            <td>{stock.item_quantity}</td>
            <td>{stock.item_price}</td>
            <td>
            <Button variant="warning" style={{margin: '2px' }} onClick={updateHandler(stock)}>Update</Button>
            <Button variant="danger" style={{margin: '5px' }} onClick={deleteHandler(stock._id)}>Delete</Button>
        </td>
    </tr>
    </>
  )
}

export default StockComp