import stateAction from "./stateAction";

export default function stateReducer(state={},action)
{
    if(stateAction.TYPES.ADD_DATA)
    {
        return{...state,data:action.payload}
    }
    return state;
}