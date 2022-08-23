import router           from './router'
import { useAuthStore } from './stores/auth'
import storage          from 'store2'

const loginRoutePatch = '/member/login'
const allowList:String[] = ['member-login','member-register','member-forgot-password','member-change-password']
let countOpen:number = 0

router.beforeEach((to:any, from:any , next:any) => {
    
    //Has Token
    if (storage.get('UserInfo')) {  
        
        //If slug == allowList redirect to dashboard
        if(allowList.includes(to.name)){
            return next('/dashboard')
        }
        
        //Convert string to object
        const userInfo:any =      storage.get('UserInfo')
        
        //Get timestamps now
        const timestamps:number = Math.round(+new Date()/1000)

        //Set State
        const authStore = useAuthStore()


        // //IF Token Expire (Redirect to login)
        if(userInfo.exp_refresh < timestamps){
            storage.remove('UserInfo')
            return next({path: loginRoutePatch})
        }

        countOpen++
        if(countOpen == 1){
            /** Get User Info */
            authStore.GetInfo()
        }
        
        next()

    //Not have token
    }else{
        if(allowList.includes(to.name)){
            next()
        }else{
            //Query String : ?redirect=/____path____
            next({ path: loginRoutePatch ,query: { redirect: to.fullPath }})
        }
    }
})