import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function About() {
  return (
    <div className="about-page">
      <Container>
        <Row>
          <Col md={6}>
            <img
              src="https://res.cloudinary.com/dbsvyx064/image/upload/v1693765945/xostqqogehp0px9diyki.png" // Replace with your image URL
              alt="Company Logo"
              className="about-image"
            />
          </Col>
          <Col md={6}>
            <div className="about-content">
              <h2>About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mauris eu
                libero placerat blandit. Vivamus dapibus auctor neque, id fringilla dolor tempor
                id. Nullam cursus enim ac urna tincidunt, vel dictum justo consectetur. Praesent
                ac viverra lorem.
              </p>
              <p>
                In eget ipsum auctor, blandit ligula vel, efficitur elit. Sed eleifend, odio vel
                luctus facilisis, dolor tellus eleifend risus, a tempor libero arcu sit amet
                tortor. Aliquam cursus ultricies turpis vel euismod.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
