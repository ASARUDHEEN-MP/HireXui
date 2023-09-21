import {configureStore} from '@reduxjs/toolkit';
import  authreducer  from '../Slice/Authslice';


const store = configureStore({
    reducer:{
        auth:authreducer
    }
})



export default store;