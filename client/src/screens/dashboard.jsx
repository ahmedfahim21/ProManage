import DashboardPanel from "../components/DashboardPanel"
import Header from "../components/Header"
import MostProfitable from "../components/MostProfitable"
import { Container, Row, Col } from "react-bootstrap"
import MostPopular from "../components/MostPopular"
import MostGrossing from "../components/MostGrossing"
import DailyChart from "../components/DailyChart"
import MostAvailable from "../components/MostAvailable"
import ExpensesCategories from "../components/ExpensesCategories"

function dashboard() {
  return (
    <div>
      <Header/>
      <DashboardPanel/>
      <hr/>
      <Container style={{marginTop: '50px'}}>
        <p style={{fontSize: '20px'}}>Analytics Dashboard</p>
        <Row>
          <Col>
            <DailyChart/>
          </Col>
          <Col>
            <MostProfitable/>
          </Col>
      </Row>
      <Row>
        <Col>
          <MostGrossing/>
        </Col>
        <Col>
          <MostPopular/>
        </Col>
      </Row>
      <Row>
        <Col>
        <MostAvailable/>
        </Col>
        <Col>
        <ExpensesCategories/>
        </Col>
      </Row>
      </Container>
      </div>
  )
}

export default dashboard