import React from 'react'
import { useState,useEffect } from 'react';
import Axios from "axios";
import {useNavigate, useLocation} from "react-router-dom"
import './arch.css'
function Arch() {
  const api=process.env.REACT_APP_URL;
    const myroute=useLocation();
    const routing=useNavigate();
    const checked=[];
    const mainvar=myroute.state.data;
    const [mainvar2,setmainvar2]=useState([]);
    const [mainvar3,setmainvar3]=useState([]);
    useEffect(() => {
        const resp= Axios.post(api+"/fetchredata", {
            uname:mainvar.username,
            }).then(async(response)=>
            {
                setmainvar2(response.data)
            });
    })
    const logout=()=>{
      alert("Are You Sure")
      routing('/');
    }
    const searchhandle=(e)=>{
      var a=document.querySelector(".nss");
      var b=document.querySelector(".nsa")
      if(e.target.value==="")
      {
        b.style.display="block";
      a.style.display="none";
      }
      else{
      b.style.display="none";
      a.style.display="block";
      Axios.post(api+"/searcharch", {
          title:e.target.value,
          uname:mainvar.username,
  
        }).then((response)=>
        {
            setmainvar3(response.data)
        });
      }
    }
    const archdel=async(e)=>{
        var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
        await Axios.post(api+"/redelete", {
            titval:titval,
            uname:mainvar.username,
        }).then(() => {
          alert("unarchived");
        });
    }
    const deletesnote=async(e)=>{
      var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
      var redate=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.nextSibling.innerText)
      var recontent=(e.target.parentElement.parentElement.firstChild.nextSibling.innerHTML)
      const uname=mainvar.username;
     await Axios.post(api+"/addnote", {
        title:titval,
        uname:mainvar.username,
        content:recontent,
        date:redate,
        }).then(() => {
          archdel(e)
        });
     
    }
    return (
      <>
      <nav className="nav">
          <div className="container flex">
            <img className='logout' src='./images/logout3.webp' onClick={logout}></img>
              <h1><h4>Hello,</h4> <span>{mainvar.name.charAt(0).toUpperCase()+mainvar.name.slice(1)} </span></h1>
                  <div className="search flex">
                      <img src="./images/search-outline.svg" alt=""/>
                      
                          <input type="text" onChange={searchhandle} placeholder="search..."/>
                          <button type='submit' className='submitbtn hidden'>submit</button>
                      
                  </div>
              <div className="add-remove flex">
              </div>
          </div>
      </nav>
      <div className="notes-container nsa">
      {
        mainvar2.map((item)=>{
          return(
                  <div className="notes">
                  <h3>
                      <div className="pin"><img src="./images/pin2.png" alt="pin-image"/></div>
                      <span>{item.archtitle}</span>
                      <span className='datee'>{item.archdate}</span>
                      <input type="checkbox" name="delete-note" id="delete-note"/>
                  </h3>
                  <textarea value={item.archcontent}></textarea>
                  <div className="edit-note flex">
                      <button id="dui" onClick={deletesnote}>Retrieve note</button>
                  </div>
              </div>
          );
        })
    }
  </div>
  <div className="notes-container nss">
      {
        mainvar3.map((item)=>{
          return(
                  <div className="notes">
                  <h3>
                      <div className="pin"><img src="./images/pin2.png" alt="pin-image"/></div>
                      <span>{item.archtitle}</span>
                      <span className='datee'>{item.archdate}</span>
                      <input type="checkbox" name="delete-note" id="delete-note"/>
                  </h3>
                  <textarea value={item.archcontent}></textarea>
                  <div className="edit-note flex">
                      <button id="dui" onClick={deletesnote}>Retrieve note</button>
                  </div>
              </div>
          );
        })
    }
  </div>
  </>
    )
}

export default Arch