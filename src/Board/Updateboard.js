import socketIOClient, { io } from "socket.io-client";
const ENDPOINT = "http://192.168.1.102:4001/";
const socket = io(ENDPOINT,{ transport : ['websocket'] });
let id= socket.id;
console.log(id);
const initialState = {
    userBoard:[],
    userBoard2:[],
    attackBoard:[[]],
    attackBoard2:[],
    wins: 0,
    wins2: 0,
    item: false,
    client:socket,
    clientid :0

};

export default function updateReducer(state1 = initialState,action){
    switch(action.type){
        case 'addBoard':
            console.log(action.payload);
            return {...state1,userBoard:action.payload};
        case 'addBoard2':
            console.log(action.payload);
            return {...state1,userBoard2:action.payload};

        case 'addAttack':
            console.log(action.payload);
            return {...state1,attackBoard:action.payload};

        case 'addAttack2':
            console.log(action.payload);
            return {...state1,attackBoard2:action.payload};

        case 'attack1':
            const id = action.payload;
            console.log(id);
            let count = -1;
            for(let row =0;row<10;row++){
                for(let col =0;col<10;col++){
                    count++;
                    if(parseInt(id)===count){
                        console.log('cccc');
                        console.log(state1.userBoard2[row][col]);
                        if(state1.userBoard2[row][col] === true){
                            console.log('cc');
                            
                            return {
                                ...state1,
                                userBoard2: state1.userBoard2.map((innerArray, index) => {
                                    if (index === row) return innerArray.map((item, index) => {
                                        if (index === col) return false
                                        return item
                                    })
                                    return innerArray
                                })
                            }
                            
                        }else{
                                return state1;
                            }
                        }
                    }

                }
            
        case 'attack2':
            const id2 = action.payload;
            console.log(id2);
            let count2 = -1;
            for(let row =0;row<10;row++){
                for(let col =0;col<10;col++){
                    count2++;
                    if(parseInt(id2)===count2){
                        console.log('cccc');
                        console.log(state1.userBoard[row][col]);
                        if(state1.userBoard[row][col] === true){
                            console.log('cc');
                            
                            return {
                                ...state1,
                                userBoard: state1.userBoard.map((innerArray, index) => {
                                    if (index === row) return innerArray.map((item, index) => {
                                        if (index === col) return false
                                        return item
                                    })
                                    return innerArray
                                })
                            }
                            
                        }else{
                                return state1;
                            }
                        }
                    }

                }
        case 'userOneWins':
            return state1.wins +1;
        case 'userTwoWins':
            return state1.wins2 +1;
        default:
            return state1;
    }       


}
