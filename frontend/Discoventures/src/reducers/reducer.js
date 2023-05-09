export const initialState =   {
    isLoading: true,
    isSignout: false,
    userToken: null
  }
  
export const reducer = (prevState, action) => {

    switch (action.type) {
    case 'RESTORE_TOKEN':
        return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        };
    case 'SIGN_IN':
        return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        errorMsg: null
        };
    case 'SIGN_OUT':
        return {
        ...prevState,
        isSignout: true,
        userToken: null
        };
        case 'ERROR':
        return {
            ...prevState,
            isSignout: true,
            userToken: null,
            errorMsg: action.errorMsg
        };
    }
};