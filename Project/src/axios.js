import axios from "axios";
import Cookies from 'js-cookie';


const baseURL = "http://127.0.0.1:8000/"



const instance = axios.create({
    baseURL:baseURL,
    
   
  });

  instance.interceptors.request.use(
    (config) => {
        const tokensString = Cookies.get('AdminTokens');
        if (tokensString) {
            const tokens = JSON.parse(tokensString); // Parse the JSON string to get the tokens object
            const accessToken = tokens.access; 
            console.log(accessToken)// Extract the access token
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Use the access token in the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
  



  export default instance