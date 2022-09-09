import React,{useState,useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Logo from "../assets/ISS_lgo.png";

function Register(){
    const navigate= useNavigate();
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark",
    };

    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    };

    const handleValidation =()=>{
        const {username,email,password,confirmPassword} = values;
        if(username.length<3){
            toast.error(
                "Username should be longer than 3 characters",
                toastOptions
            );
            return false;
        }else if(email ===""){
            toast.error(
                "You need to provide an email",
                toastOptions
            );
            return false;
        }
        else if(password.length<6){
            toast.error(
                "Password must contain at least 6 characters",
                toastOptions
            );
            return false;

        }else if(password !== confirmPassword){
            toast.error(
                "Passwords should coincide.",
                toastOptions
            );
            return false;
        } 
        return true
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(handleValidation()){
            const {username,email,password} = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if(data.status===false){
                toast.error(data.message, toastOptions)
            }
            if(data.status ===true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
            
       }
    };

    return (
    <>
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="brand">
                    <img src={Logo} alt=""/>
                    <h1>ISS</h1>
                </div>
                <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                onChange={(e)=> handleChange(e)}
                />
                <input 
                type="email" 
                placeholder="Email" 
                name="email" 
                onChange={(e)=> handleChange(e)}
                />
                <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={(e)=> handleChange(e)}
                />
                <input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                onChange={(e)=> handleChange(e)}
                />
                <button type="submit">Create user</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link> 
                </span>
            </form>
        </FormContainer>
        <ToastContainer/>


    </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #343434;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color: white;
            text-transform: uppercase
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000080;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #f29f41;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: #0.1rem solid #f29f41;
                outline: none;
            }
        }
        button{
            background-color: #e3be44;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor:pointer;
            border-radius: 0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition: 0.5sec ease-in-out;
            &:hover{
                background-color: #ed8c05;
            }
        }
        span{
            color:white;
            text-transform: uppercase;
            a{
                color: #e3be44;
                text-decoration: none;
                font-weight: bold;
                &:hover{
                    text-decoration: underline;
                    color: #e3be44;
                }
            }
            
        }
    }
`;

export default Register;