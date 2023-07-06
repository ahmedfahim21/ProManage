import { Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDailySales, reset } from '../slices/dailySales-slice';
import 'chart.js/auto'



function DailyChart() {


    const dispatch = useDispatch()

    const {dailySales} = useSelector((state) => state.dailySales)

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
            label: 'Amount',
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
        {dailySales.length > 0 ? (<Line data={data} options={options} />):
        (<h3>No data to display</h3>)}
    </Container>
  )
}

export default DailyChart





