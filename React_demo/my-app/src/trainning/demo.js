import { createStore } from 'redux';
import {status, sort} from './actions/index'
import myReducer from'./reducers/index'


const store = createStore(myReducer);
console.log('Default : ',store.getState());
//Thuc hien cong viec thay doi status
// var action = {type : 'TOGGLE_STATUS'};
store.dispatch(status());
console.log('toggle: ',store.getState());
//Thuc hien cong viec sap xep ten Z-A
// var sortAction = {
//     type: 'SORT',
//     sort: {
//         by: 'name',
//         value: -1
//     }
// }
store.dispatch(sort({
    by: 'name',
    value: -1
}));
console.log('SORT: ', store.getState());