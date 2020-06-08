import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Login from "../Login/Login";
import Registration from "../Login/Registration/Registration";

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div className="App">
        <Router>
            <Route exact path='/' component={Login}></Route>
            <Route path='/Registration' component={Registration}></Route>
        </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
