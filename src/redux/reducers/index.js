import { ThemeReducer } from './ThemeReducer';
import { MovieReducer } from './movie-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ ThemeReducer, MovieReducer });

export default rootReducer;
