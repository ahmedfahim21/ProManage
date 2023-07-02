import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useLoginMutation } from '../slices/usersapi-slice';
import { setCredentials } from '../slices/auth-slice';
import { useEffect } from 'react';
import Header from '../components/Header';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (userInfo) {
      Navigate('/');
    }
  }, [userInfo, Navigate]); 


  const handleSubmit = async(values) => {
    //make a post request to the server
    console.log(values);
    try{
      const res = await login(values).unwrap();
      dispatch(setCredentials({...res}));
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

  return (<>
    <Header/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className='my-3'>Login</h1>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && touched.email && (
                    <Toast show>
                      <Toast.Body>{errors.email}</Toast.Body>
                    </Toast>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      errors.password && touched.password ? 'is-invalid' : ''
                    }`}
                  />
                  {errors.password && touched.password && (
                    <Toast show>
                      <Toast.Body>{errors.password}</Toast.Body>
                    </Toast>
                  )}
                </div>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <p className="my-3">
            Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
            <ToastContainer/>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default LoginPage;
