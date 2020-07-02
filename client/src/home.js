import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
// SOURCE: https://reactstrap.github.io/
// import { Button } from 'reactstrap';

class Home extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-intro" >
            <div className="App-title"></div>
            scr<span className="appcolors">app</span><span className="line" /> Book<br />
          </div>
          <p className="description">Make memories and save them on ScrAPP Book,
            the online destination for all your fave moments.</p>
        </div>
      </Router>
    );
  }
}


export default Home;
