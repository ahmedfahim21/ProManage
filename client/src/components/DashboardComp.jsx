import { Card } from "react-bootstrap"

function DashboardComp({title,text}) {
  return (
    <div>
        <Card
          bg='light'
          key='light'
          text='dark'
          style={{ width: '18rem', height:'10rem', padding: '10px', cursor: 'pointer'}}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title style={{fontSize:'25px'}}> {title} </Card.Title>
            <Card.Text style={{fontSize:'18px'}}>
              {text}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}

export default DashboardComp