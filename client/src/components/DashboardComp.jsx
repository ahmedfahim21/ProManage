import { Card } from "react-bootstrap"

function DashboardComp({title,text}) {
  return (
    <div>
        <Card
          bg='light'
          key='light'
          text='dark'
          style={{ width: '300px', height:'150px', cursor: 'pointer', padding: '10px', borderRadius: '10px'}}
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