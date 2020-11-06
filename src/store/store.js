import stateReducer from "./stateReducer";
import { createStore, combineReducers} from "redux";


const rootReducer = combineReducers({
    Data:stateReducer
    
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;