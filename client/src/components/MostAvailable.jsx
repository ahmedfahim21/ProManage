import { Container, Spinner } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStock, reset } from '../slices/stocks-slice';
import 'chart.js/auto'



function MostAvailable() {


    const dispatch = useDispatch()

    const {stocks, isLoading} = useSelector((state) => state.stocks)

    useEffect(() => {
      dispatch(getAllStock())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])



    const data = {
        labels: stocks.map((stock) => stock.item_name),
        datasets: [
          {
            label: 'Profit',
            data: stocks.map((stock) => stock.item_quantity),
            
          }
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
  
  return (
    <Container style={{ padding: '30px', width: '80%'}}>
        <h2>Most Available Item</h2>
        {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
        {(stocks.length > 0 && !isLoading)?(
            <Pie data={data} options={options} />):(<p>No data to display</p>)}
    </Container>
  )
}

export default MostAvailable




