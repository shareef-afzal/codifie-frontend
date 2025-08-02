import { useState,useEffect } from "react";
import './searchBox.css';


const searchBox=({users,setMatchedUsers})=>{
    const[formData,setFormData]=useState({
        search:'',
    });
    const handleChange=async (e)=>{
        let {name,value}=e.target;
        setFormData({ ...formData, [name]:value});
        const filteredUsers = users.filter((user) =>
            user.toLowerCase().includes(value.toLowerCase())
        );
        setMatchedUsers(filteredUsers); 
    }
    return(
        <>
        <div className="inputs ">
            <div className="input ">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='search a friend' name='search' onChange={handleChange} value={formData.search}/>
            </div>
        </div>
        </>
    )
}
export default searchBox;