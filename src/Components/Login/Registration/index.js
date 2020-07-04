import React from "react";
import './index.css';
import {
  Link,
  Redirect
} from "react-router-dom";
import firebase from '../../Firebase/Firebase_Config';
import Swal from 'sweetalert2';

class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      countries : ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
      allUserNames : [],
      allUserMails : [],
      redirect : false
    }
  }

  componentDidMount = ()=> {
      let usernames = [];
      let usermails = [];
      firebase.firestore().collection('users').onSnapshot((snapshot)=>{
        snapshot.docs.map((user,index)=>{
            let data = user.data();
            if(data.username){
                usernames.push(data.username);
            }
            if(data.email){
                usermails.push(data.email)
            }
            if(snapshot.docs.length === (index+1)){
                this.setState({allUserMails:usermails,allUserNames:usernames});
            }
        });
      });
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

  fieldValidation = (level) => {
    let obj = {
        isValid : true,
        icon : "warning",
        text : ""
    };
    let fields = ["_fn","_ln","_pass","_conpass","_country","_un","_mail","_phone","_ques","_ans"];
    let focusField, count = 0;
    fields.forEach((field)=>{
        let input = document.getElementById(level+field);
        input.classList.remove("border-danger");
        if(!input.value){
            input.classList.add("border-danger");
            obj.isValid = false;
            obj.text ="Please fill all the mandatory fields";
            if(count === 0){
                focusField = input;
                count++;
            }
        }
    });
    if(obj.isValid){
        let pass = document.getElementById(level+"_pass");
        let conpass = document.getElementById(level+"_conpass");
        if(pass.value !== conpass.value){
            pass.classList.add("border-danger");
            conpass.classList.add("border-danger");
            focusField = conpass;
            obj.isValid = false;
            obj.text = "Password doesn't match";
        }
    }
    if(obj.isValid){
        let username = document.getElementById(level+"_un");
        if(this.state.allUserNames.indexOf(username.value) > -1){
            username.classList.add("border-danger");
            focusField = username;
            obj.isValid = false;
            obj.text = "Username already exists";
        }
    }
    if(obj.isValid){
        let mail = document.getElementById(level+"_mail");
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.allUserMails.indexOf(mail.value) > -1){
            mail.classList.add("border-danger");
            focusField = mail;
            obj.isValid = false;
            obj.text = "Mail is already registered";
        }else if(!regex.test(mail.value)){
            mail.classList.add("border-danger");
            focusField = mail;
            obj.isValid = false;
            obj.text = "Invalid email";
        }
    }
    if(!obj.isValid){
        focusField.focus();
        this.swtoast(obj.icon, obj.text);
    }
    return obj.isValid;
  }

  registerUser = async (event, level) => {
    event.preventDefault();
    const fieldValidation = this.fieldValidation(level);
    if(!fieldValidation){
        return false;
    }
    let sel = document.getElementById(level+"_ques");
    let ques = sel.options[sel.selectedIndex].text;
    firebase.firestore().collection('users').add({
        firstname : document.getElementById(level+"_fn").value,
        lastname : document.getElementById(level+"_ln").value,
        email : document.getElementById(level+"_mail").value,
        username : document.getElementById(level+"_un").value,
        password : document.getElementById(level+"_pass").value,
        country : document.getElementById(level+"_country").value,
        securityquestion : ques,
        securityanswer : document.getElementById(level+"_ans").value,
        gender : document.querySelector("input[name='"+level+"_gender']:checked").value,
        level : level
    }).then((data)=>{
        Swal.fire({
            title: 'Success',
            text: "Now you are a part of our family",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login'
          }).then((result) => {
            if (result.value) {
              this.setState({redirect:true});
            }
          })
    }).catch((error)=>{
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
    });
  }

  render(){
    return(
      <React.Fragment>
        <div className="container-fluid register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from accessing our application!</p>
                        <button type="submit" name=""><Link to="/" className="Register-account">Login</Link></button><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">User</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Admin</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Apply as a User</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="user_fn" placeholder="First Name *"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="user_ln" placeholder="Last Name *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="user_pass" placeholder="Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="user_conpass" placeholder="Confirm Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control" id="user_country">
                                                <option className="hidden" value="" selected disabled>Please select your country</option>
                                                {this.state.countries.map((country)=>{
                                                  return(
                                                    <option value={country}>{country}</option>
                                                  );
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <div className="radio-div">
                                                <label className="radio inline"> 
                                                    <input type="radio" name="user_gender" value="male" checked/>
                                                    <span> Male </span> 
                                                </label>
                                                <label className="radio inline"> 
                                                    <input type="radio" name="user_gender" value="female"/>
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="user_un" placeholder="Choose Username *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="user_mail" placeholder="Your Email *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" id="user_phone" className="form-control" placeholder="Your Phone *"  />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control" id="user_ques">
                                                <option value="" className="hidden"  selected disabled>Please select your Security Question</option>
                                                <option value="1">What is your favorite school name?</option>
                                                <option value="2">What is Your old Phone Number?</option>
                                                <option value="3">What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="user_ans" placeholder="Enter Your Answer *"  />
                                        </div>
                                        <p class="terms-and-conditions">By clicking Sign Up, you agree to our <a href="/legal/terms/update" id="terms-link" target="_blank" rel="nofollow">Terms</a>, <a href="/about/privacy/update" id="privacy-link" target="_blank" rel="nofollow">Data Policy</a> and <a href="/policies/cookies/" id="cookie-use-link" target="_blank" rel="nofollow">Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
                                        <input type="submit" className="btnRegister"  value="Register" onClick={(event)=>this.registerUser(event,"user")}/>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  className="register-heading">Apply as a Admin</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="admin_fn" placeholder="First Name *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="admin_ln" placeholder="Last Name *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="admin_mail" placeholder="Email *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" maxlength="10" minlength="10" className="form-control" id="admin_phone" placeholder="Phone *"  />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control" id="admin_country">
                                                <option className="hidden" value="" selected disabled>Please select your country</option>
                                                {this.state.countries.map((country)=>{
                                                  return(
                                                    <option value={country}>{country}</option>
                                                  );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="admin_un" placeholder="Choose Username *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="admin_pass" placeholder="Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="admin_conpass" placeholder="Confirm Password *"  />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control" id="admin_ques">
                                                <option value="" className="hidden"  selected disabled>Please select your Sequrity Question</option>
                                                <option value="1">What is your Birthdate?</option>
                                                <option value="2">What is Your old Phone Number</option>
                                                <option value="3">What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="admin_ans" placeholder="`Answer *"  />
                                        </div>
                                        <p class="terms-and-conditions">By clicking Sign Up, you agree to our <a href="/legal/terms/update" id="terms-link" target="_blank" rel="nofollow">Terms</a>, <a href="/about/privacy/update" id="privacy-link" target="_blank" rel="nofollow">Data Policy</a> and <a href="/policies/cookies/" id="cookie-use-link" target="_blank" rel="nofollow">Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
                                        <input type="submit" className="btnRegister"  value="Register" onClick={(event)=>this.registerUser(event,"admin")}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              {(this.state.redirect) ? <Redirect to={{pathname:"/"}} push></Redirect> : ""}
      </React.Fragment>
    );
  };
}

export default Registration;