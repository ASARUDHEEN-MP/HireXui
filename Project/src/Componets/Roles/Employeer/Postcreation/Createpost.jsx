import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Createpost.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';

function Createpost() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const formDataObject = {};
    formDataObject['company'] = userid;
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    console.log(formDataObject.job_description)
    try {
      let allFieldsValid = true;
  
      // Check all required fields
      const requiredFields = [
       
        'desgination', 'skills', 'location',
        'Type','criteria','vaccancies','workmode','experience_from','experience_to','job_description','criteria','payscale_from','payscale_to'
      ];
  
      for (const field of requiredFields) {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
          console.error(`${field} field is required.`);
          toast.error(`${field} field is required.`);
          allFieldsValid = false;
        }
        formDataObject[field] = value; // Set value in formDataObject
      }
  
      if (allFieldsValid) {
        

        const response = await instance.post(`/recruiter/jobpost-view/${userid}/`,{
          desgination:formDataObject.desgination,
          company:formDataObject.company,
          job_description:formDataObject.job_description,
          skills:formDataObject.skills,
          location:formDataObject.location,
          Type:formDataObject.Type,
          criteria:formDataObject.criteria,
          vaccancies:formDataObject.vaccancies,
          workmode:formDataObject.workmode,
          experience_from:formDataObject.experience_from,
          experience_to:formDataObject.experience_to,
          job_description:formDataObject.job_description,
          payscale_from:formDataObject.payscale_from,
          payscale_to:formDataObject.payscale_to,
          is_active:'true',



        });

        if (response.status === 201) {
          // Replace navigate with your navigation logic
          // navigate('/admin/postcreation');
          console.log('Post created successfully');
          navigate('/employeer/postview');
          toast.success('Post created successfully');
        } else {
          console.error('Post creation failed.');
        }
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  

  return (
    <div className="create-post-container">
      <h1 className="create-post-header">Create Post</h1>
      <Form onSubmit={handleSubmit} className="post-form">
        <table className="form-table">
          <tbody>
            <tr>
              <td className="table-label">Designation:</td>
              <td>
                <Form.Control type="text" name="desgination" placeholder="Enter Designation" />
              </td>
            </tr>
           
            <tr>
              <td className="table-label">Skills:</td>
              <td>
                <Form.Control type="text" name="skills" placeholder="Enter Skills (comma separated)" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Vacancies:</td>
              <td>
                <Form.Control type="number" name="vaccancies" placeholder="Enter Vacancies" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Location:</td>
              <td>
                <Form.Control type="text" name="location" placeholder="Enter Location" />
              </td>
            </tr>
             <tr>
              <td className="table-label">Job Description:</td>
              <td>
                <Form.Control as="textarea" rows={4} name="job_description" placeholder="Enter Job Description" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Type:</td>
              <td>
                <Form.Control type="text" name="Type" placeholder="Enter Type" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Work Mode:</td>
              <td>
                <Form.Control as="select" name="workmode">
                  <option value="Remote">Remote</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td className="table-label">Experience (From):</td>
              <td>
                <Form.Control type="number" name="experience_from" placeholder="Enter Minimum Experience" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Experience (To):</td>
              <td>
                <Form.Control type="number" name="experience_to" placeholder="Enter Maximum Experience" />
              </td>
            </tr>
           
            <tr>
              <td className="table-label">Criteria:</td>
              <td>
                <Form.Control type="text" name="criteria" placeholder="Enter Criteria" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Payscale (From):</td>
              <td>
                <Form.Control type="text" name="payscale_from" placeholder="Enter Minimum Payscale" />
              </td>
            </tr>
            <tr>
              <td className="table-label">Payscale (To):</td>
              <td>
                <Form.Control type="text" name="payscale_to" placeholder="Enter Maximum Payscale" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Createpost;
