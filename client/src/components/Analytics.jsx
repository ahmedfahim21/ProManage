import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSales, reset } from '../slices/sales-slice';
import 'chart.js/auto'



function Analytics() {


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
            label: 'Sales',
            data: sales.map((sale) => sale.sold_quantity),
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
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
  
  return (
    <Container>Analytics
        <h2>Bar Chart Example</h2>
      <Bar data={data} options={options} />
    </Container>
  )
}

export default Analytics






