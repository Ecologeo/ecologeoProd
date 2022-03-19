import * as types from '../actions/index'

const AuthReduce = (state = { isLoading: false }, action: any) => {
  switch (action.type) {
    case types.REGISTER:
      return { ...state, isLoading: true }
    case types.REGISTER_RECEIVED:
      return { ...state, data: action.data, isLoading: false }
    case types.REGISTER_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.REGISTER_FACEBOOK:
      return { ...state, isLoading: true }
    case types.REGISTER_FACEBOOK_RECEIVED:
      return { ...state, dataFacebook: action.data, isLoading: false }
    case types.REGISTER_FACEBOOK_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.LOGIN:
      return { ...state, isLoading: true }
    case types.LOGIN_RECEIVED:
      return { ...state, dataLogin: action.data, isLoading: false }
    case types.LOGIN_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.LOGOUT:
      return { ...state, isLoading: true }
    case types.LOGOUT_RECEIVED:
      return { ...state, datalogout: action.data, isLoading: false }
    case types.LOGOUT_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.CLEAR_REGISTER:
      return { ...state, data: undefined, datalogout: undefined, dataLogin: undefined, dataRecover: undefined }
    case types.RECOVER_PASSWORD:
      return { ...state, isLoading: true }
    case types.RECOVER_PASSWORD_RECEIVED:
      return { ...state, isLoading: false, dataRecover: action.data }
    case types.RECOVER_PASSWORD_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.VERIFY_CODE:
      return { ...state, isLoading: true };
    case types.VERIFY_CODE_RECEIVED:
      return { ...state, verifyEmail: action.data, isLoading: false, error: false, };
    case types.VERIFY_CODE_FAILED:
      return { ...state, isLoading: false, error: action.error, };
    case types.RESET_PASSWORD:
      return { ...state, isLoading: true }
    case types.RESET_PASSWORD_RECEIVED:
      return { ...state, dataResetPassword: action.data, isLoading: false }
    case types.RESET_PASSWORD_FAILED:
      return { ...state, error: action.error, isLoading: false }

    default:
      return state
  }
}

export default AuthReduce;