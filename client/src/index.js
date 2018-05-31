import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// SOURCE: https://scotch.io/@micwanyoike/how-to-add-fonts-to-a-react-project
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nunito', 'Bowlby One SC', 'Raleway Dots', 'Passion One', 'Quicksand']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
