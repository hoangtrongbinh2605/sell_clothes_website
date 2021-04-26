var initialState = {
    sort : {
        by: 'status',
        value: 1 //1: tang, -1: giam
    }
}

var myReducer = (state = initialState, action) =>{
    if(action.type === 'SORT'){
        var {by,value} = action.sort; // by = action.sort.by
        return{by,value}
    }
    return state;
}

export default myReducer;