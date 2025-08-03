import { Navigate, useParams } from "react-router-dom";
import './login.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "../spinner";
const loginPage=()=>{
    const navigate=useNavigate();
    const[showAlert, setShowAlert]=useState(false);
    const {username}=useParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const handleChange=async (e)=>{
        let {name,value}=e.target;
        setFormData({ ...formData, [name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, formData,{ withCredentials: true });
            setShowAlert(true);
            setTimeout(()=>{
                navigate(`/users/${res.data.user.username}`);
            },1000);
        }
        catch (err){
            setError('Invalid Credentails');
            console.log("login failed",err.message);
            setTimeout(()=>{
                setError('');
            },2000);
            
        }
        finally{
            setLoading(false);
        }
    }
    return (
       <div>
        {
            loading?(<Spinner/>):
            <div>
                {showAlert && (
                <div className="success-message" >
                    Login Successful
                </div>
            )}
            {error && (
                <div className="error-message" >
                    {error}
                </div>
            )}
            <div className="login-form-container">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="login-inputs ">
                    <div className="login-input ">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" placeholder='Email Id' onChange={handleChange} required name='email'/>
                    </div>
                    <div className="login-input ">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder='Password' onChange={handleChange} required name='password'/>
                    </div>
                    <button type='submit' className='submit'>Login</button>
                    </div>
                </form>
            </div>
            </div>
        }
       </div>
    )
}
export default loginPage;