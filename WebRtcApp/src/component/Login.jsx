import React, {useContext} from "react";
import {Context as AuthContext} from '../context/AuthContext';

const Login =(props) =>{

    const {state, setName} = useContext(AuthContext); 
    const handleValueChange = (e)=>{
        setName (e.target.value);
    }
    const isValidUsrName =() =>{
        console.log('is valid user');
        return state.name.length > 0 && state.name.length < 15 && !state.name.includes(' ') && state.userLocation !=null;
    }
    return <>
        <p className={props.logoClass}> ChatApp </p>
        <input className ={props.loginInputClass} 
                value = {state.name} 
                onChange={handleValueChange}
        />
        <button disabled={!isValidUsrName()} className={props.loginButtonClass} onClick={props.clickHandle} > 
            Login
        </button>
    </>

}

export default Login;