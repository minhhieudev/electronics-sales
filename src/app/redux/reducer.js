import { combineReducers } from 'redux';
import AuthReducer from "./slices/auth.slice";
import loadingReducer from './slices/loading.slice';
import accountReducer from './slices/user/account.slice';

const reducer = combineReducers({
    loading: loadingReducer,
    auth: AuthReducer,
    account: accountReducer,
});

export default reducer;



