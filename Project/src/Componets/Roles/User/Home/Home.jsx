
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import './Home.css'
import { Carousel, Container, Row, Col, Button,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../../../../axios';
function Home() {
  const navigate = useNavigate();
  const [categories,setcategories]=useState([])
  console.log(categories)
 console.log(categories)
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response=await instance.get(`/home-view/`);
        
        setcategories(response.data)
      }catch(error){
          console.error('Error fetching data:', error);
      }
        

      
    };
    fetchData();
  }, []);
    // Define a function to handle box click
    const handleBoxClick = (category) => {
      // You can perform any desired action here before navigating
     
      navigate('/user/About-Company',  { state: { Companyid: category.id }} );
      // Example: Navigate to another page with React Router
      
    };

 const carouselStyle = {
    maxHeight: '300px', // Set the maximum height of the carousel images
    objectFit: 'cover', // Maintain aspect ratio and cover the container
  };
 
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Set the number of slides to show to 2
    slidesToScroll: 2, // Set the number of slides to scroll to 2
    autoplay: true, // Auto slider
    autoplaySpeed: 3000, // Auto slider speed in milliseconds
  };
  return (
    <div>
      <Carousel className='carosel'>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn01.alison-static.net/mail/2017/profile/20171002-job.gif"
            alt="First slide"
            style={carouselStyle} // Apply the style to the image
          />
          <Carousel.Caption>
            <div className="d-flex justify-content-end align-items-center h-100 ">
           
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://today.oregonstate.edu/sites/today.oregonstate.edu/files/workplace_0.gif"
            alt="Second slide"
            style={carouselStyle} // Apply the style to the image
          />
          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Item as needed */}
      </Carousel>
      <Container className="mt-5">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h2>Find great places to work</h2>
              <p>
              Get access to millions of company reviews
              </p>
              <a href='/user/joblist'>
              <Button variant="primary">Find jobs</Button>
              </a>
             
            </div>
          </Col>
          <Col md={6}>
            <img
              src="https://media.tenor.com/rtvoz_mxToQAAAAd/busy-working.gif"
              alt="Left"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '40%', // Make the image border round
              }}
            />
          </Col>
        </Row>
        <Row>
        <Container className="mt-5 ">
        <Row className="align-items-center justify-content-center mb-4 ">
          <Col>
            <h2 className="text-center">Top Companies Hiring Now</h2>
          </Col>
        </Row>
        <Row>
      <Col>
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-item r"
              onClick={() => handleBoxClick(category)} // Attach the click event handler
            >
              <div className="category-box">
                <img src={category.image_url} alt={category.username} className="category-image" />
                <p className="category-name">{category.username}</p>
              </div>
              <div className="category-count">
                <p>{category.count} are actively hiring</p>
              </div>
            </div>
          ))}
        </Slider>
      </Col>
    </Row>
      </Container>
          
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="premium-services">
              <h2>Fast forward naukri services</h2>
              <p>
                Accelerate your job search with premium services. Services to help you get hired, faster:
                from preparing your CV, getting recruiter attention, finding the right jobs, and more!
              </p>
              <a href='/user/About-Hirex'>
              <Button className="btn-learn-more">Learn more</Button>
              </a>
            
              <p className="includes-paid-services">Includes paid services</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <h2>Find your job</h2>
          <p>
            Explore thousands of job opportunities across various industries and domains.
            Search for your dream job and apply now!
          </p>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col className="text-center ">
          <div className="search">
            <div className="search-first">
              <input className="serchimput" type="text" placeholder="Search for jobs" />
              <svg viewBox="0 0 24 24" className="search__icon">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                  </path>
                </g>
              </svg>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
























      <footer className="footer">
  <Container>
    <Row>
      <Col md={4}>
        <h5>Contact Us</h5>
        <p>Email: Hirex66@gmail.com</p>
        <p>Phone: (123) 456-7890</p>
      </Col>
      <Col md={4}>
        <h5>Follow Us</h5>
        <p>
          <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </p>
        <p>
          <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </p>
        {/* Add more social media links as needed */}
      </Col>
    </Row>
    <Row>
      <Col>
        <p>&copy; 2023 Hirex. All rights reserved.</p>
      </Col>
    </Row>
  </Container>
</footer>

    </div>
  );
}

export default Home;
