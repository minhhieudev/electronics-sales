import { combineReducers } from 'redux';
import AuthReducer from "./slices/auth.slice";
import loadingReducer from './slices/loading.slice';

const reducer = combineReducers({
    loading: loadingReducer,
    auth: AuthReducer,
});

export default reducer;



