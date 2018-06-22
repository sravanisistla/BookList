import { combineReducers } from 'redux';
import book from './bookReducer';

const appReducer = combineReducers({
    book
});

export default appReducer;
