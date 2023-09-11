import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer >
      {/* className='text-bg-dark' */}
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer