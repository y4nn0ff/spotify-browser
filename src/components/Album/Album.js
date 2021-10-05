import AlbumService from '../../services/AlbumService';
import { Row, Col, Card } from 'react-bootstrap';
function Album(props) {
    
    const item = AlbumService(props);
    
    
    return (          
        
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.images[1].url} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                    <Card.Body>
                        <Card.Link href={"/album/" + item.id}>Voir</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
    
        )
        ;



}


export default Album;