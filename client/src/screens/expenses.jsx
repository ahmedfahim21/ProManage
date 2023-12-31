import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Button, Container, ToastContainer,Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaChartBar, FaDownload, FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { GetAllExpenses, reset, deleteExpense } from '../slices/expense-slice'
import {Spinner, Table} from 'react-bootstrap'
import { exportFile } from '../utils/excel'
import ExpensesCategories from '../components/ExpensesCategories'



function Expenses() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {expenses, isLoading} = useSelector((state) => state.expenses)

    useEffect(() => {
        dispatch(GetAllExpenses())
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    const deleteHandler = (id) => async () => {
        try{
            //confirm dialog box
            const confirm = window.confirm('Are you sure you want to delete this expense?')
            if(confirm){
                await dispatch(deleteExpense(id))
                navigate(0)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDownloadTable = () => {
        const data = expenses.map((expense) => {
            return {
                Expense: expense.expense,
                Amount: expense.amount,
                Category: expense.category,
                Date: expense.date
            }
        })
        exportFile('expenses', data)
    }


  return (
    <div>
        <Header />
        <Button style={{position: 'absolute', right:'30px', margin: '10px'}} variant="primary" onClick={() => navigate('/dashboard')}> Back</Button>
    
        <Container >
            <h1 style={{ marginTop:'40px'}}>Expenses</h1>
            <p style={{ marginTop:'10px'}}>Manage your expenses</p>
            <Link to='/addexpenses'><Button variant="success" style={{ padding:'10px'}}>Add Expenses <FaPlus style={{marginTop:'-4px'}}/></Button></Link>
            <Button variant="primary" style={{ padding:'10px', marginLeft:'10px'}} onClick={handleDownloadTable} >Download Table <FaDownload style={{marginTop:'-4px'}}/></Button>
            <Button variant="info" style={{ padding:'10px', marginLeft:'10px'}} onClick={handleShow}>Analytics <FaChartBar style={{marginTop:'-4px'}}/></Button>
            <br />
            {isLoading && <Spinner animation="border" variant="primary" style={{ marginTop:'20px'}}/>}
            {!isLoading && expenses.length === 0 ?
            (<p style={{ marginTop:'10px'}}>No expenses available</p>)
            :
            (<Table responsive striped style={{ marginTop:'20px', fontSize: '16px'}}>
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.expense}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.date}</td>
                            <td>
                                <Button variant="danger" style={{margin: '5px' }} onClick={deleteHandler(expense._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
            <ToastContainer />
            <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Analytics
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ExpensesCategories />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
            </Container>
            </div>
  )
}

export default Expenses