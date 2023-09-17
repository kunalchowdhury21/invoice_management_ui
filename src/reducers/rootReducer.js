import {combineReducers} from "redux";
import buttonreducer from "./buttonReducer";
import fetchReducer from "./fetchReducer";
import docidArrayreducer from "./ArrayRedcer.js";
import ViewCorrespondance from "./ViewCorrespondanceReducer.js"

const rootReducer=combineReducers({enableDisable:buttonreducer,fetchReducer,docidArray:docidArrayreducer,tabledata:ViewCorrespondance});

export default rootReducer;