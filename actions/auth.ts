import * as types from './index';

export const login = (params:any) => ({
    type: types.LOGIN,
    params,
});


export const logout = (params:any) => ({
    type: types.LOGOUT,
    params,
});

export const resetPassword = (params:any) => ({
    type: types.RESET_PASSWORD,
    params,
});

export const register = (params:any) => ({
    type: types.REGISTER,
    params,
  });

  export const verifyCode = (params:any) => {
    return ({
        type: types.VERIFY_CODE,
        params,
    })
};

export const recoverPassword = (params:any) => ({
    type: types.RECOVER_PASSWORD,
    params,
  });

export const registerFacebook = (params:any) => ({
    type: types.REGISTER_FACEBOOK,
    params,
  });

  export const clearRegister = () =>({
    type: types.CLEAR_REGISTER
  })
