import { Container, Spinner } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDailySales, reset } from '../slices/dailySales-slice';
import 'chart.js/auto'



function DailyChart() {


    const dispatch = useDispatch()

    const {dailySales,isLoading} = useSelector((state) => state.dailySales)

    useEffect(() => {
      dispatch(getAllDailySales())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])



    const data = {
        labels: dailySales.map((sale) => sale.date.slice(0,10).split('-').reverse().join('-')),
        datasets: [
          {
            label: 'Profit',
            data: dailySales.map((sale) => sale.total_profit),
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            
          },
          {
            label: 'Total Amount',
            data: dailySales.map((sale) => sale.total_sales),
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            
          }
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
  
  return (
    <Container style={{ padding: '30px' }}>
        <h2>Daily Stats</h2>
        {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
        {dailySales.length > 0 && !isLoading ? (<Line data={data} options={options} />):
        (<p>No data to display</p>)}
    </Container>
  )
}

export default DailyChart





