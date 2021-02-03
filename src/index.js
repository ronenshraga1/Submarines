import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Board} from './Board/Gameboard';
import {Board2} from './Board/GameBoard2';
import { EnemyBoard } from "./Board/EnemyBoard";
import { Provider } from "react-redux";
import { createStore } from "redux";
import updateReducer from "./Board/Updateboard";

const store = createStore(updateReducer);
ReactDOM.render(
  <React.StrictMode>
    <script src="/socket.io/socket.io.js"></script>
    <Provider store={store}>
    <div className="boards-container">
      <div className="subs-container">
    <Board />
    <div className="sub2">
    <Board2 />
    </div>
    </div>
    <div>
    <EnemyBoard />
    </div>
    </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
