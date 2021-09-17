import {
    SET_JWT,
    LOGIN,
    REFRESH_TOKEN,
    API_START,
    API_END, 
    API_ERROR
} from "../actions/types";


export default function login (state = {}, action) {
    switch (action.type) {
        case SET_JWT:
            return { data: action.payload };
        case API_START:
              if (action.payload === LOGIN) {
                return {
                  ...state,
                  isLoadingData: true,
                  error: "",
                };
              }
          // eslint-disable-next-line
        case API_END:
            if (action.payload === LOGIN) {
                return {
                    ...state,
                    isLoadingData: false,
                };
            }
            if (action.payload === REFRESH_TOKEN) {
                return {
                    ...state,
                    isLoadingData: false,
                };
            }
            return state;
          // eslint-disable-next-line
        case API_ERROR:
          if (action.payload === LOGIN) {
            return {
              ...state,
              isLoadingData: false,
              error: action.error.response,
            };
          } 
          return state;
          // eslint-disable-next-line
        case REFRESH_TOKEN:
          return { data: action.payload };
        default:
            return state;
    }
}
