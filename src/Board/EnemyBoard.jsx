import React, { useState } from 'react';
import './Gameboard.css';
import { useDispatch, useSelector, useStore } from 'react-redux';

let COUNT = -100;
let COUNT2 = -100;
let TABLE = [];
export function SquareEnemy(props) {
  const store = useStore();
  // eslint-disable-next-line no-unused-vars
  const [wins, setWins] = useState(0);
  const dispatch = useDispatch();
  const socket = useSelector((state1) => state1.client);

  const sendCick = (event) => {
    socket.emit('attack', event.target.id);
    socket.once('hit', (didhit) => {
      if (didhit === true) {
        event.target.style.background = 'pink';
      } else if (didhit === false && event.target.style.background !== 'pink') {
        event.target.style.background = 'red';
        alert('other user turn wait for your turn');
      } else {
        alert('other user turn wait for your turn');
      }
    });
  };
  // eslint-disable-next-line no-unused-vars
  const handleClick = (event) => {
    // eslint-disable-next-line react/prop-types
    if (parseInt(props.tableid) === 0) {
      dispatch({ type: 'attack1', payload: event.target.id });
      let count = -1;
      for (let row = 0; row < 10; row += 1) {
        for (let col = 0; col < 10; col += 1) {
          count += 1;
          if (count === parseInt(event.target.id)) {
            if (store.getState().userBoard2[row][col] !== store.getState().attackBoard2[row][col]) {
              event.target.style.background = 'pink';
            } else {
              event.target.style.background = 'red';
            }
          }
        }
      }
      if (event.target.style.background === 'red') {
        setTimeout(() => {
          alert('player two turn now');
        }, 1000);
      }
    } else {
      dispatch({ type: 'attack2', payload: event.target.id });
      let count = -1;
      for (let row = 0; row < 10; row += 1) {
        for (let col = 0; col < 10; col += 1) {
          count += 1;
          if (count === parseInt(event.target.id)) {
            if (store.getState().userBoard[row][col] !== store.getState().attackBoard[row][col]) {
              event.target.style.background = 'pink';
            } else {
              event.target.style.background = 'red';
            }
          }
        }
      }
      if (event.target.style.background === 'red') {
        setTimeout(() => {
          alert('player one turn now');
        }, 1000);
      }
    }
    // eslint-disable-next-line no-use-before-define
    gameEnded();
  };
  const gameEnded = () => {
    let userOneWon = true;
    let userTwoWon = true;
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        if (store.getState().userBoard[row][col] === true) {
          userOneWon = false;
        }
      }
    }
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        if (store.getState().userBoard2[row][col] === true) {
          userTwoWon = false;
        }
      }
    }
    if (userOneWon) {
      alert('user two won');
      dispatch({ type: 'userTwoWins' });
    }
    if (userTwoWon) {
      alert('user one won');
      dispatch({ type: 'userOneWins' });
    }
  };
  return (
    // eslint-disable-next-line react/prop-types
    <button type="button" aria-label="btn" className="square" id={props.id} onClick={sendCick} />
  );
}
export function EnemyBoard() {
  // eslint-disable-next-line no-unused-vars
  const setSize = (num) => {
    // eslint-disable-next-line prefer-const
    let mat = [];
    let row = [];
    for (let i = 0; i < num; i += 1) {
      for (let j = 0; j < num; j += 1) {
        row.push(false);
      }
      mat.push(row);
      row = [];
    }
    TABLE = mat;
  };
  const size = useSelector((state1) => state1.boardSize);
  setSize(size);
  const [state] = useState({
    table: TABLE,
  });
  const renderSquare = (i) => {
    if (i === 1) {
      // eslint-disable-next-line no-plusplus
      return <SquareEnemy id={COUNT++} table={state.table} tableid={0} />;
    }
    // eslint-disable-next-line no-plusplus
    return <SquareEnemy id={COUNT2++} table={state.table2} tableid={1} />;
  };
  const renderRaw = (i) => (
    <div>
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
      {renderSquare(i)}
    </div>
  );

  return (
    <div>
      <div className="status" style={{ marginTop: 60 }}>Attackuser1</div>
      {state.table.map(() => (
        <div>
          {renderRaw(0)}
        </div>
      ))}
    </div>
  );
}
