import SpotifyService from '../../services/SpotifyService';
import { Row, Col, Card } from 'react-bootstrap';
function AlbumList(props) {
    
    const items = SpotifyService(props);
    
    

    console.log(items);
    return (          
        <Row xs={5} md={5} className="g-4">
            {items.map(item => (
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
            ))}
        </Row>)
        ;



}


export default AlbumList;