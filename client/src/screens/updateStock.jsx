import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { updateStock } from '../slices/stocks-slice';



const UpdateStock = () => {
  const { id } = useParams();
  const location = useLocation();
  const { stock } = location.state;


  const initialValues = {
    item_name: stock.item_name,
    item_quantity: stock.item_quantity,
    item_price: stock.item_price,
  }

  const validationSchema = Yup.object({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required'),
    item_price: Yup.number().required('Item price is required'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async(values) => {
    //make a post request to the server
    
    const data = {
        item_name: values.item_name,
        item_quantity: values.item_quantity,
        item_price: values.item_price,

    }
    try{  
        dispatch(updateStock({id,data}))
        toast.success('Stock updated successfully', {
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

  useEffect(() => {
    // Fetch the stock data for the given ID and populate the form
    // You can use an API request or any other data retrieval mechanism here
  }, [id]);

  return (
    <>
    <Header/>
    <Button style={{position: 'absolute', right:'10px', margin: '10px'}} variant="primary" onClick={() => navigate('/stocks')}> Back</Button>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className='my-3'>Update Stock</h1>
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
                        <label htmlFor="item_name" className="form-label">
                            Item Name
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="item_name"
                            name="item_name"
                        />
                        {errors.item_name && touched.item_name ? (
                            <div className="text-danger">{errors.item_name}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="item_quantity" className="form-label">
                            Item Quantity
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="item_quantity"
                            name="item_quantity"
                        />
                        {errors.item_quantity && touched.item_quantity ? (
                            <div className="text-danger">{errors.item_quantity}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="item_price" className="form-label">
                            Item Price
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="item_price"
                            name="item_price"
                        />
                        {errors.item_price && touched.item_price ? (
                            <div className="text-danger">{errors.item_price}</div>
                        ) : null}
                    </div>
                    <Button variant="warning" type="submit" style={{ marginTop:'10px', width:'100%'}}>
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

export default UpdateStock;
