import React from 'react';
import './Gameboard.css';
import { useDispatch, useSelector } from "react-redux";
import {useState,useEffect} from 'react';
import updateReducer from './Updateboard';
import { createStore } from 'redux';
import { useStore } from 'react-redux'

let COUNT =-100;
let COUNT2=-100;
export function SquareEnemy(props) {
    const store = useStore();
    const dispatch = useDispatch();
    const handleClick=(event)=>{
        if(parseInt(props.tableid) ===0){
        dispatch({type:'attack1', payload:event.target.id})
        let count =-1;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                count++;
                if(count === parseInt(event.target.id))
                {
                    console.log('check');
                    if(store.getState().userBoard2[row][col] !== store.getState().attackBoard2[row][col]){
                        event.target.style.background ='pink';
                    }else{
                        event.target.style.background ='red';
                    }
                }
            }
            
        }
    }else{
        dispatch({type:'attack2', payload:event.target.id})
        let count =-1;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                count++;
                if(count === parseInt(event.target.id))
                {
                    console.log('check');
                    if(store.getState().userBoard[row][col] !== store.getState().attackBoard[row][col]){
                        event.target.style.background ='pink';
                    }else{
                        event.target.style.background ='red';
                    }
                }
            }
            
        }
    }
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
        return <SquareEnemy id={COUNT++} table={state.table} tableid ={0}/>;
        } else{
            return <SquareEnemy id={COUNT2++} table={state.table2}  tableid ={1}/>;
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
