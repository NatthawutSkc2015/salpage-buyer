import axios from 'axios'
import { VueAxios } from './axios'
import storage from 'store2'

const request = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    baseURL: 'http://127.0.0.1:3000/api/v1/',
    timeout: 6000
})

const errorHandler = async (error:any) => {
    if (error.response) {
        
        const originalConfig = error.config;

        //Token was expired
        if (error.response.status === 403) {
            originalConfig._retry = true
            try{
                const userInfo:any = storage.get('UserInfo')
                
                /** call get Token from refreshToken  */
                const res:any = await request.post("/auth/refreshToken", {
                    refreshToken: userInfo.refreshToken,
                })

                /** Set Localo Storage */
                storage.set('UserInfo', {
                    token:        res.token,
                    exp :         res.exp,
                    refreshToken: res.refreshToken,
                    exp_refresh:  res.exp_refresh,
                })

                return request(originalConfig)

            }catch(e){
                return Promise.reject(e)
            }
        }

    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config:any) => {
  
    try{
      const token = storage.get('UserInfo').token
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }catch(e){}

    return config
}, errorHandler)
  
//response interceptor
request.interceptors.response.use((response) => {
    return response.data
}, errorHandler)



const installer = {
    vm: {},
    install (Vue:any) {
        Vue.use(VueAxios, request)
    }
}

export default request

export {
    installer as VueAxios,
    request as axios
}