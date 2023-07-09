import { Container, Spinner } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpensesByCategory, reset } from '../slices/expense-slice';
import 'chart.js/auto'




function ExpensesCategories() {

    const dispatch = useDispatch()

    const {expensesbyCategory,isLoading} = useSelector((state) => state.expenses)

    useEffect(() => {
      dispatch(GetExpensesByCategory()) 
      return () => {
        dispatch(reset())
      }
    }, [dispatch])


    const data = { 
        labels: expensesbyCategory.length > 0 ? expensesbyCategory.map((expense) => expense._id) : [],
        datasets: [
          {
            label: 'Amount',
            data: expensesbyCategory.length > 0 ? expensesbyCategory.map((expense) => expense.total) : [],
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          colors: {
            enabled: true
          }
        },
      };
  
  return (
    <Container style={{ padding: '50px', width: '80%'}}>
        <h2>Expenses</h2>
        {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
        {expensesbyCategory.length == 0  && !isLoading? (<p>No data to display</p>):
          (<Radar data={data} options={options} />)}
    </Container>
  )
}

export default ExpensesCategories




