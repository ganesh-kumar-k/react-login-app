import React from 'react';
import "./index.css";
import Swal from 'sweetalert2';
import firebase from '../Firebase/Firebase_Config';
import {
    Link,Redirect
  } from "react-router-dom";
import { analytics } from 'firebase';
import swal from 'sweetalert';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date(),
            allUsers : [],
            login : false,
            user : {}
        };
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

    signin = async (event) => {
        event.preventDefault();
        const fieldvalidation = this.fieldValidation();
        if(!fieldvalidation){
            return false;
        }
        let userName = document.getElementById("inputEmailUserName").value;
        let passWord = document.getElementById("inputPassword").value;
        const validationResult = await this.validateAccount(userName,passWord);
        if(!validationResult.isValid){
            Swal.fire({
                icon: 'error',
                title: validationResult.title,
                text: validationResult.text,
                footer: "<a href='#' title='"+validationResult.information+"'>Why do I have this issue?</a>"
              })
        }else{
            this.setState({login : true},()=>{
                this.swtoast("success", "Welcome, "+this.state.user.firstname);
            });
        }
    }

    forgotPassword = (e) => {
        e.preventDefault();
        let securityQuestion,securityAnswer,password;
        Swal.queue([{
        title: 'Security Verification',
        confirmButtonText: 'Confirm',
        input: 'text',
        inputValidator: async (value) => {
            if (!value) {
              return 'You need to write something!'
            }else{
              let isValid = false;
              Swal.enableLoading();
              const checkUser = await firebase.firestore().collection('users').where("email","==",value).get();
              console.log(checkUser);
              checkUser.forEach((doc)=>{
                    securityQuestion = doc.data().securityquestion;
                    securityAnswer = doc.data().securityanswer;
                    password = doc.data().password;
                    isValid = true;
              });
              Swal.disableLoading();
              if(!isValid){
                  return 'Your mail id is not registered in our system'
              }
            }
        },
        text: 'Please type your registered mail id',
        showLoaderOnConfirm: true,
        preConfirm: async (data) => {
            Swal.queue([{
                title: 'Security Verification',
                confirmButtonText: 'Confirm',
                input: 'text',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }else{
                        if(securityAnswer !== value){
                            return 'Wrong answer'
                        }
                    }
                },
                text: securityQuestion,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    Swal.fire({
                        icon: 'success',
                        html: 'Your password is : <strong>'+password+'</strong>',
                        footer: "<a href='#' style='color:red'>Don't share your password to anyone</a>"
                      })
                }
            }]);
          }
        }])
    }

    skipSignIn = () =>{
        this.swtoast("success", "Welcome, Guest User!");
        this.setState({login : true});
    }

    validateAccount = async (userName, passWord) => {
        let obj = {isValid:false,title:"Oops...",text:"This account is not registered",buttontext:"Register",information:"Your account is not registered. Please click the Register link to sign in"};
        let userDetails;
        const userNameFilter = await firebase.firestore().collection('users').where("username","==",userName).get();
        const userEmailFilter = await firebase.firestore().collection('users').where("email","==",userName).get();
        if(!userNameFilter.empty || !userEmailFilter.empty){
            let userData = (!userNameFilter.empty) ? userNameFilter : userEmailFilter;
            userData.forEach(doc=>{
                obj = {isValid:false,title:"Oops...",text:"The password is incorrect",buttontext:"Forgot password",information:"Your account password is Incorrect. Please click the Forgot the password link to change password"};
                if(doc.data().password === passWord){
                    obj = {isValid:true,title:"Success",text:"Login success",buttontext:"",information:""};
                    userDetails = doc.data();
                }
                console.log(doc.data());
            });
        }
        this.setState({user : userDetails});
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
                    <a href="#" className="Register-account" onClick={this.skipSignIn.bind(this)}>
                       Skip Login
                    </a>
                    <a href="#" className="forgot-password" onClick={this.forgotPassword.bind(this)}>
                        Forgot the password?
                    </a>
                    <Link to="/Registration" className="Register-account">New user? Register</Link>
                  </div>
                </div>
            </div>
            {(this.state.login) ? <Redirect to={{pathname:"/Dashboard",user:this.state.user}} push></Redirect> : ""}
        </React.Fragment>
        );
    }
}

export default Login;