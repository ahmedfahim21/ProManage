import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStock, reset } from "../slices/stocks-slice"
import { createSale } from '../slices/sales-slice';
import { useEffect } from 'react';
import { updateStock } from '../slices/stocks-slice';

const SalesPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {stocks} = useSelector((state) => state.stocks)

    useEffect(() => {
        dispatch(getAllStock())
        return () => {
            dispatch(reset())
        }

    }, [dispatch])


    const initialValues = {
        item_id: '',
        sold_price: '',
        sold_quantity: '',
        sold_date: '',
        total_amount: '',
        total_profit: '',
    };

    
    const validationSchema = Yup.object({
        item_id: Yup.string().required('Item name is required'),
        sold_price: Yup.number().required('Item quantity is required'),
        sold_quantity: Yup.number().required('Item price is required'),
        sold_date: Yup.date().required('Date is required'),
        total_amount: Yup.number(),
        total_profit: Yup.number(),
    });


    const handleSubmit = async(values) => {
        //make a post request to the server
        
        const data = {
            item_id: values.item_id,
            sold_price: values.sold_price,
            sold_quantity: values.sold_quantity,
            sold_date: values.sold_date,
            total_amount: values.sold_price * values.sold_quantity,
            total_profit: (values.sold_price - stocks.find((stock) => stock._id === values.item_id).item_price) * values.sold_quantity,
        }

        try{  
            //check if the item quantity is greater than the sold quantity
            const stock = stocks.find((stock) => stock._id === data.item_id)
            if(stock.item_quantity < data.sold_quantity){
                toast.error('Item quantity is less than the sold quantity', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                })
                return
            }
            // update the item quantity
            const updatedStock = {
                item_name: stock.item_name,
                item_quantity: stock.item_quantity - data.sold_quantity,
                item_price: stock.item_price,
            }

            dispatch(updateStock({id: data.item_id, data: updatedStock}))
            dispatch(createSale(data))
            //clear form
            values.item_id = ''
            values.sold_price = ''
            values.sold_quantity = ''
            values.sold_date = ''
            values.total_amount = ''
            values.total_profit = ''



            toast.success('Sale added successfully', {
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
    }

    const handleValidationErrors = (errors) => {
        Object.values(errors).forEach((error) => {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        });
    }

    return (
        <div>
            <Header />
            <Button style={{position: 'absolute', right:'30px', margin: '10px'}} variant="primary" onClick={() => navigate('/sales')}> Back</Button>
    
            <Container>
                <h1 style={{ marginTop:'40px'}}>Add Sale</h1>
                <p style={{ marginTop:'10px'}}>Add a new sale</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onErrors={handleValidationErrors}
                >
                    {({ errors, touched }) => (
                        <Form style={{marginTop: '20px'}}>
                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="item_id">Item Name</label>
                                        <Field
                                            as="select"
                                            name="item_id"
                                            id="item_id"
                                            className={`form-control ${
                                                touched.item_id && errors.item_id ? 'is-invalid' : ''
                                            }`}
                                        >
                                            <option value="">Select Item</option>
                                            {stocks.map((stock) => (
                                                <option key={stock._id} value={stock._id}>
                                                    {stock.item_name} ({stock.item_quantity}) (Rs{stock.item_price})
                                                </option>
                                            ))}
                                        </Field>
                                        <small className="form-text text-muted">
                                            Select the item name
                                        </small>
                                        {touched.item_id && errors.item_id ? (
                                            <div className="invalid-feedback">{errors.item_id}</div>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="sold_price">Sold Price</label>
                                        <Field
                                            type="text"                                                                 
                                            name="sold_price"
                                            id="sold_price"
                                            className={`form-control ${
                                                touched.sold_price && errors.sold_price ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <small className="form-text text-muted">
                                            Enter the sold price
                                        </small>
                                        {touched.sold_price && errors.sold_price ? (
                                            <div className="invalid-feedback">{errors.sold_price}</div>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="sold_quantity">Sold Quantity</label>
                                        <Field
                                            type="text"
                                            name="sold_quantity"
                                            id="sold_quantity"
                                            className={`form-control ${
                                                touched.sold_quantity && errors.sold_quantity ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <small className="form-text text-muted">
                                            Enter the sold quantity
                                        </small>
                                        {touched.sold_quantity && errors.sold_quantity ? (
                                            <div className="invalid-feedback">{errors.sold_quantity}</div>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="sold_date">Sold Date</label>
                                        <Field
                                            type="date"                             
                                            name="sold_date"
                                            id="sold_date"
                                            className={`form-control ${
                                                touched.sold_date && errors.sold_date ? 'is-invalid' : ''
                                            }`}
                                        />
                                        <small className="form-text text-muted">
                                            Enter the sold date 
                                        </small>
                                        {touched.sold_date && errors.sold_date ? (
                                            <div className="invalid-feedback">{errors.sold_date}</div>
                                        ) : null}
                                    </div>  
                                </Col>
                            </Row>
                            <Row>
                                <Button variant="success" type="submit" style={{marginTop: '20px'}}>Add Sale</Button>
                            </Row>
                        </Form>
                    )}
                </Formik>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default SalesPage;
                                            




                                            








