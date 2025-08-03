import { Navigate, useParams } from "react-router-dom";
import './edit.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from "../spinner";
const editPage=()=>{
    let location=useLocation();
    const navigate=useNavigate();
    const[showAlert, setShowAlert]=useState(false);
    const [validUser,setValidUser]=useState(true);
    const {username}=useParams();
    const [loading, setLoading] = useState(false);
    const [formData,setFormData]=useState({
        username:'',
        institute:'',
        codeforces:'',
        codechef:'',
        leetcode:'',
    })
    // const[error,SetError]=useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState({
        status:true,
        user:'',
      });
    useEffect(() => {
    const checkLoginStatus = async () => {
        setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/isloggedin`, {
          withCredentials: true,
        });
        if(res.data?.isLoggedIn) {
          setIsLoggedIn({
            status:true,
            user:res.data.user,
          });
        } else {
          setIsLoggedIn({
            status:false,
            user:'',
          });
        }
      } catch (err) {
        setIsLoggedIn({
            status:false,
            user:'',
          });
      }
      finally{
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [location]);

    const getData = async () => {
        setLoading(true);
        try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${username}/getdata`,{withCredentials:true});
        if(res.data){
            setFormData(res.data);
        }
        else{
            setValidUser(false);
        }
        } catch (err) {
            console.error("Failed to fetch user data", err);
            setValidUser(false);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        if(isLoggedIn.status && isLoggedIn.user.username==username){
            getData();
        }
    },[username,isLoggedIn]);

    const handleChange=async (e)=>{
        let {name,value}=e.target;
        setFormData({ ...formData, [name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
          const modified = {
            name: formData.name,
            institute: formData.institute,
            profiles: {
            codeforces: formData.codeforces,
            codechef: formData.codechef,
            leetcode: formData.leetcode,
            },
        };
        setLoading(true);
        try{
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${isLoggedIn.user.username}`, modified  ,{withCredentials: true,});
            setShowAlert(true);
            setTimeout(()=>{
                navigate(`/users/${username}`);
            },2000);
        }
        catch (err){
            console.log("failed to update profile",err);
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
                    Profile Updated Successfully!! REDIRECTING.........
                </div>
            )}
            {!validUser && (<h1 align="center" >User not found</h1>)}
            {(isLoggedIn.status && isLoggedIn.user.username==username)&&
            <div className="edit-form-container">
                <div className="header">
                    <div className="text">Edit Profile</div>
                    <div className="underline"></div>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="edit-inputs ">
                    <div className="edit-input ">
                        <i class="fa-solid fa-user"></i>
                        <input className="username" type="text" placeholder='Username' required name='username' value={formData.username} readOnly/>
                    </div>
                    <div className="edit-input ">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <input type="text" placeholder='institute' name='institute' onChange={handleChange} value={formData.institute}/>
                    </div>
                    <div className="edit-input ">
                        <i class="fa-solid fa-link"></i>
                        <input type="text" placeholder='codeforces handle' name='codeforces' onChange={handleChange} value={formData.codeforces}/>
                    </div>
                    <div className="edit-input ">
                        <i class="fa-solid fa-link"></i>
                        <input type="text" placeholder='codechef handle' name='codechef' onChange={handleChange} value={formData.codechef}/>
                    </div>
                    <div className="edit-input ">
                        <i class="fa-solid fa-link"></i>
                        <input type="text" placeholder='leetcode handle' name='leetcode' onChange={handleChange} value={formData.leetcode}/>
                    </div>
                    <button type='submit' className='submit'>Save</button>
                    </div>
                </form>
            </div>
            }
                </div>
            }
        </div>
    )
}
export default editPage;