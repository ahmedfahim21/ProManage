import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteSale } from '../slices/sales-slice'
import { updateStock } from '../slices/stocks-slice';

function SalesComp(sale) {

    const sales = sale.sale

    const dispatch = useDispatch()

    const deleteHandler = (id,item_id) => async () => {
      try{
        //confirm dialog box
        const confirm = window.confirm('Are you sure you want to delete this sale?')
        if(confirm){
          //update stock
          const stock = {
            item_name: item_id.item_name,
            item_quantity: item_id.item_quantity + sales.sold_quantity,
            item_price: item_id.item_price
          }
          dispatch(updateStock({id: item_id._id, data: stock}))

          dispatch(deleteSale(id))
          window.location.reload()
        }


      }
      catch(err){
        console.log(err)
      }
    }

  return (
    <>
    <tr key={sales._id}>
        <td>{sales.sold_date}</td>
        <td>{sales.item_id.item_name}</td>
        <td>{sales.sold_quantity}</td>
        <td>{sales.sold_price}</td>
        <td>{sales.total_amount}</td>
        <td>
            <Button variant="danger" style={{margin: '5px' }} onClick={deleteHandler(sales._id,sales.item_id)}>Delete</Button>
        </td>
    </tr>
    </>
  )
}

export default SalesComp