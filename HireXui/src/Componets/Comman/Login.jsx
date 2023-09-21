// src/components/Login.js
// src/components/Login.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css'; // Import custom CSS

const Login = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                </div>

                {/* Checkbox */}
                <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div>

                <Button className="btn btn-primary btn-lg btn-block" type="submit">Login</Button>

                <hr className="my-4" />

                <Button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit">
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </Button>
                <Button className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }} type="submit">
                  <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                </Button>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;

