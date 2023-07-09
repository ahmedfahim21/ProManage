import { Container, Spinner } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSalesGrouped, reset } from '../slices/salesGroup-slice';
import 'chart.js/auto'



function MostGrossing() {


    const dispatch = useDispatch()

    const {salesGroup,isLoading} = useSelector((state) => state.salesGroup)

    useEffect(() => {
      dispatch(getAllSalesGrouped())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])


    const data = {
        labels: salesGroup.map((sale) => sale.item.item_name),
        datasets: [
          {
            label: 'Total Amount',
            data: salesGroup.map((sale) => sale.total_sales),
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
        {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
        { salesGroup.length > 0 && !isLoading ? (<Bar data={data} options={options} />):(<p>No data to display</p>)}
    </Container>
  )
}

export default MostGrossing





