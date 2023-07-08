import { Container, Row, Button } from 'react-bootstrap'
import Header from './components/Header'


function App() {
  return (
    <div>
      <Header />
      <Container className=" justify-content-center" >
        <Row className='justify-content-center my-3'>
            <Button variant="primary" href="/register">Register</Button>
        </Row>
        <Row className='justify-content-center my-3'>
          <Button variant="primary" href="/login">Login</Button>
        </Row>
      </Container>



    </div>
  )
}

export default App