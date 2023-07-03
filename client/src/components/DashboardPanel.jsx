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

  return (
    <div>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={bannerimg}
                style={{height:'300px', padding: '10px'}}
                />
                <Carousel.Caption>
                <h1>{userInfo.name}</h1>
                <p>Manage your projects with ease</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        <Container style={{marginTop: '20px'}}>
        <Row>
        <Col onClick={stockClickHandler}><DashboardComp title='Stock' text='Manage your stocks'/></Col>
        <Col><DashboardComp title='Sales' text='Manage your sales'/></Col>
        <Col><DashboardComp title='Daily Sales' text='Check your daily sales'/></Col>
        <Col><DashboardComp title='Expenses' text='Manage your expenses'/></Col>
        </Row>
        </Container>
      
    
        
</div>
  )
}

export default DashboardPanel