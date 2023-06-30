import React from 'react'
import { useState,useEffect } from 'react';
import {Navigate, useLocation} from "react-router-dom"
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import"./notes.css"
function Notes() {
  var b=[]
  var c=[]
  const myroute=useLocation();
  const routing=useNavigate();
  const checked=[];
  const mainvar=myroute.state.data;
  const [mainvar2,setmainvar2]=useState(myroute.state.data1);
  const [mainvar3,setmainvar3]=useState([]);
  const [addnotetitle,addnotetitleSet]=useState("")
  const [addnotecontent,addnotecontentSet]=useState("")
  const [shownotetitle,shownotetitleSet]=useState("")
  const [shownotecontent,shownotecontentSet]=useState("")
  const [showpopupdate,popudateSet]=useState("")
  const [oldtitle,oldtitleSet]=useState("")
  const [oldcontent,oldcontentSet]=useState("")
  const api=process.env.REACT_APP_URL;
  useEffect(() => {
    const resp1= Axios.post(api+"/fetchdata", {
    uname:mainvar.username,
    }).then(async(response)=>
    {
        setmainvar2(response.data)
    });
  })
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
    Axios.post(api+"/searchdata", {
        title:e.target.value,
        uname:mainvar.username,

      }).then((response)=>
      {
          setmainvar3(response.data)
      });
    }
  }
const archered=(e)=>{
  var titval=e.target.parentElement.firstChild.nextSibling.innerText;
  var tcont=e.target.parentElement.nextSibling.innerHTML;
  var tdate=e.target.previousSibling.previousSibling.innerText;
  Axios.post(api+"/delete", {
          titval:titval,
          uname:mainvar.username,
      }).then(() => {
      });
      Axios.post(api+"/readd", {
          title:titval,
          uname:mainvar.username,
          content:tcont,
          date:tdate,
      }).then(() => {
        alert(titval+" is archived");
      });
}
  const archive=async()=>{
    routing("/archived",{state:{
      data:mainvar,
  }});
  }
  const recycle=()=>{
    routing("/recycle",{state:{
      data:mainvar,
  }});
  }
  const putdel=(e)=>
  {
    let dtit=e.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText;
    let ddate=e.parentElement.parentElement.firstChild.firstChild.nextSibling.nextSibling.innerText;
    let dcont=e.parentElement.parentElement.firstChild.nextSibling.innerHTML;
      Axios.post(api+"/putdel", {
        title:dtit,
        uname:mainvar.username,
        content:dcont,
        date:ddate,
    }).then(() => {
    });
  }
  const closeshowpop=()=>{
    const note=document.querySelector(".showpop")
    note.style.display="none";
  }
  const logout=()=>{
    alert("Are You Sure")
    routing('/');
  }
  const closeaddNote=()=>
  {
      const note=document.querySelector(".addnote");
      note.style.display="none";
      note.firstChild.nextSibling.value="";
      note.firstChild.nextSibling.nextSibling.value="";
  }
  const closeeditNote=()=>{
    const note=document.querySelector(".editnote")
    note.style.display="none";
  }
  const deletesnote=(e)=>{
    putdel(e.target);
    var titval=(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
    const uname=mainvar.username;
    Axios.post(api+"/delete", {
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
      putdel(element.parentElement.nextSibling.nextSibling.firstChild);
      if(element.checked==true)
      {
        checked.push(element.previousSibling.previousSibling.innerText);
        element.checked=false;
      }
    })
    var ct=0;
    const uname=mainvar.username;
    checked.forEach(element => {
      Axios.post(api+'/deletemul',{
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
  const editHandle=()=>
  {
          const jj=new Date();
          Axios.put(api+"/updatenote",{
            title:oldtitle,
            newtitle:addnotetitle,
            uname:mainvar.username,
            content:addnotecontent,
            date:jj.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}).toString(),
          }).then((response)=>
          {
              alert("Your note is updated")
              oldtitleSet(addnotetitle)
              oldcontentSet(addnotecontent)
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
  const btnsubmit=(e)=>
  {
  }
  const addNote=(e)=>
  {
      e.preventDefault();
      const note=document.querySelector(".addnote")
      note.style.display="flex";
  }
  const editNote=(e)=>
  {
      const note=document.querySelector(".editnote")
      note.style.display="flex";
      oldtitleSet(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText);
      oldcontentSet(e.target.parentElement.parentElement.firstChild.nextSibling.innerHTML);
      addnotetitleSet(e.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerText)
      addnotecontentSet(e.target.parentElement.parentElement.firstChild.nextSibling.innerHTML)
  }
  const addedNote=()=>
  {
    
    const jj=new Date();
    Axios.post(api+"/addnote", {
          title:addnotetitle,
          uname:mainvar.username,
          content:addnotecontent,
          date:jj.toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'}).toString(),
      }).then(() => {
        alert(addnotetitle+" is added to database");
      });
      const note=document.querySelector(".addnote")
      note.firstChild.nextSibling.value="";
      note.firstChild.nextSibling.nextSibling.value="";
  }
  return (
  <>
   <div className="showpop">
        <p className="showhead">Your Note<img src='./images/close1.jpg' onClick={closeshowpop}></img></p>
        <h3 type="text" className="showtitle">{shownotetitle}<span className='dite'>{showpopupdate}</span></h3>
        <h4 className="showcontent" >{shownotecontent}</h4>
        
    </div>
    <div className="addnote">
        <p className="addnotehead">Add note<img src='./images/close1.jpg' onClick={closeaddNote}></img></p>
        <input onChange={(e)=>{
                        addnotetitleSet(e.target.value)}} type="text" className="titleaddnote" placeholder="Enter the title"/>
        <textarea onChange={(e)=>{
                        addnotecontentSet(e.target.value)}} className="addcontent" placeholder="Write Something...."></textarea>
        <img src="./images/send1.png" alt="" className="sendimg" onClick={addedNote}/>
    </div>
    <div className="editnote">
        <p className="editnotehead">Edit note<img src='./images/close1.jpg' onClick={closeeditNote}></img></p>
        <input onChange={(e)=>{
                        addnotetitleSet(e.target.value)}} type="text" className="titleditnote" placeholder="Enter the title" value={addnotetitle}/>
        <textarea onChange={(e)=>{
                        addnotecontentSet(e.target.value)}} className="editcontent" placeholder="Write Something...." value={addnotecontent}></textarea>
        <img src="./images/send1.png" alt="" className="editsendimg" onClick={editHandle}/>
    </div>
   
    
    <nav className="nav">
        <div className="container flex">
          <img className='logout' src='./images/logout3.webp' onClick={logout}></img>
            <h1><h4>Hello,</h4> <span> {mainvar.name.charAt(0).toUpperCase()+mainvar.name.slice(1)}</span></h1>
                <div className="search flex">
                    <img src="./images/search-outline.svg" alt=""/>
                    
                        <input type="text" placeholder="search..." onChange={searchhandle}/>
                        <button type='submit' className='submitbtn hidden' onClick={btnsubmit}>submit</button>
                    
                </div>
                <img className='imu' src='./images/arch.png' onClick={archive}></img>
                <img className='bin' src='./images/bin.webp' onClick={recycle}></img>
            <div className="add-remove flex">
                <a href="" className="add-note flex" onClick={addNote}>
                    <div><img src="./images/plus.svg" alt="add-note"/></div>
                    <span className='yyy'>Add note</span>
                </a>
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
                        <span>{item.title}</span>
                        <span className='datee'>{item.date}</span>
                        <input type="checkbox" name="delete-note" id="delete-note"/>
                        <img src='./images/arch.png' className='arch' onClick={archered}/>
                    </h3>
                    <textarea value={item.content}></textarea>
                    <div className="edit-note flex">
                        <button id="Delete" onClick={deletesnote}>Delete</button>
                        <button id="edit" onClick={editNote}>Edit</button>
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
                        <span>{item.title}</span>
                        <span className='datee'>{item.date}</span>
                        <input type="checkbox" name="delete-note" id="delete-note"/>
                        <img src='./images/arch.png' className='arch' onClick={archered}/>
                    </h3>
                    <textarea value={item.content}></textarea>
                    <div className="edit-note flex">
                        <button id="Delete" onClick={deletesnote}>Delete</button>
                        <button id="edit" onClick={editNote}>Edit</button>
                    </div>
                </div>
            );
          })
      }
    </div>
    </>
  )
}

export default Notes