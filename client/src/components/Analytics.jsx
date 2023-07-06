
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSales, reset } from '../slices/sales-slice';


function Analytics() {

    const dispatch = useDispatch()

    const {sales} = useSelector((state) => state.sales)

    useEffect(() => {
      dispatch(getAllSales())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])

    const chartData = {
        labels: sales.map((sale) => sale.item_id.item_name),
        datasets: [
          {
            label: 'Sales',
            data: sales.map((sale) => sale.total_amount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
            ],
          },
        ],
      };
      
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      
  return (
    <Container>Analytics
        <h2>Bar Chart Example</h2>
      <Bar data={chartData} options={chartOptions} />
    </Container>
  )
}

export default Analytics