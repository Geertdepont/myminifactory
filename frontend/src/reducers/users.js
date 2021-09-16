import {
    SET_USERS,
    FETCH_USERS,
    API_START,
    API_END, 
    API_ERROR
} from "../actions/types";


export default function user(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            return { data: action.payload };
        case API_START:
              if (action.payload === FETCH_USERS) {
                return {
                    ...state,
                    isLoadingData: true
                };
              }
          // eslint-disable-next-line
        case API_END:
            if (action.payload === FETCH_USERS) {
                return {
                    ...state,
                    isLoadingData: false
                };
              }
            return state;
        case API_ERROR:
          return {
            ...state,
            isLoadingData: false,
            error: action.error.response 
          };
        default:
            return state;
    }
}
