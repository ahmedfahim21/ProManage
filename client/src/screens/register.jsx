import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Header from '../components/Header';
import {setCredentials} from '../slices/auth-slice'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersapi-slice';
import { useEffect } from 'react';

const RegistrationPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6,'Password must be atleast 6 characters'),
    confirmpassword: Yup.string().required('Confirm Password is required')
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();


  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  },[userInfo,navigate]);

  const handleSubmit = async(values) => {
    //make a post request to the server
    if(values.password !== values.confirmpassword){
      toast.error('Passwords do not match', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      }
      );
      return;
    }
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    try{
      const res = await register(data).unwrap();
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

  return (
    <>
    <Header/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className='my-3'>Registration</h1>
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
                  <label htmlFor="name" className="form-label">
                    Enterprise Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && touched.name && (
                    <Toast show>
                      <Toast.Body>{errors.name}</Toast.Body>
                    </Toast>
                  )}
                </div>
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
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
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
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <p className="my-3">
            Already have an account? <Link to="/login">Login</Link>
        </p>
        <ToastContainer />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default RegistrationPage;
