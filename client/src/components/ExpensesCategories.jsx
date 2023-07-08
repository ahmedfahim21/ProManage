import { Container } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllExpenses, reset } from '../slices/expense-slice';
import 'chart.js/auto'



function ExpensesCategories() {

    const dispatch = useDispatch()

    const {expenses} = useSelector((state) => state.expenses)

    useEffect(() => {
      dispatch(GetAllExpenses())
      return () => {
        dispatch(reset())
      }
    }, [dispatch])

    const groupByCategory = (expenses) => {
        const grouped = expenses.reduce((acc, expense) => {
            const key = expense.category;
            if(!acc[key]){
                acc[key] = []
            }
            acc[key] = acc[key]+ expense.amount
            return acc
        }, {})
        return grouped
    }

    const data = { 
        labels: expenses.length > 0 ? Object.keys(groupByCategory(expenses)) : [],
        datasets: [
          {
            label: 'Amount',
            data: expenses.length > 0 ? Object.values(groupByCategory(expenses)).map((value) => value) : [],
            backgroundColor: 'rgb(153, 102, 255, 0.2)',
          },
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
        <h1>Expenses</h1>
        {expenses.length === 0 ? (<p>No data to display</p>):
         (<Radar data={data} options={options} />)}
    </Container>
  )
}

export default ExpensesCategories




