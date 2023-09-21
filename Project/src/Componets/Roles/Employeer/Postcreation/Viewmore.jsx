import React, { useEffect, useState } from 'react';
import './Viewmore.css';
import { useLocation } from 'react-router-dom';
import instance from '../../../../axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Viewmore() {
  const [data,setdata]=useState([])
  const location = useLocation(); // Use the useLocation hook to get location object
  const [active, setActive] = useState('');
  const { state } = location; // Destructure the state object
  const postId = state ? state.postId : null;
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response=await instance.get(`/recruiter/job-view/${postId}/`);
       setdata(response.data)
       setActive(response.data.is_active)
      }catch(error){
          console.error('Error fetching data:', error);
      }
        

      
    };
    fetchData();
  }, []);
  const applicands=(id)=>{
    navigate('/employeer/applicants', { state: { postId: id }} );
  }

  const toggleSwitch = async () => {
    try {
      const response=await instance.patch(`/recruiter/job-view/${postId}/`);
      setActive(!active);
    } catch (error) {
      console.error('Error toggling job post:', error);
    }
  };
  return (
    <div className="view-more-container">
      <h2 className="job-title bg-primary">Job Post Details</h2>
      <div className="details-container">
      <strong>{active ? "active" : "inactive"}</strong>
        <div>
       
        <label className="switch">
            <input type="checkbox" checked={active} onChange={toggleSwitch} />
            <div className="slider">
              <div className={`circle ${active ? 'checked' : ''}`}>
                <svg
                  className="cross"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    {/* Path data for the cross SVG */}
                  </g>
                </svg>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g>
                    {/* Path data for the checkmark SVG */}
                  </g>
                </svg>
              </div>
            </div>
          </label>
        </div>
        <div className="post-content">
          <div className="postscontents"><strong>Post ID:</strong> {data.id}</div>
          <div className="postscontents">
            <strong>desgination:</strong>{data.desgination}
          </div>
          <div className="postscontents">
            <strong>Post Description:</strong>{data.job_description}
          </div>
          <div className="postscontents">
            <strong>criteria:</strong>{data.criteria}
          </div>
          <div className="postscontents">
            <strong>workmode:</strong>{data.workmode}
          </div>
          <div className="postscontents">
            <strong>payscale_from:</strong>  {data.payscale_from} to {data.payscale_to}
           
          </div>
          <div className="postscontents">
            <strong>experience_from:</strong>  {data.experience_from} to {data.experience_to}
           
          </div>
          <div className="postscontents">
            <strong>skills:</strong>  {data.skills}
          </div>
          <div className="postscontents">
            <strong>location:</strong>{data.location}
          </div>
          <div className="postscontents">
            <strong>Type:</strong>{data.Type}
          </div>
          <div className="postscontents">
            <strong>active:</strong>{data.is_active}
          </div>
        </div>
      </div>

      <div className="apply-button">
       
        <button className="btn btn-primary" onClick={()=>applicands(data.id)}>Show Applied Details</button>
       
      
      </div>
    </div>
  );
}

export default Viewmore;
