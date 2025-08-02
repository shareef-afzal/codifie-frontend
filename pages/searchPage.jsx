import axios from "axios";
import { useState,useEffect } from "react";
import SearchBox from "../src/components/search/searchBox";
import SearchResult from "../src/components/search/searchResult";
const searchPage=()=>{
    const fetchUsers= async ()=>{
        const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/fetchUsers`,{withCredentials:true});
        if(res.data){
            setUsers(res.data);
            setMatchedUsers(res.data);
        }
        
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    const[users,setUsers]=useState([]);
    const[matchedUsers,setMatchedUsers]=useState([]);
    return(
        <>
        <SearchBox users={users} setMatchedUsers={setMatchedUsers}/>
        <SearchResult matchedUsers={matchedUsers}/>
        </>
    )
}
export default searchPage;