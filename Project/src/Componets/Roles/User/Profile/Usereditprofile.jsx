import React, { useState ,useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Edituserprofile.css';
import instance from '../../../../axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Usereditprofile() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const [data, setdata] = useState({});
  const [username, setUsername] = useState('Your Name');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [Location, setLocation] = useState('');
  const [expectedsalary, setexpectedsalary] = useState('');
  const [Postion, setPostion] = useState('');
  const [currentJobDescription, setCurrentJobDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [workedCompanies, setWorkedCompanies] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    instance
      .get(`/user-details/${userid}/`)
      .then((response) => {
        const userData = response.data;
        console.log(response.data)
        setdata(userData.user);
        setUsername(userData.user.username);
        setLocation(userData.userdetails.location)
        setExperience(userData.userdetails.experience)
        setPhoneNumber(userData.user.phonenumber)
        setPostion(userData.userdetails.position)
        setSkills(userData.userdetails.skills)
        setWorkedCompanies(userData.userdetails.worked_company);
        setEducation(userData.userdetails.education);
        setCurrentJobDescription(userData.userdetails.current_position);
        setexpectedsalary(userData.userdetails.Expected_salary);
        
        
        
      })  
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userid]);


  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    // Validate that no field is empty
    if (
      !username ||
      !phoneNumber ||
      !currentJobDescription ||
      !experience ||
      !Location ||
      !Postion ||
      !skills ||
      !education ||
      !workedCompanies||
      !expectedsalary
    ) {
      toast.error('Please fill out all fields.');
      return;
    }

    // Validate phone number
    if (phoneNumber.length !== 10) {
      toast.error('Phone number should have exactly 10 digits.');
      return;
    }

    try {
      const response = await instance.patch(
        `/user-details/${userid}/`,
        {
          user: {
            username: username,
            phonenumber: phoneNumber,
          },
          user_details: {
            current_position: currentJobDescription,
            education: education,
            experience: experience,
            location: Location,
            position: Postion,
            skills: skills,
            worked_company: workedCompanies,
            Expected_salary:expectedsalary
          },
        }
      );

      // Handle successful response
      toast.success('Profile Updated Successfully');
      navigate('/user/profile');
      // Update the state if needed
      // setdata(response.data); // No need to update data state here
    } catch (error) {
    
      toast.error('Error updating profile.');
    }
  };

  

 

  return (
    <Container fluid className='edit-page'>
      <div className='edit-form-box'>
        <Form>
          <Form.Group as={Row} controlId='username'>
            <Form.Label column sm='6'>
              Username
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='phoneNumber'>
            <Form.Label column sm='6'>
              Phone Number
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='text'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='experience'>
                <Form.Label column sm='6'>
                  Experience
                </Form.Label>
                <Col sm='6'>
                  <Form.Select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value='' disabled>Select an option</option>
                    <option value='Less than 1 year'>0-1 year</option>
                    <option value='1-3 years'>1-3 years</option>
                    <option value='3-5 years'>3-5 years</option>
                    <option value='5+ years'>5+ years</option>
                  </Form.Select>
                </Col>
              </Form.Group>

          <Form.Group as={Row} controlId=' Expected salary'>
            <Form.Label column sm='6'>
              Expected salary
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='text'
                value={expectedsalary}
                onChange={(e) => setexpectedsalary(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Postion'>
            <Form.Label column sm='6'>
              Postion
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='text'
                value={Postion}
                onChange={(e) => setPostion(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Location'>
            <Form.Label column sm='6'>
              Location
            </Form.Label>
            <Col sm='6'>
              <Form.Control
                type='text'
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group controlId='currentJobDescription'>
            <Form.Label>Current Job Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              value={currentJobDescription}
              onChange={(e) => setCurrentJobDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='skills'>
            <Form.Label>Skills</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='education'>
            <Form.Label>Education</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='workedCompanies'>
            <Form.Label>Worked Companies</Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              value={workedCompanies}
              onChange={(e) => setWorkedCompanies(e.target.value)}
            />
          </Form.Group>

          <div className='d-flex justify-content-between'>
    <Button
      variant='primary'
      size='md'
      onClick={handleUpdateProfile}
    >
      Update Profile
    </Button>
  </div>


        </Form>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default Usereditprofile;
