import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { createStock } from '../slices/stocks-slice';
import { useState } from 'react';


const StocksPage = () => {
  const initialValues = {
    item_name: '',
    item_quantity: '',
    item_price: '',
  };

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
        dispatch(createStock(data))
        toast.success('Stock added successfully', {
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

  //CSV upload
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const handleOnFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnFileSubmit = (e) => {
      e.preventDefault();

      if (file) {
          fileReader.onload = function (event) {
              const csvOutput = event.target.result;
              //make json object
              const lines = csvOutput.split('\n');
              const result = [];
              const headers = lines[0].split(',');
              for (let i = 1; i < lines.length-1; i++) {
                  const obj = {};
                  const currentline = lines[i].split(',');
                  for (let j = 0; j < headers.length; j++) {
                      obj[headers[j]] = currentline[j];
                  }
                  result.push(obj);
              }
              try{
                for(let i=0; i<result.length; i++){
                    const data = result[i];
                    dispatch(createStock(data))
                }
                toast.success(`Successfully added ${result.length} stocks`, {
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
          fileReader.readAsText(file);
      }
  };

  const handleDownloadReference = () => {
    const link = document.createElement('a');
    link.href = '/import_stocks.csv';
    link.download = 'reference.csv'; 
    link.click();
  };

  

  return (
    <>
    <Header/>
    <Button style={{position: 'absolute', right:'10px', margin: '10px'}} variant="primary" onClick={() => navigate('/stocks')}> Back</Button>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className='my-3'>Add Stock</h1>
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
                    <Button variant="success" type="submit" style={{ marginTop:'10px', width:'100%'}}>
                        Submit
                    </Button>
                </Form>

            )}
          </Formik>
        <p style={{marginTop:'30px' ,textAlign:'center', fontSize:'20px'}}>OR</p>
        
          <Col style={{marginTop:'20px'}}>
        <Formik>
            <Form>  
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                        Upload CSV
                    </label>
                    <input 
                        type="file" 
                        className="form-control"
                        id="file"
                        name="file"
                        onChange={handleOnFileChange}
                    />
                    <Button variant="secondary" style={{width:'40%', marginTop:'10px', justifyContent:'center'}} onClick={handleDownloadReference}>
                      Download Reference CSV
                    </Button>
                </div>

                <Button variant="info" type="submit" style={{ marginTop:'10px', width:'100%'}} onClick={handleOnFileSubmit}>
                    Import
                </Button>
            </Form>
        </Formik>
        </Col>
        <ToastContainer />
        </Col>
        
      </Row>
    </Container>
    </>
  );
};

export default StocksPage;
