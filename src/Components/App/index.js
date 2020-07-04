import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './index.css';
import Login from "../Login";
import Registration from "../Login/Registration";
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
