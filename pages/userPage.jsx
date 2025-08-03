import React,{useState,useEffect} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import UserTopSection from "../src/components/userProfile/userTopSection";
import UserStatsSection from "../src/components/userProfile/userStatsSection";
import './userPage.css'
import Spinner from "../src/components/spinner";
const UserPage = () => {
  const {username}=useParams();
  const [user,setUser]=useState(null);
  const [fetching,setFetching]=useState(false);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    const fetchData=async ()=>{
      setLoading(true);
      try{
        //load existing data from backend
        const userRes=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${username}`,{withCredentials:true});
        const userData=userRes.data;
        setUser(userData);
        
        //fetch latest data only if time elapsed from last ftch is more than 2 hrs 2 hours 
        const now=new Date();
        const lastFetched=new Date(userData.lastFetchedAt)||new Date(0);
        const hoursSinceLastFetch=(now-lastFetched)/(1000*60*60);
        if(hoursSinceLastFetch>=0.5){
          setLoading(false);
          setFetching(true);
          const fetchedRes=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/fetch/all/${username}`,{withCredentials:true});
          const updatedUserData=fetchedRes.data;
          
          setUser(updatedUserData);
          setFetching(false);
        }
      }
      catch (err) {
        console.error("Failed to fetch user:", err);
      }
      finally{
        setLoading(false);
        setFetching(false);
      }
    };

    fetchData();
  },[username]);
  if (!user) return <p className="text-center mt-5">Searching for user......</p>;

  // helper function to calculate total solved across all platforms
  const calculateTotalSolved = (platformStats) => {
    let total = 0;
    if(platformStats){
      if (platformStats.Codeforces?.problemsSolved) total += platformStats.Codeforces.problemsSolved;
    if (platformStats.LeetCode?.problemsSolved) total += platformStats.LeetCode.problemsSolved;
    if (platformStats.CodeChef?.problemsSolved) total += platformStats.CodeChef.problemsSolved;
    }
    return total;
  };
  return (
     <div>
      {
        loading?(<Spinner/>):
         <div className="user-page">
        <UserTopSection user={{
        username: user.username,
        profilePic: user.profilePic,
        institute: user.institute,
        friendOf: user.friendcount || 0, // later make dynamic
        totalSolved: calculateTotalSolved(user.platformStats), // placeholder
        profileLinks: user.profiles
      }} />
      <UserStatsSection statsByPlatform={user.platformStats} />
      {fetching && (
        <div style={{
          position: "fixed",
          top: "64px",
          right: "16px",
          backgroundColor: 'white',
          color: "black",
          padding: "1rem 1rem",
          borderRadius: "12px",
          fontSize: "1rem",
          fontWeight:"bold",
          opacity: 1,
        }}>
          Refreshing latest data...
        </div>
      )}
      </div>
      }
     </div>
  );
};

export default UserPage;