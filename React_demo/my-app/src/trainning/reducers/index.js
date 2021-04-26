import status from './status'; //reducer Status
import sort from './sort'; // reducer Sort
import {combineReducers} from 'redux';

const myReducer = combineReducers({
    status, //status : status
    sort
});

export default myReducer;