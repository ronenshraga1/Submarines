import './Gameboard.css';
import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector,useStore } from "react-redux";
import Button from '@material-ui/core/Button';
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

export function Board2()  {
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
    const counter = useSelector(state1 => state.table);
    const dispatch = useDispatch();

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
      console.log(state.table);
      }
      useEffect(()=> {
          COUNT =0;
          ship5();
          ship();
          ship2();
          ship3();
          ship4();
          dispatch({type:'addAttack2',payload:counter});
          dispatch({type:'addBoard2',payload:counter});
        },[])

      
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
    
  const  Saveboard = async()=>{
    COUNT =0;
    dispatch({type:'addBoard',payload:counter});
  
  }
  const store = useStore();
    return (
      <div>
        <div className="status">User2</div>
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
