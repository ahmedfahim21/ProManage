import { useRouteError } from "react-router-dom";
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/LogoBlack.png'

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div >
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={6} className="mx-auto text-center">
          <Alert variant="danger">
            <span className="sr-only">{error.status}:</span>
            <h1 className="display-4">Error {error.statusText}</h1>
            <p className="lead">{error.message}</p>
            <Button variant="primary" href="/">Go back to the homepage</Button>
          </Alert>
        </Col>
      </Row>
    </Container>
    <img src={logo} alt="logo" style={{ width: '40rem', position: 'absolute', bottom: '0rem', right: '0rem', opacity: '0.1' }} />
    </div>
  );
}