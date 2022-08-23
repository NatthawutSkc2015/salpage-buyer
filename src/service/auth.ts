import request from '../utils/request'

/**
 * @function GetInfo
 * @param token
 * @return {*}
 */
export const GetInfoService = () => {
    return request({
        url: 'auth/user-info',
        method: 'get',
    })
}

/**
 * @function Login
 * @params json data
 * @return {*}
 */
export const LoginService = (params:any) => {
    return request({
        url:    'auth/login',
        method: 'post',
        data:   params
    })
}

/**
 * @function refreshToken
 * @params null
 * @return {*}
 */
export const RefreshTokenService = (params:any) => {
    return request({
        url:    'auth/refreshToken',
        method: 'post',
        data:   params
    })
}

/**
 * @function Register
 * @params json data
 * @return {*}
 */
export const RegisterService = (params:any) => {
    return request({
        url:    'auth/register',
        method: 'post',
        data:   params
    })
}

/**
 * @function Logout
 * @params void
 * @return {*}
 */
export const LogoutService = () => {
    return request({
        url:    'auth/logout',
        method: 'post'
    })
}

/**
 * @function ForgotPassword
 * @param email
 * @return {*}
 */
export const ForgotPasswordService = (params:any) => {
    return request({
        url:    'auth/forgot-password',
        method: 'post',
        data:   params
    })
}

/**
 * @function ChangePassword
 * @param email
 * @return {*}
 */
export const ChangePasswordService = (params:any) => {
    return request({
        url:    'auth/change-password',
        method: 'post',
        data:   params
    })
}

export const CheckTokenChanePasswordService = (token:any) => {
    return request({
        url:    'auth/check-token-change-password',
        method: 'post',
        data: {
            token: token
        }
    })
}



