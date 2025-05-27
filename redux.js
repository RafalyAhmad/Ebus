import {createStore} from "redux";
//reducer
const cartReducer = {
    state={
    cart:[],
},
    action
} => {
         switch(action.type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            }; default : return state;
    }

};

//store
const store = createStore(cartReducer);
console.log("oncreate store: ", store.getState());
//subscribe
store.subscribe

//dispatch
const action1 = {type:"ADD_TO_CART", payload: {id}};
store.dispatch(action1)