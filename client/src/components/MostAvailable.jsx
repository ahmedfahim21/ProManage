import { Container } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStock, reset } from '../slices/stocks-slice';
import 'chart.js/auto'



function MostAvailable() {


    const dispatch = useDispatch()

    const {stocks} = useSelector((state) => state.stocks)

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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ]
            
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
    <Container style={{ padding: '30px' }}>
        <h2>Most Available</h2>
        {(stocks.length > 0)?(
            <Pie data={data} options={options} />):(<h3>No Data</h3>)}
    </Container>
  )
}

export default MostAvailable




