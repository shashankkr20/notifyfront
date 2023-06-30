import React from 'react'
import { useState,useEffect } from 'react';
import Axios from "axios";
import { useLocation,useNavigate} from "react-router-dom"
import './recycle.css'

function Recycle() {
  const myroute=useLocation();
  const api=process.env.REACT_APP_URL;
  const routing=useNavigate();
  const checked=[];
  const mainvar=myroute.state.data;
  const [mainvar2,setmainvar2]=useState([]);
  const [mainvar3,setmainvar3]=useState([]);
  useEffect(() => {
    const resp= Axios.post(api+"/fetchddata", {
    uname:mainvar.username,
    }).then(async(response)=>
    {
        setmainvar2(response.data)
    });
  })
  const deldel=(e)=>{
    var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
        Axios.post(api+"/rdelete", {
          titval:titval,
          uname:mainvar.username,
      }).then(() => {
        alert("one note is retrieved");
      });
  }
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
    Axios.post(api+"/searchdel", {
        title:e.target.value,
        uname:mainvar.username,

      }).then((response)=>
      {
          setmainvar3(response.data)
      });
    }
  }
  const Retrieve=(e)=>{
    var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
    var redate=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.nextSibling.innerText)
    var recontent=(e.target.parentElement.parentElement.firstChild.nextSibling.innerHTML)
    const uname=mainvar.username;
    Axios.post(api+"/addnote", {
      title:titval,
      uname:mainvar.username,
      content:recontent,
      date:redate,
      }).then(() => {
        deldel(e)
      });
  }
  const deleteMultiple=(e)=>{
    e.preventDefault();
      if(mainvar2.length==0)
      {
        alert("no note to delete")
      }
      else{
        var del=document.querySelectorAll("#delete-note")
        var btn=document.querySelector(".confirm")
        var btn1=document.querySelector(".remove-note")
        btn1.style.display="none"
        del.forEach(element => {
          element.style.display="block";
        });
        btn.style.display="flex";
    }
  }
  const deletesnote=(e)=>{
    var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
    const uname=mainvar.username;
    Axios.post(api+"/rdelete", {
          titval:titval,
          uname:mainvar.username,
      }).then(() => {
        alert("deleted from database");
      });
  }
  const delChecked=(e)=>{
    e.preventDefault()
    var delall=document.querySelectorAll("#delete-note")
    var btn=document.querySelector(".confirm")
    var btn1=document.querySelector(".remove-note")
    btn1.style.display="none"
    delall.forEach(element => {
      if(element.checked==true)
      {
        checked.push(element.previousSibling.previousSibling.innerText);
        element.checked=false;
      }
    })
    var ct=0;
    const uname=mainvar.username;
    checked.forEach(element => {
      Axios.post(api+'/rdeletemul',{
          element:element,
          uname:uname,
      }).then((response) => {
        ct++;
        if(ct==checked.length)
        {
          delall.forEach(element => {
          element.style.display="none";
        });
        alert(ct+" no of notes deleted")
        btn.style.display="none";
        btn1.style.display="flex"
        }
        
      });
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
                <a href="" className="remove-note a flex" onClick={deleteMultiple}>
                    <span><img src="./images/minus.svg" alt="remove-note"/></span>
                    <span className='yyy'>Delete notes</span>
                </a>
                <a href="" className="confirm a flex" onClick={delChecked}>
                    <span><img src="./images/minus.svg" alt="remove-note"/></span>
                    <span className='yyy'>Confirm Delete</span>
                </a>
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
                    
                    <span>{item.deltitle}</span>
                    <span className='datee'>{item.deldate}</span>
        
                    <input type="checkbox" name="delete-note" id="delete-note"/>
                    
                </h3>
                <textarea value={item.delcontent}></textarea>
                <div className="edit-note flex">
                    <button id="Delete" onClick={deletesnote}>Delete</button>
                    <button id="edit" onClick={Retrieve}>Retrieve</button>
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
                    
                    <span>{item.deltitle}</span>
                    <span className='datee'>{item.deldate}</span>
        
                    <input type="checkbox" name="delete-note" id="delete-note"/>
                    
                </h3>
                <textarea value={item.delcontent}></textarea>
                <div className="edit-note flex">
                    <button id="Delete" onClick={deletesnote}>Delete</button>
                    <button id="edit" onClick={Retrieve}>Retrieve</button>
                </div>
            </div>
            
        );
      })
  }
</div>
</>
  )
}

export default Recycle