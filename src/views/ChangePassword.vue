<script setup lang="ts">
import { reactive,onMounted,watch }     from 'vue'
import { useVuelidate }           from '@vuelidate/core'
import { required, email, sameAs,minLength} from '@vuelidate/validators'
import { useRouter, useRoute }    from 'vue-router'
import { ChangePasswordService,CheckTokenChanePasswordService }  from '../service/auth'



/** Set state Component */
const state = reactive({
    password_new:  '',
    password_cf:   '',
    message_error: '',
    token:         '',
    error:         false,
    success:       false,
    loading:       false
})

const rulesValidate =  {
    password_new: {
        required,
        minLength: minLength(8),
    },
    password_cf:  { 
        required, 
        minLength: minLength(8),
    }
}

const v$ =        useVuelidate(rulesValidate, state)
const router =    useRouter()
const route =     useRoute()


const onSubmitForm = async () => {
    await v$.value.$touch()
    if( !v$.value.$error ) {
        /** @call ChangePassword @stores_auth */
        ChangePasswordService({
            token: route.query.token,
            password_new: state.password_new
        }).then((res:any) => {
            if(res.status == 200){
                setTimeout(() => {
                    state.success = true
                },1000)
                setTimeout(() => {
                    return router.push({path: '/member/login'})
                },6000)
            }
        }).catch(error => {
            /** Handle Response */
            if(error.response){
                let status_code = error.response.status
                if(status_code == 422){
                    state.error = true
                    state.message_error = 'กรุณากรอกรหัสผ่าน'
                }
            }else{
                state.error = true
                state.message_error = 'กรุณาลองใหม่ภายหลัง'
            }
        })
    }
}

onMounted(() => {
    CheckTokenChanePasswordService(route.query.token)
    .then(res => {
        if(res.status == 200){
            state.token = route.query.token
        }
    })
    .catch(err => {
        router.push({path: '/member/login'})
    })
})
</script>
<template>
    <div class="inner">
        <div class="left">
            <img src="@/assets/images/digital-marketing-1.png" alt="">
            <img src="@/assets/images/digital-marketing-2.png" alt="">
        </div>
        <div class="right">

            <!-- Page name -->
            <div class="page-name">
                <span>เปลี่ยนรหัสผ่าน</span>
            </div>
            <!-- ./ Page name -->

             <!-- Logo System -->
            <figure class="logo">
                <img src="/src/assets/images/logo-web.png" alt="">
            </figure>
            <!-- Text -->
            <h2>ระบบจัดการข้อมูลเซลเพจ</h2>


            <!-- Password New -->
            <div class="form-group mt-3">
                <label class="label" for="password_new">
                    <i class="las la-key"></i> <span>รหัสผ่านใหม่</span>
                </label>
                
                <input type="password" v-model="state.password_new" :class="{ 'is-invalid' : v$.password_new.$error }" 
                       class="form-control rounded-full" placeholder="รหัสผ่านใหม่" id="password_new" />

                <!-- Error Message -->
                <template v-if="v$.password_new.$error">
                <small class="block mt-2 invalid-feedback" v-if="v$.password_new.required.$invalid">กรุณากรอกรหัสผ่านใหม่</small>
                </template>
                <!-- ./ Error Message -->
            </div>

            <!-- Password Confirm -->
            <div class="form-group mt-3">
                <label class="label" for="password_cf">
                    <i class="las la-key"></i> <span>ยืนยันรหัสผ่านใหม่</span>
                </label>

                <input type="password" v-model="state.password_cf" :class="{ 'is-invalid' : v$.password_cf.$error }" 
                       class="form-control rounded-full" placeholder="ยืนยันรหัสผ่านใหม่" id="password_cf" />

                <!-- Error Message -->
                <template v-if="v$.password_cf.$error">
                <small class="block mt-2 invalid-feedback" v-if="v$.password_cf.required.$invalid">กรุณายืนนยันรหัสผ่านใหม่</small>
                </template>
                <!-- ./ Error Message -->
            </div>

            <!-- Alert Error -->
            <div class="alert alert_danger alert_outlined mt-6 mb-3" v-if="state.error">
                <strong class="uppercase"><bdi>ผิดพลาด!</bdi></strong>
                {{ state.message_error }}
            </div>

            <!-- Alert success -->
            <div class="alert alert_success alert_outlined mt-6 mb-3" v-if="state.success">
                <strong class="uppercase"><bdi>Success!</bdi></strong> เปลี่ยนรหัสผ่านของคุณสำเร็จ
            </div>

            <!-- Submit Button -->
            <div class="submit">
                <button @click="onSubmitForm"  class="btn btn_secondary w-icon">
                    <span class="la la-arrow-right ltr:mr-2" v-if="!state.loading"></span> 
                    <span class="la la-spinner ltr:mr-2" v-if="state.loading"></span>
                    ส่งข้อมูล 
                </button>
            </div>

            <!-- Version software &  Manual -->
            <div class="version-soft-manual">
                <span class="version-soft">Version 1.2022 |</span>
                <a href="" class="manaul">คู่มือการใช้งานระบบ</a>
            </div>

        </div>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/less/login-register.less';
</style>