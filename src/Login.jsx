import "./login.css";
import { useState } from "react";
import {Routes,Route} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Axios from "axios";


function Login() {
    var a=[];
    const api=process.env.REACT_APP_URL;
    var b=[];
    const navigate=useNavigate();
    const [luname,setluName]=useState("")
    const [suname,setsuName]=useState("")
    const [lpass,setlPass]=useState("")
    const [spass,setsPass]=useState("")
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [validate,setValidate]=useState([null])
    const signupFunc=()=>{
        var login=document.querySelector(".login_main")
        var signup=document.querySelector(".signup_main")
        login.style.display="none"
        signup.style.display="inherit"
        document.querySelector(".ss").classList.add("active")
        document.querySelector(".ls").classList.remove("active")
        var y=document.querySelectorAll(".li");
        y.forEach((userItem) => {
            userItem.value="";
          });
    }
    const loginFunc=()=>{
        var login=document.querySelector(".login_main")
        var signup=document.querySelector(".signup_main")
        login.style.display="inherit"
        signup.style.display="none"
        document.querySelector(".ls").classList.add("active")
        document.querySelector(".ss").classList.remove("active")
        var y=document.querySelectorAll(".si");
        y.forEach((userItem) => {
            userItem.value="";
          });
    }
  const addPerson = () => {
    Axios.post(api+"create", {
        name:name,
        email:email,
        uname:suname,
        pass:spass,
    }).then(() => {
      alert(name+" is added to database");
      loginFunc();
    });
  };
    const routeTo=()=>{
        navigate("/notes",{state:{
            data:a[0],
            data1:b,
        }});
    }
    const fetchData=async(e)=>{
        const resp= Axios.post(api+"fetchdata", {
        uname:e,
        }).then(async(response)=>
        {
            b=response.data;
            routeTo();
        });
    }
    const loginRequest=()=>{
        const resp= Axios.post(api+"validate", {
        uname:luname,
        pass:lpass,
        }).then((response)=>
        {
            a=response.data;
            setValidate(a);
            if(a.length==0)
            {
                alert("invalid");
            }
            if(a[0].username==luname &&a[0].password==lpass)
            {
                fetchData(a[0].username);
                alert("Welcome "+a[0].username);
                 
            }
        });
    }
  const validatePerson = () => {
    loginRequest();
  }

  return (
    <div className="loginMain">
        <h1>Notify</h1>
            <div className='login'>
                <div className="login_empty"><img src="notes.png" alt="jj"/></div>
                <div className="login_box">
                <h2><span className='ls active' onClick={loginFunc}>Login</span><span className='ss' onClick={signupFunc}>SignUp</span></h2>
                <div className="login_main">
                    <span>Enter your Username</span>
                    <input className="li" type='text' onChange={(e)=>{
                        setluName(e.target.value)
                    }}></input>
                    <span>Enter your password</span>
                    <input className="li" type='password' onChange={(e)=>{
                        setlPass(e.target.value)
                    }}></input>
                    <span className='fp'>forgot password?</span>
                    <button type='submit' onClick={validatePerson}>Submit</button>
                </div>
                <div className="signup_main">
                    <span>Enter your Name</span>
                    <input className="si" type='text' onChange={(e)=>{
                        setName(e.target.value)
                    }}></input>
                    <span>Enter your Username</span>
                    <input className="si" type='text' onChange={(e)=>{
                        setsuName(e.target.value)
                    }}></input>
                    <span>Enter your Email</span>
                    <input className="si" type='email' onChange={(e)=>{
                        setEmail(e.target.value)
                    }}></input>
                    <span>Enter your password</span>
                    <input className="si" type='password' onChange={(e)=>{
                        setsPass(e.target.value)
                    }}></input>
                    <button type='submit' onClick={addPerson}>Submit</button>
                </div>

                </div>
            </div>
    </div>
  );
}

export default Login;
