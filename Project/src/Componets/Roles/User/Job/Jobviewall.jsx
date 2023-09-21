import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './JobViewMore.css'; // Import your custom CSS file
import { useLocation } from 'react-router-dom';
import instance from '../../../../axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Jobviewall() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;

  const [data,setdata]=useState([])
  
  const location = useLocation();
  const { state } = location; // Destructure the state object
  const postId = state ? state.postId : null;
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response=await instance.get(`/jobdetails-view/${postId}/`);
        
        setdata(response.data)
      }catch(error){
          console.error('Error fetching data:', error);
      }
        

      
    };
    fetchData();
  }, []);


  const apply = async (id,companyid) => {
   
    try {
      const response = await instance.post(`/applicands/${userid}/${companyid}/`, {
        postid: id,
        companyid:companyid


      });
  
      
      
      if (response.status === 200) {
        console.log('Successfully applied for the job.');
        toast.success('Successfully applied for the job.');
        // Optionally, you can perform some action here upon successful application.
      } 
    } catch (error) {
      if (error.message=== 'Request failed with status code 400'){
        toast.error('You have already applied for this job.');
      }else if (error.message === 'Network Error'){
        console.error('Network connection error. Please check your internet connection.');
        toast.error('Network connection error. Please check your internet connection.');

      }
      else {
        console.error('An error occurred while applying for the job:', error);
      }  
    }
  };
  
  
  
  
  
  return (
    <div>
      {/* Header */}
      <div className="header">
        <h3>Job Details</h3>
      </div>

      {/* Content */}
      <Container className="job-view-more-container mt-3">
        <Row>
        <Col sm={4}>
  {/* Content for the first part */}
  <div className="square-box part-1">
    <div className="left-content">
      <p><strong className="larger-text">{data.skills}</strong></p>
      <div className="company-info">
        <img src={data.image_url} alt="Company Logo" className="company-logo" />
        <p className="company-name">{data.company_name}</p>
      </div>
      <p>{data.company_state}, {data.company_country}</p>
      <p>₹{data.payscale_from} - ₹{data.payscale_to} a Year</p>
      <button className="custom-button" onClick={()=>apply(data.id,data.company)}>Apply Now</button>
    </div>
  </div>
</Col>

            <Col sm={8}>
  {/* Content for the second part */}
  <div className="square-box part-2">
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-clock-o"></i> {/* Use your preferred icon class */}
      </div>
      <div className="text-content">
        <p>Job details</p>
        <p>Here’s how the job details align with your job preferences.</p>
        <p>{data.job_description}</p>
      </div>
    </div>
    <div className="icon-content">
  <div className="icon">
    <i className="fa fa-map-marker"></i> {/* Use your preferred location icon class */}
  </div>
        <div className="text-content">
          <p>Location</p>
          <p>{data.location}</p>
        </div>
      </div>

    <div className="icon-content">
    <div className="icon">
          <i className="fa fa-money"></i> 
        </div>
      <div className="text-content">
        <p>Salary</p>
        <p>₹{data.payscale_from} - ₹{data.payscale_to} per Year</p>
      </div>
    </div>
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-briefcase"></i> {/* Use your preferred icon class */}
      </div>
      
      <div className="text-content">
        <p>Job type</p>
        <p>{data.Type}</p>
      </div>
    </div>
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-calendar"></i> {/* Use your preferred icon class */}
      </div>
      <div className="text-content">
        <p>Work Mode</p>
        <p>{data.workmode}</p>

      </div>
    </div>
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-suitcase"></i> {/* Use your preferred icon class */}
      </div>
      <div className="text-content">
        <p>Experience</p>
        <p>{data.experience_from}-{data.experience_to} years</p>
      </div>
    </div>
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-star"></i> {/* Use your preferred icon class */}
      </div>
      <div className="text-content">
        <p>Skills</p>
        <p>{data.skills}</p>
      </div>
    </div>
    <div className="icon-content">
      <div className="icon">
        <i className="fa fa-check-circle"></i> {/* Use your preferred icon class */}
      </div>
      <div className="text-content">
        <p>Criteria</p>
        <p>{data.criteria}</p>
      </div>
    </div>
    <div className="job-description">
      <p>Job Description:</p>
      <p>{data.job_description}</p>
    </div>
  </div>
</Col>

        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}


export default Jobviewall
