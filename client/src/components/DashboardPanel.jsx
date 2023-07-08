import { Container, Row, Carousel, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import bannerimg from '../assets/banner.jpg'
import DashboardComp from "./DashboardComp"

function DashboardPanel() {

    const {userInfo} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const stockClickHandler = () => {
        navigate('/stocks')
    }
    const salesClickHandler = () => {
        navigate('/sales')
    }
    const dailySalesClickHandler = () => {
        navigate('/dailysales')
    }
    const expensesClickHandler = () => {
        navigate('/expenses')
    }


  return (
    <div>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={bannerimg}
                style={{height:'300px' , objectFit: 'cover'}}
                />
                <Carousel.Caption>
                <h1 style={{fontFamily: 'Montserrat'}}>Welcome {userInfo.name}</h1>
                <p style={{fontFamily: 'Arial'}}>Manage your business with ease</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        <Container style={{marginTop: '20px'}}>
        <Row>
        <Col onClick={stockClickHandler}><DashboardComp title='Stock' text='Manage your stocks'/></Col>
        <Col onClick={salesClickHandler}><DashboardComp title='Sales' text='Manage your sales'/></Col>
        <Col onClick={dailySalesClickHandler}><DashboardComp title='Daily Sales' text='Check your daily sales'/></Col>
        <Col onClick={expensesClickHandler}><DashboardComp title='Expenses' text='Manage your expenses'/></Col>
        </Row>
        </Container>
      
    
        
</div>
  )
}

export default DashboardPanel