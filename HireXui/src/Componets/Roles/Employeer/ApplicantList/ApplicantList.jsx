import React, { useEffect, useState } from 'react';
import './ApplicantList.css';
import { useLocation } from 'react-router-dom';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';


function ApplicantList() {
  const [applicants,setapplicants]=useState([])
  console.log(applicants)
  const location = useLocation();
  const { state } = location; // Destructure the state object
  const postId = state ? state.postId : null;
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response=await instance.get(`/recruiter/applicant-view/${postId}/`);
        setapplicants(response.data)
      }catch(error){
          console.error('Error fetching data:');
      }
        

      
    };
    fetchData();
  }, []);
  const profileview=(id,postid)=>{
    console.log(postId)
    navigate('/employeer/applicantsprofile', { state: { user: id ,postId: postId }} );
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'applied-color';
      case 'reject':
        return 'reject-color';
      case 'interview':
        return 'interview-color';
      case 'shortlisted':
        return 'shortlisted-color';
      case 'selected':
        return 'selected-color';
      default:
        return '';
    }
  };
  

  return (
    <div className="applicant-list-container">
      <h2 className="applicant-list-title bg-primary ">Applicant List</h2>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Applicant ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.reverse().map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.id}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phonenumber}</td>
              <td className={getStatusColor(applicant.status)}>{applicant.status}</td>
              <td>
              <button className="contactButton" onClick={()=>profileview(applicant.user,applicant.id)}>
                    Profile
                    <div className="iconButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                        </svg>
                    </div>
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantList;
