import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Login from "../Login/Login";
import Registration from "../Login/Registration/Registration";
import Dashboard from "../Dashboard"

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
            <Route exact path='/' component={Login}></Route>
            <Route path='/Registration' component={Registration}></Route>
            <Route path='/Dashboard' component={Dashboard}></Route>
        </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
