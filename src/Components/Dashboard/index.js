import React from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import Swal from 'sweetalert2';

import Main from './main';
import './assets/dashboard.css';
import './assets/font-awesome.css';
import './assets/nunito-font.css';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          user : this.props.location.user,
          login : true
        }
    }

    componentDidMount = () => {
      console.log(this.state.user);
    }

    render(){
        return(
          <React.Fragment>
            <Main user={this.state.user}></Main>
            {/* <!-- Scroll to Top Button--> */}
            <a class="scroll-to-top rounded" href="#page-top">
              <i class="fas fa-angle-up"></i>
            </a>
          
            {/* <!-- Logout Modal--> */}
            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                  <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <Link to="/" className="btn btn-primary">Logout</Link>
                  </div>
                </div>
              </div>
            </div>
            {(!this.state.login) ? <Redirect to={{pathname:"/"}} push></Redirect> : ""}
         </React.Fragment>
        );
    };
}