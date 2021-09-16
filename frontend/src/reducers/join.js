import {
    CREATE_USER,
    API_START,
    API_END, 
    API_ERROR
} from "../actions/types";


export default function join (state = {}, action) {
    switch (action.type) {
        case API_START:
              if (action.payload === CREATE_USER) {
                return {
                  ...state,
                  isLoadingData: true,
                  error: ""
                };
              }
          // eslint-disable-next-line
        case API_END:
            if (action.payload === CREATE_USER) {
                return {
                    ...state,
                    isLoadingData: false,
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
