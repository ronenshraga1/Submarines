import './Gameboard.css';
import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector,useStore } from 'react-redux';
import Button from '@material-ui/core/Button';
import updateReducer from './Updateboard';
import socketIOClient, { io } from "socket.io-client";
const ENDPOINT = "http://192.168.1.101:4001/";
let COUNT =0;
class Square extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let count =0;
        for(let row =0;row<10;row++){
            for(let col =0;col<10;col++){
                if(count === this.props.id-100){
                    if(this.props.table[row][col] === true){
                        return (
                            <button className="square-blue" id={this.props.id-100}>
                            </button>
                          );
                    }else{
                        return (
                            <button className="square" id={this.props.id-100}>
                            </button>
                          );
                    }
                }
                count++;
            }
        }
        return (
            <button className="square" id={this.props.id-100}>
            </button>
          );
    }
}

export function Board()  {
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
      ]});
    let wins1 = useSelector(state1 => state1.wins);
    const socket = useSelector(state1 =>state1.client);
    const dispatch = useDispatch();
    const store = useStore();
    localStorage.setItem('wins','0');
    const ship5 = ()=>{
            setState({table:[
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
          console.log(state.table)
      const newTable = state.table.slice()
      console.log(newTable) //copy the array
      let row = Math.floor(Math.random()*3+6);
      let col = Math.floor(Math.random()*3+6);
      if(col>=6 && row>=6){
        newTable[row][col] = true;
        newTable[row][col-1] = true;
        newTable[row][col-2] = true;
        newTable[row][col-3] = true;
        newTable[row][col-4] = true;
        setState({table:newTable});
        }else{

        }
      }
      const ship4=()=>{
      const newTable = state.table.slice() //copy the array
      let row = Math.floor(Math.random()*6);
      let col = Math.floor(Math.random()*10);
      if(row>3){
          if(newTable[row][col] !== true && newTable[row-1][col] !== true && newTable[row-2][col] !== true && newTable[row-3][col] !== true){
              newTable[row][col] = true;
              newTable[row-1][col] = true;
              newTable[row-2][col] = true;
              newTable[row-3][col] = true;
              setState({table:newTable});
          }
      
      }else if(row<=3 && col <=4){
              newTable[row][col] = true;
              newTable[row][col+1] = true;
              newTable[row][col+2] = true;
              newTable[row][col+3] = true;
              setState({table:newTable});
      } else if(row<=3 && col >4){
              newTable[row][col] = true;
              newTable[row][col-1] = true;
              newTable[row][col-2] = true;
              newTable[row][col-3] = true;
              setState({table:newTable});
          } 
      }
      const ship3=()=>{
      const newTable = state.table.slice()
      let row = Math.floor(Math.random()*10);
      let col = Math.floor(Math.random()*8);
      while(newTable[row][col] === true ||newTable[row][col+1] === true ||newTable[row][col+2] === true){
          row = Math.floor(Math.random()*10);
          col = Math.floor(Math.random()*10);
      }
      console.log(row,col);
      newTable[row][col] = true;
      newTable[row][col+1] = true;
      newTable[row][col+2] = true;
      setState({table:newTable});

      }
      const ship2=()=>{
          const newTable = state.table.slice()
      let row = Math.floor(Math.random()*9);
      let col = Math.floor(Math.random()*10);
      while(newTable[row][col] === true ||newTable[row+1][col] === true ){
          row = Math.floor(Math.random()*9);
          col = Math.floor(Math.random()*10);
      }
      newTable[row][col] = true;
      newTable[row+1][col] = true;
      setState({table:newTable});
      }
      const ship=()=>{
      const newTable = state.table.slice()
      let row = Math.floor(Math.random()*10);
      let col = Math.floor(Math.random()*10);
      while(newTable[row][col] === true ){
          row = Math.floor(Math.random()*10);
          col = Math.floor(Math.random()*10);
      }
      console.log(row,col);
      newTable[row][col] = true;
      setState({table:newTable});
      }
      const getData = async  ()=>{         
        socket.on('connect', function() {
            console.log('Connected to server');
            socket.emit('tbl', state.table);
        });
    }
    const getData2 =async  ()=>{
         
        let socket = io(ENDPOINT,{ transport : ['websocket'] });
        try{
            const response  = await fetch("http://localhost:4001/")
            console.log(response.ok);
            if(response.ok){
              //const jsonResponse = await response.json();
              //console.log(jsonResponse);
            }
        
          }catch(error){
            console.log(error);
          }
    }
      useEffect(()=> {
          COUNT =0;
          ship5();
          ship();
          ship2();
          ship3();
          ship4();
          getData();
          dispatch({type:'addBoard',payload:state.table});
          dispatch({type:'addAttack',payload:state.table});
        },[wins1])
        

      
      const renderSquare=()=> {
          
        return <Square id={COUNT++} table={state.table}/>;
      }
  const renderRaw =(row) =>{
      return (
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
      )
  }
    return (
      <div>
        <div className="status">User:{socket.id}</div>
        <h4>wins:{wins1}</h4>
        <div className="board-row">
          {renderRaw(1)}
        </div>
        <div className="board-row">
          {renderRaw(2)}
        </div>
        <div className="board-row">
          {renderRaw(3)}
        </div>
        <div className="board-row">
          {renderRaw(4)}
        </div>
        <div className="board-row">
          {renderRaw(5)}
        </div>
        <div className="board-row">
          {renderRaw(6)}
        </div>
        <div className="board-row">
          {renderRaw(7)}
        </div>
        <div className="board-row">
          {renderRaw(8)}
        </div>
        <div className="board-row">
          {renderRaw(9)}
        </div>
        <div className="board-row">
          {renderRaw(10)}
        </div>
      </div>
    );
  }



   


