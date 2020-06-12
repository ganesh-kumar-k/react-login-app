import React from 'react';
import "./index.css";
import Swal from 'sweetalert2';
import firebase from '../Firebase/Firebase_Config';
import {
    Link
  } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date(),
            allUsers : []
        };
    }

    componentDidMount = () => {
        firebase.firestore().collection('users').onSnapshot((snapshot)=>{
            snapshot.docs.map((user)=>{
                this.state.allUsers.push(user.data());
            });
        });
    }

    fieldValidation = () => {
        let isValid = true;
        let fields = ["inputEmailUserName","inputPassword"];
        let focusField, count = 0;
        fields.forEach((field)=>{
            let input = document.getElementById(field);
            input.classList.remove("border-danger");
            if(!input.value){
                input.classList.add("border-danger");
                isValid = false;
                if(count === 0){
                    focusField = input;
                    count++;
                }
            }
        });
        if(!isValid){
            focusField.focus();
            this.swtoast("warning", "Username/Password should be mandatory")
        }
        return isValid
    }

    swtoast = (icon, title) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
        Toast.fire({
            icon: icon,
            title: title
        });
    }

    signin = (event) => {
        event.preventDefault();
        const fieldvalidation = this.fieldValidation();
        if(!fieldvalidation){
            return false;
        }
        let userName = document.getElementById("inputEmailUserName").value;
        let passWord = document.getElementById("inputPassword").value;
        const validationResult = this.validateAccount(userName,passWord);
        if(!validationResult.isValid){
            Swal.fire({
                icon: 'error',
                title: validationResult.title,
                text: validationResult.text,
                footer: "<a href='#' title='"+validationResult.information+"'>Why do I have this issue?</a>"
              })
        }else{
            this.swtoast("success", "Signed in successfully");
        }
    }

    validateAccount = (userName, passWord) => {
        let obj = {isValid:false,title:"Oops...",text:"This account is not registered",buttontext:"Register",information:"Your account is not registered. Please click the Register link to sign in"};
        this.state.allUsers.forEach((account)=>{
            if(account.username === userName || account.email === userName){
                obj = {isValid:false,title:"Oops...",text:"The password is incorrect",buttontext:"Forgot password",information:"Your account password is Incorrect. Please click the Forgot the password link to change password"};
                if(account.password === passWord){
                    obj = {isValid:true,title:"Success",text:"Login success",buttontext:"",information:""};
                }
            }
        });
        return obj;
    }
    render(){
        return(
            <React.Fragment>
             <div className="sidenav">
                <div className="login-main-text">
                    <h2>Application<br/> Login Page</h2>
                    <p>Login or register from here to access.</p>
                </div>
            </div>
            <div className="main login-main">
              <div className="col-md-6 col-sm-12 login-container">
                <div className="card card-container">
                    {/*</div><img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> */}
                    <img id="profile-img" className="profile-img-card" alt="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="email" id="inputEmailUserName" className="form-control" placeholder="Email address" required="" autoFocus=""/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.signin.bind(this)}>Sign in</button>
                    </form>
                    <Link to="/Dashboard" className="Register-account">Skip Login</Link>
                    <a href="#" className="forgot-password">
                        Forgot the password?
                    </a>
                    <Link to="/Registration" className="Register-account">New user? Register</Link>
                  </div>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default Login;