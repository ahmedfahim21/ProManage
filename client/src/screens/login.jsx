import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    //make a post request to the server
    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    }
    )
    .catch(err => console.log(err))

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
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
