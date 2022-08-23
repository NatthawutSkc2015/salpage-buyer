<script setup lang="ts">
import { reactive }            from 'vue'
import { useVuelidate }        from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useAuthStore }        from '../stores/auth'
import { useRouter,useRoute }  from 'vue-router'


/** Sate State Component  */
const state = reactive({
    email:         '',
    password:      '',
    remember:      false,
    message_error: '',
    error:         false,
    success:       false,
    loading:       false,
    package_type:  'Free',
})

const rulesValidate = {
    email: { required },
    password: {
        required,
        minLength: minLength(8)
    }
}

const v$ =        useVuelidate(rulesValidate, state)
const authStore = useAuthStore()
const router =    useRouter()
const route =     useRoute()


const onSubmitForm = async() => {
    await v$.value.$touch()

    if ( !v$.value.$error ) {
        authStore.Login({
            email: state.email,
            password: state.password,
            remember: state.remember
        }).then(res => {
            state.loading = true
            if(res == 'success'){
                state.error = false
                setTimeout(() => {
                    state.success = true
                },1000)
                setTimeout(() => {
                    //Check Query strint [Redirect Path Old]
                    if(!route.query.redirect){
                        return router.push({path: '/dashboard'})
                    }else{
                        let redirect = String(route.query.redirect)
                        return router.push({path: redirect})
                    }
                },2000)
            }
        }).catch(error => {
            /** Handle Response */
            if(error.response){
                let status_code = error.response.status
                if(status_code == 422){
                    state.error = true
                    state.message_error = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ถูกต้อง'
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
                <span>เข้าสู่ระบบ</span>
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

            <!-- email -->
            <div class="form-group">
                <label class="label" for="email">
                    <i class="las la-user-alt"></i> <span>อีเมล</span>
                </label>
                
                <input type="text" v-model="state.email" :class="{ 'is-invalid' : v$.email.$error }" class="form-control rounded-full"    placeholder="อีเมล" id="email" />
                <!-- Error Message -->
                <template v-if="v$.email.$error">
                <small class="block mt-2 invalid-feedback" v-if="v$.email.required.$invalid">กรุณากรอกอีเมล</small>
                </template>
                <!-- ./ Error Message -->
            </div>

            <!-- Password -->
            <div class="form-group">
                <label class="label" for="inpu2">
                    <i class="las la-lock"></i> <span>รหัสผ่าน</span>
                </label>
                <input type="password" v-model="state.password" :class="{ 'is-invalid' : v$.password.$error }" class="form-control rounded-full" placeholder="รหัสผ่าน" id="password">
                
                <!-- Error Message -->
                <template v-if="v$.password.$error">
                <small class="block mt-2 invalid-feedback" v-if="v$.password.required.$invalid">กรุณากรอกรหัสผ่าน</small>
                <small class="block mt-2 invalid-feedback" v-if="v$.password.minLength.$invalid">
                    กรุณากรอกรหัสผ่านอย่างน้อย {{ v$.password.minLength.$params.min}} ตัวอักษร
                </small>
                <!-- ./ Error Message -->
                </template>
            </div>

            <!-- Alert Error -->
            <div class="alert alert_danger alert_outlined mt-6 mb-3" v-if="state.error">
                <strong class="uppercase"><bdi>ผิดพลาด!</bdi></strong>
                {{ state.message_error }}
            </div>

            <!-- Alert success -->
            <div class="alert alert_success alert_outlined mt-6 mb-3" v-if="state.success">
                <strong class="uppercase"><bdi>Success!</bdi></strong>
                เข้าสู่ระบบสำเร็จ รอสักครู่...
            </div>

            
            <!-- Remember & Forgot Password -->
            <div class="remember-forgotpass mt-5">
                <label class="custom-checkbox">
                    <!-- <input type="checkbox">
                    <span></span>
                    <span>จำรหัสผ่านของฉัน</span> -->
                </label>
                <router-link :to="{name: 'member-forgot-password'}" class="forgotpass">ลืมรหัสผ่าน</router-link>
            </div>

            
            <!-- Submit Button -->
            <div class="submit">
                <button @click="onSubmitForm"  class="btn btn_secondary w-icon">
                    <span class="la la-unlock ltr:mr-2" v-if="!state.loading"></span> 
                    <span class="la la-spinner ltr:mr-2" v-if="state.loading"></span>
                    เข้าสู่ระบบ
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

