import * as authorApi from "../../api/authorApi";


export function loadAuthorsSuccess(authors){
    return {type: "LOAD_AUTHORS_SUCCESS",authors};
}

export function loadAuthors(){
    return function (dispatch){
        return dispatch(loadAuthorsSuccess(authorApi.getAuthors()));
        
    }
}