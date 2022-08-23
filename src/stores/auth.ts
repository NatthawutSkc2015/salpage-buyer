import { defineStore } from 'pinia'
import { LoginService, RegisterService,GetInfoService, 
         LogoutService, RefreshTokenService,ChangePasswordService,
         ForgotPasswordService } from '@/service/auth'
import storage from 'store2'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        image:           '',
        prefix_name:     '',
        permission:      '',
        store_name:      '',
        store_slug:      '',
        createdAt:       '',
        updatedAt:       '',
    }),
    actions: {
        Login(params:any) {
            return new Promise((resolve, reject) => {
                /** @call LoginService */
                LoginService(params).then((res:any) => {
                    if(res.status == 200){
                        //Set data to local storage
                        storage.set('UserInfo',res)
                        resolve('success')
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // RefreshToken(params:any){
        //     return new Promise((resolve, reject) => {
        //         /** @call RefreshTokenService */
        //         RefreshTokenService(params).then((res:any) => {
        //             if(res.status == 200){
        //                 storage.set('UserInfo', res)
        //                 resolve('success')
        //             }
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
        Register(params:any){
            return new Promise((resolve, reject) => {
                /** @call RegisterService  */
                RegisterService(params).then((res:any) => {
                    if(res.status == 200){
                        resolve('success')
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetInfo() {
            return new Promise((resolve, reject) => {
                GetInfoService().then((res:any) => {
                    let userInfo =         res.userInfo
                    this.store_name =      userInfo.store_name
                    this.store_slug =      userInfo.store_slug
                    this.image   =         userInfo.image
                    this.prefix_name =     userInfo.prefix_name
                    this.permission =      userInfo.permission
                    this.createdAt =       userInfo.createdAt
                    this.updatedAt =       userInfo.updatedAt
                    resolve('success')
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Logout(){
            return new Promise((resolve) => {
                /** @call LogoutService */
                LogoutService().then(() => {
                    storage.remove('UserInfo')
                    resolve('success')
                }).finally(() => {
                })
            })
        }
    }
})