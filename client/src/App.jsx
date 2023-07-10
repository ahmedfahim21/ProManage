import { Container, Button } from 'react-bootstrap'
import Header from './components/Header'
import { useNavigate } from 'react-router-dom'
import logo from './assets/LogoBlack.png'


function App() {

  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <Container className=" justify-content-center" style={{ marginTop: '2rem' }}>
        <Container>
          <h1>Welcome to ProManage</h1>
          <p>The powerful Enterprise Management System</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/login')} style={{ margin: '1rem 0' }}>
            Get Started
          </Button>
        </Container>
      <Container>
        <h2>Features</h2>
        <p>Highlight the key features of your ProManage system:</p>
        <ul>
          <li>Stock Management and Analysis</li>
          <li>Sales Tracking and Reporting</li>
          <li>Expense Management and Tracking</li>
          <li>Financial Reporting</li>
          <li>Visual Analytics and Dashboards</li>
          <li>Fast and Reliable</li>
          <li>CSV Import and Export</li>
        </ul>
      </Container>
      <Container>
        <h2>Why Choose ProManage?</h2>
        <ul>
          <li>Efficiently manage all aspects of your business in one system.</li>
          <li>Real-time insights and analytics for data-driven decision making.</li>
          <li>User-friendly interface for easy navigation and operation.</li>
          <li>Reliable customer support and regular updates.</li>
        </ul>
      </Container>
      <footer className="text-center py-4" style={{ marginTop: '3rem' }}>
        <p>&copy; {new Date().getFullYear()} ProManage. All rights reserved.</p>
      </footer>
      </Container>
      <img src={logo} alt="logo" style={{ width: '40rem', position: 'absolute', bottom: '0rem', right: '0rem', opacity: '0.1', zIndex: '-5' }} />
    </div>
  )
}

export default App