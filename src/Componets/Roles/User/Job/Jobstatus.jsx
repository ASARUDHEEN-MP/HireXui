import React, { useState, useEffect } from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import './Jobstatus.css'; // Import your CSS file for component styles
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';
function Jobstatus() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const [appliedJobs,setappliedJobs]=useState([])
 
  const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async () => {
          try{
            const response=await instance.get(`/Appliedjobview/${userid}/`);
            setappliedJobs(response.data)
          }catch(error){
              console.error('Error fetching data:');
          }
            
    
          
        };
        fetchData();
      }, []);


  const JobViewMore=(jobpostid)=>{
    navigate('/user/jobviewmore', { state: { postId: jobpostid }} );
  }






  // Define the common image URL for all items


  

  const getStatusColor = (status) => {
    console.log(status)
    switch (status) {
        case 'applied':
          return {  color: 'orange' };
        case 'reject':
          return { backgroundColor: 'red', color: 'white' };
        case 'interview':
          return { backgroundColor: 'blue', color: 'white' };
        case 'shortlisted':
          return { backgroundColor: 'orange', color: 'white' };
        case 'selected':
          return { backgroundColor: 'purple', color: 'white' };
        default:
          return {};
      }
  };
  

  return (
    <div className="jobstatus-container">
      <h1 className="jobstatus-title">Applied Jobs List</h1>
      <Table responsive striped bordered hover className="jobstatus-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Job Postid</th>
            <th>Status</th>
            <th>Applied At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {appliedJobs.length > 0 ? (
    appliedJobs.reverse().map((job, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className="company-info">
            <Image
              src={job.company_image}
              alt={job.companyName}
              className="company-logo"
            />
            <span className="company-name">{job.company_username}</span>
          </div>
        </td>
        <td>{job.postid}</td>
        <td>
          <p className={getStatusColor(job.status)}>{job.status}</p>
        </td>
        <td>{new Date(job.created_at).toLocaleDateString()}</td>
        <td>
          <Button variant="primary" onClick={() => JobViewMore(job.postid)}>
            View
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No data Found...</td>
    </tr>
  )}
</tbody>

      </Table>
    </div>
  );
}

export default Jobstatus;
