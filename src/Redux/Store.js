import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { ChatReducer } from "./Chat/Reducer";
import { MessageReducer } from "./Message/Reducer";


const rootReducer = combineReducers({
    auth:authReducer,
    chat:ChatReducer,
    message:MessageReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

