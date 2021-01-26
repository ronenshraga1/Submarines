import React from 'react';
import './Gameboard.css';
import { useDispatch, useSelector } from "react-redux";
let COUNT =0;
let COUNT2=0;
export function SquareEnemy(props) {
    const handleClick=(event)=>{
        const dispatch = useDispatch();
        event.target.style.background ='red';
        //send request to server
    }
    
        return (
            <button className="square" id={props.id} onClick={handleClick}>
            </button>
          );
    
}
export function EnemyBoard(props) {
    const [state,setState] = useState({table:[
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
      ],table2:[
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
      ]});
    
    const renderSquare=(i)=> {
        if(i===1){
        return <SquareEnemy id={COUNT++} table={state.table} />;
        } else{
            return <SquareEnemy id={COUNT2++} table={state.table2} />;
        }
      }
      const renderRaw=(i) =>{
          return (
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
          )
      }
    
      
        const status = 'Next player: X';

        return (
          <div>
            <div className="status">Attackuser1</div>
            <div className="board-row">
              {renderRaw(1)}
            </div>
            <div className="board-row">
              {renderRaw(1)}
            </div>
            <div className="board-row">
              {renderRaw(1)}
            </div>
            <div className="board-row">
              {renderRaw(1)}
            </div>
            <div className="board-row">
            {renderRaw(1)}
            </div>
            <div className="board-row">
            {renderRaw(1)}
            </div>
            <div className="board-row">
            {renderRaw(1)}
            </div>
            <div className="board-row">
            {renderRaw(1)}
            </div>
            <div className="board-row">
            {renderRaw(1)}
            </div>
            <div className="board-row" onClick={console.log('ccc')}>
            {renderRaw(1)}
            </div>
            <div>
            <div className="status" style={{marginTop:"250px"}}>Attackuser2</div>
            <div className="board-row">
              {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row">
            {renderRaw(2)}
            </div>
            <div className="board-row" onClick={console.log('ccc')}>
            {renderRaw(2)}
            </div>
          </div>
          </div>
        );
      }
    