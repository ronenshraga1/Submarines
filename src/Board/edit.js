import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

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
    const ship5 =()=>{
      const newTable = state.table.slice() //copy the array
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
      useEffect(() =>{
        COUNT =0;
        ship5();
        ship4();
        ship3();
        ship2();
        shi5();
      });
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
        <div className="status">YourBoard</div>
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
