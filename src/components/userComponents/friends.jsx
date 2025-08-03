import { useState, useEffect } from "react";
import { FaUserCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import './friends.css'; // CSS import
import axios from "axios";
import { useParams } from "react-router-dom";
const friends = () => {
    const [friends,setFriends]=useState([]);
    const [intitialFriends,setIntialFriends]=useState([]);
    const {username}=useParams();
    const fetchFriends=async ()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${username}/getfriends`,{withCredentials:true});
            if(res.data){
                setFriends(res.data.friends);
                setIntialFriends(res.data.friends);
            }
            else{
                setFriends([]);
            }
        }
         catch (err) {
            console.error("Failed to fetch friends:", err);
        }
    }
    useEffect(() => {
        fetchFriends();
    }, []);
  const toggleFriend=async (friendUser)=>{
    try{
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${username}/updatefriends`,{friendUser}, { withCredentials: true });
        if(res.data){
            setFriends(res.data.friends);
        }
    }
    catch(err) {
          console.error("Failed to update friends:", err);
      }

  }
  return (
    <div className="search-result-container">
        <div className="heading" align="center">
            Friends List of <a href={`/users/${username}`} style={{color:"#36E0FF", textDecoration:"underline", fontSize:"32px"} } >{username}</a>
        </div>
      {intitialFriends.length!=0 ?(intitialFriends.map((user, index) => (
        <div key={index} className="user-card">
          <div className="left">
            <span className="number">{index+1}</span>
            <a href={`/users/${user}`} className="user-icon">
                <FaUserCircle size={40} />
            </a>
             <a href={`/users/${user}`} className="user-icon">
                <span className="search-username">{user}</span>
            </a>
          </div>
          <span className="heart-icon" onClick={()=>toggleFriend(user)}>
            {friends.includes(user)? (
              <FaHeart size={24} color="#36E0FF" />
            ) : (
              <FaRegHeart size={24} />
            )}
          </span>
        </div>
      ))):<p style={{color:"grey"}}>No friends added</p>}
    </div>
  );
};

export default friends;
