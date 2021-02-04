import React from 'react';
import './Gameboard.css';
import { useDispatch, useSelector } from "react-redux";
import {useState,useEffect} from 'react';
import updateReducer from './Updateboard';
import { createStore } from 'redux';
import { useStore } from 'react-redux'
import socketIOClient, { io } from "socket.io-client";

let COUNT =-100;
let COUNT2=-100;
const ENDPOINT = "http://192.168.1.101:4001/";

export function SquareEnemy(props) {
    const store = useStore();
    const [wins,setWins] = useState(0);
    const dispatch = useDispatch();
    const socket = useSelector(state1 =>state1.client);

    const sendCick =(event) =>{
        socket.emit('attack',event.target.id);
        socket.once('hit',function(didhit){
            console.log(event.target.id);
            if(didhit===true){
                event.target.style.background ='pink';
                console.log('pink');
            }else if(didhit===false && event.target.style.background !=='pink'){
                event.target.style.background ='red';
                console.log('red');
                alert('other user turn wait for your turn');
            }else{
                alert('other user turn wait for your turn');
            }
        });
        
}
    
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
        if(event.target.style.background ==='red'){
        setTimeout(function () {
            alert('player two turn now')
        }, 1000);
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
        if(event.target.style.background ==='red'){
        setTimeout(function () {
            alert('player one turn now')
        }, 1000)
    }
    }
    gameEnded();
    }
    const gameEnded =() =>{
        let userOneWon = true,userTwoWon=true;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(store.getState().userBoard[row][col] === true){
                    userOneWon = false;
                }
            }
        }
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(store.getState().userBoard2[row][col] === true){
                    userTwoWon = false;
                }
            }
        }
        if(userOneWon){
            alert('user two won');
            dispatch({type:'userTwoWins'});
        }
        if(userTwoWon){
            alert('user one won');
            dispatch({type:'userOneWins'});
        }
            
        
    }
        return (
            <button className="square" id={props.id} onClick={sendCick} >
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
      const store = useStore();
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
            <div className="status" style={{marginTop:60}}>Attackuser1</div>
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
            <div className="status" style={{marginTop:"310px"}}>Attackuser2</div>
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
