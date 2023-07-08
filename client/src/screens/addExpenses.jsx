import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { createExpense } from '../slices/expense-slice';


const ExpensesPage = () => {
  const initialValues = {
    expense: '',
    amount: '',
    date: '',
    category: '',
  };

  const validationSchema = Yup.object({
    expense: Yup.string().required('Expense name is required'),
    amount: Yup.number().required('Amount is required'),
    date: Yup.date().required('Date is required'),
    category: Yup.string().required('Category is required'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async(values) => {
    //make a post request to the server
    
    const data = {
        expense: values.expense,
        amount: values.amount,
        date: values.date,
        category: values.category

    }
    try{  
        dispatch(createExpense(data))
        toast.success('Expense added successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
        
    }
    catch(err){
      toast.error(err.data, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      }
      );
    }
  };

  const handleValidationErrors = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
      });
    });
  };

  

  return (
    <>
    <Header/>
    <Button style={{position: 'absolute', right:'10px', margin: '10px'}} variant="primary" onClick={() => navigate('/expenses')}> Back</Button>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className='my-3'>Add Expense</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            onError={handleValidationErrors}
          >
            {({ errors, touched }) => (
                <Form>
                    <div className="mb-3">
                        <label htmlFor="expense" className="form-label">
                            Expense
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="expense"
                            name="expense"
                        />
                        {errors.item_name && touched.item_name ? (
                            <div className="text-danger">{errors.item_name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="amount"
                            name="amount"
                        />
                        {errors.item_quantity && touched.item_quantity ? (
                            <div className="text-danger">{errors.item_quantity}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <Field
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                        />
                        {errors.item_price && touched.item_price ? (
                            <div className="text-danger">{errors.item_price}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <Field as="select" name="category" id="category" className={`form-control ${
                            touched.item_id && errors.item_id ? 'is-invalid' : '' }`}>
                              <option value="">Select Item</option>
                              <option value="Salaries">Salaries</option>
                              <option value="Rent">Rent</option>
                              <option value="Maintenance">Maintenance</option>
                              <option value="Utilities">Utilities</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Others">Others</option>               
                          </Field>
                          {errors.item_price && touched.item_price ? (
                            <div className="text-danger">{errors.item_price}</div>
                        ) : null}
                    </div>
                    <Button variant="success" type="submit" style={{ marginTop:'10px', width:'100%'}}>
                        Submit
                    </Button>
                </Form>

            )}
          </Formik>
        <ToastContainer />
        </Col>
        
      </Row>
    </Container>
    </>
  );
};

export default ExpensesPage;
