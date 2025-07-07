import axios from 'axios';


const URL=`https://newsaggrigator.onrender.com`;
export const addInfo = async(data) =>{
    try{
       await axios.post(`${URL}/create`, data);

     

    }catch(error){
        console.log("Error while calling add info Api", error);
    }
}