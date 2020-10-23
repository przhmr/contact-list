import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import AuthOptions from '../components/auth/authOptions'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Header(){

  

return(
<>
<Container >

<Row>
    <Col> <Link to="/"  > TO home</Link></Col>
    <Col> <div > Contact List</div></Col>
    <Col><AuthOptions/></Col>
  </Row>
       
      
    
    </Container>
</>
)

}

export default Header;
