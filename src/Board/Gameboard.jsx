/* eslint-disable react/prop-types */
import './Gameboard.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Submarines from './Subs';

let COUNT = 0;
let TABLE = [];
let NUM = 0;
// eslint-disable-next-line react/prefer-stateless-function
class Square extends React.Component {
  render() {
    let count = 0;
    for (let row = 0; row < NUM; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        if (count === this.props.id - 100) {
          if (this.props.table[row][col] === true) {
            return (
              <button type="button" aria-label="btn" className="square-blue" id={this.props.id - 100} />
            );
          }
          return (
            <button type="button" aria-label="btn" className="square" id={this.props.id - 100} />
          );
        }
        count += 1;
      }
    }
    return (
      <button type="button" aria-label="btn" className="square" id={this.props.id - 100} />
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export function Board() {
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
  NUM = size;
  setSize(size);
  const [state, setState] = useState({ table: TABLE });
  const [socketId, setId] = useState('');
  const [wins, setwins] = useState(0);
  const socket = useSelector((state1) => state1.client);
  const dispatch = useDispatch();
  const sendData = async () => {
    socket.on('connect', () => {
      socket.emit('tbl', state.table);
    });
    socket.once('start', (msg) => {
      alert(msg);
    });
    socket.on('turn', (msg) => {
      alert(msg);
    });
    socket.once('won', (won, id) => {
      alert(won);
      if (id === socket.id) {
        setwins(wins + 1);
        setInterval(() => {
          window.location.reload();
        }, 1000);
      } else {
        setInterval(() => {
          window.location.reload();
        }, 10000);
      }
    });
    socket.once('setid', (id) => {
      COUNT = 0;
      setState({ table: state.table });
      COUNT = 0;
      setId(id);
      COUNT = 0;
    });
  };

  useEffect(() => {
    COUNT = 0;
    const subs = new Submarines();
    setState({ table: subs.addsub5(state.table) });
    setState({ table: subs.addsub4(state.table) });
    setState({ table: subs.addsub3(state.table) });
    setState({ table: subs.addsub2(state.table) });
    setState({ table: subs.addsub(state.table) });
    sendData();
    dispatch({ type: 'addBoard', payload: state.table });
    dispatch({ type: 'addAttack', payload: state.table });
  }, [wins]);

  // eslint-disable-next-line no-plusplus
  const renderSquare = () => <Square type="button" aria-label="btn" id={COUNT++} table={state.table} />;
  const renderRaw = (row) => (
    <div className={row}>
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
      {renderSquare()}
    </div>
  );
  return (
    <div>
      <div className="status">
        User:
        {socketId}
      </div>
      <h4 style={{ visibility: 'hidden' }}>
        wins:
        {wins}
      </h4>
      {state.table.map(() => (
        <div>
          {renderRaw(0)}
        </div>
      ))}
    </div>
  );
}
