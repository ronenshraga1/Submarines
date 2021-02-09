/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reportWebVitals from './reportWebVitals';
import { Board } from './Board/Gameboard';
import { EnemyBoard } from './Board/EnemyBoard';
import updateReducer from './Board/Updateboard';

const store = createStore(updateReducer);
ReactDOM.render(
  <React.StrictMode>
    <script src="/socket.io/socket.io.js" />
    <Provider store={store}>
      <div className="boards-container">
        <div className="subs-container">
          <Board />
        </div>
        <div>
          <EnemyBoard />
        </div>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
