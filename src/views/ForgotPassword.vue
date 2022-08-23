<script setup lang="ts">
import { reactive }              from 'vue'
import { useVuelidate }          from '@vuelidate/core'
import { required, email }       from '@vuelidate/validators'
import { useRouter, useRoute }   from 'vue-router'
import { ForgotPasswordService } from '../service/auth'

/** Set state Component */
const state = reactive({
    email:         '',
    message_error: '',
    error:         false,
    success:       false,
    loading:       false
})

const rulesValidate = {
    email: {required, email}
}

const v$        = useVuelidate(rulesValidate, state)
const router =    useRouter()

const onSubmitForm = async() => {
    await v$.value.$touch()
    if( !v$.value.$error ) {
        state.loading = true
        /** @call ForgotPassword @stores_auth  */
        ForgotPasswordService({
            email: state.email
        }).then((res:any) => {
            if(res.status == 200){
                setTimeout(() => {
                    state.success = true
                },1000)
                setTimeout(() => {
                    return router.push({path: '/member/login'})
                },6000)
            }
            // if()
        }).catch(error => {
            /** Handle Response */
            if(error.response){
                let status_code = error.response.status
                if(status_code == 422){
                    state.error = true
                    state.message_error = 'กรุณากรอกอีเมลให้ถูกต้อง'
                }
            }else{
                state.error = true
                state.message_error = 'กรุณาลองใหม่ภายหลัง'
            }
        })
    }
}
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
                <span>ลืมรหัสผ่าน</span>
            </div>
            <!-- ./ Page name -->

            <!-- Logo System -->
            <figure class="logo">
                <img src="/src/assets/images/logo-web.png" alt="">
            </figure>
            <!-- Text -->
            <h2>ระบบจัดการข้อมูลเซลเพจ</h2>


            <!-- Create Account -->
            <div class="account-create">
                <span>คุณยังไม่มีบัญชี ?</span>
                <router-link :to="{name: 'member-register'}">สร้างบัญชี</router-link>
            </div>

            <!-- Email -->
            <div class="form-group">
                <label class="label" for="username">
                    <i class="las la-envelope"></i> <span>Email</span>
                </label>
                
                <input type="text" v-model="state.email" :class="{ 'is-invalid' : v$.email.$error }" class="form-control rounded-full" placeholder="Enter text here" id="username" />

                <!-- Error Message -->
                <template v-if="v$.email.$error">
                <small class="block mt-2 invalid-feedback" v-if="v$.email.required.$invalid">กรุณากรอกอีเมล</small>
                <small class="block mt-2 invalid-feedback" v-if="v$.email.email.$invalid">กรุณากรอกอีเมลให้ถูกต้อง</small>
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
                <strong class="uppercase"><bdi>Success!</bdi></strong>
                <br>
                - ระบบได้ทำการส่งลิงค์เปลี่ยนรหัสผ่านไปทางอีเมลให้ท่าน <br>
                - ระบบจะทำการเปลี่ยนไปที่หน้าเข้าสู่ระบบ
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