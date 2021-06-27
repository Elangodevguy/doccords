import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const root = document.getElementById("root");

if (root) {
  // 1. Set up the browser history with the updated location
  // (minus the # sign)
  const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }

  // 2. Render our app
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import { render } from 'react-dom';
// import { createBrowserHistory } from 'history';

// import App from './App';

// const history = createBrowserHistory();

// let app = document.getElementById('app');
// if (app) {
//     // 1. Set up the browser history with the updated location
//     // (minus the # sign)
// 	const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
// 	if (path) {
// 		history.replace(path);
// 	}

//     // 2. Render our app
// 	render(<App />, app);
// }
