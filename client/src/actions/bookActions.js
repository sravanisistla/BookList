import axios from 'axios';
import config from '../config/config';

const serverUrl = config.serverUrl;
const apiUrl = serverUrl+"/api";

let getBooks = () => {
  return async (dispatch) => {
    axios.get(apiUrl)
    .then( (response) => {
      return dispatch({
        type: 'GET_BOOKS',
        payload: response.data
      });
    })
    .catch( (error) => {
      console.log(error);
    });
  }
}

let updateBook = (data) => {
  if(data && data.uid){
    return async (dispatch) => {
    axios({
      method:'post',
      url:apiUrl+"/updateBook",
      data:data
    })
      .then((response) => {
        return dispatch({
          type: 'UPDATE_BOOK',
          payload: response.data
        });
      })
      .catch((error)=>{
        console.log(error);
      });
    }  
  }
  
}

let createBook = (data) => {
  if(data ){
  return async (dispatch) => {
    axios({
      method:'post',
      url:apiUrl+"/createBook",
      data:data
    })
      .then((response) => {
        return dispatch({
          type: 'CREATE_BOOK',
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}

let deleteBook = (_id) => {
  return async (dispatch)=>{
    axios({
      method:'post',
      url:apiUrl+"/deleteBook",
      data:{uid:_id}
    })
    .then((response) => {
      return dispatch({
        type: 'REMOVE_BOOK',
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

let searchBooks = (searchText) => {
  if(searchText){
    return async (dispatch) => {
      axios({
        method:'post',
        url:apiUrl+'/searchBooks',
        data:{searchText:searchText}
      })
      .then((response) => {
        // console.log(response.data)
        return dispatch({
          type: 'GET_BOOKS',
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  
}
export default {
    createBook,
    getBooks,
    deleteBook,
    updateBook,
    searchBooks
}
