import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSales, reset } from '../slices/sales-slice';
import 'chart.js/auto'



function MostGrossing() {


    const dispatch = useDispatch()

    const {sales} = useSelector((state) => state.sales)

    useEffect(() => {
      dispatch(getAllSales())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])



    const data = {
        labels: sales.map((sale) => sale.item_id.item_name),
        datasets: [
          {
            label: 'Amount',
            data: sales.map((sale) => sale.total_amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',

            ]
          },
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
        <h2>Most Grossing</h2>
        { sales.length > 0 ? (<Bar data={data} options={options} />):(<h3>No Data</h3>)}
    </Container>
  )
}

export default MostGrossing





