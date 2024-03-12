
import {useState} from 'react';
import { TextField } from "@mui/material";


const LoginPage = (props) => {
    const [userName, setUserName] = useState("");
    return(
        <div className = "Login-Div">
            <TextField value = {userName} label = "Enter User Name" onChange = {(e) => {
                setUserName(e.target.value);
            }}></TextField>
            <button onClick= {() => {
                props.UserNameSetter(userName);
                console.log("Clicked Button");
                if(userName != ""){
                    props.LoggedIn();
                }
            }}>{props.Info}</button>
        </div>
    );
}

export default LoginPage;