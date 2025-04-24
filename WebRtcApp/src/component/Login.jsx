import React, {useState} from "react";

const Login =(props) =>{
    const [userName, setUserName] = useState('');
    const handleValueChange = (e)=>{
            setUserName (e.target.value);
    }
    const isValidUsrName =() =>{
        console.log(userName);
        return userName.length > 0 && userName.length < 15 && !userName.includes(' ');
    }
    return <>
        <p className={props.logoClass}> ChatApp </p>
        <input className ={props.loginInputClass} 
                value = {userName} 
                onChange={handleValueChange}
        />
        <button disabled={!isValidUsrName()} className={props.loginButtonClass} onClick={props.clickHandle} > 
            Login
        </button>
    </>

}

export default Login;