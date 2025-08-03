import { useState, useEffect } from "react";
import { FaUserCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import './searchResult.css'; // CSS import
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";
const SearchResult = ({ matchedUsers }) => {
  const [friends,setFriends]=useState([]);
  const [loading,setLoading]=useState(false);
  let location=useLocation();
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
  const fetchFriends=async ()=>{
    setLoading(true);
      try{
          if(isLoggedIn.status){
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${isLoggedIn.user.username}/getfriends`,{withCredentials:true});
            if(res.data){
                setFriends(res.data.friends);
            }
            else{
                setFriends([]);
            }
          }
      }
        catch (err) {
          console.error("Failed to fetch friends:", err);
      }
      finally{
        setLoading(false);
      }
  }
  useEffect(() => {
      fetchFriends();
  }, [isLoggedIn]);
  const toggleFriend=async (friendUser)=>{
    setLoading(true);
    try{
      if(isLoggedIn.status){
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${isLoggedIn.user.username}/updatefriends`,{friendUser}, { withCredentials: true });
        if(res.data){
          setFriends(res.data.friends);
        }
        else{
          setFriends([])
        }
      }
    }
    catch(err) {
          console.error("Failed to update friends:", err);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div>
    {loading?(<Spinner/>):<div className="search-result-container" >
      {matchedUsers.map((user, index) => (
        <div key={index} className="user-card">
          <div className="left">
            <a href={`/users/${user}`} className="user-icon">
                <FaUserCircle size={40} />
            </a>
             <a href={`/users/${user}`} className="user-icon">
                <span className="search-username">{user}</span>
            </a>
          </div>
          <span className="heart-icon" onClick={()=>toggleFriend(user)}>
            {friends.includes(user) ? (
              <FaHeart size={24} color="#36E0FF" />
            ) : (
              <FaRegHeart size={24} />
            )}
          </span>
        </div>
      ))}
    </div>}
    </div>
  );
};

export default SearchResult;
