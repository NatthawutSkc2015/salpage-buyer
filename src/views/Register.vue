<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useVuelidate }             from '@vuelidate/core'
import { required, minLength }      from '@vuelidate/validators'
import { useAuthStore }             from '../stores/auth'
import { useRouter }                from 'vue-router'
import { InputMask }                from 'imask'

/** Set state Component */
const state = reactive({
    store_name:      '',
    phone:           '',
    username:        '',
    password:        '',
    message_error:   '',
    error:           false,
    success:         false,
})

const rulesValidate = {
    store_name: { required },
    phone:      { required },
    username:   { 
        required
    },
    password: {
        required,
        minLength: minLength(8)
    }
}

const v$ =             useVuelidate(rulesValidate, state)
const authStore =      useAuthStore()
const router =         useRouter()
const PhonInput:any =  ref(null)

const onSubmitForm = async() => {
    await v$.value.$touch()

    if ( !v$.value.$error ) {
        authStore.Register({
            store_name:  state.store_name,
            username:    state.username,
            password:    state.password,
            phone:       state.phone
        }).then(res => {
            if(res == 'success'){
                state.error = false
                setTimeout(() => {
                    state.success = true
                },500)
                setTimeout(() => {
                    router.push({path: '/user/login'})
                },3000)
            }
        }).catch(error => {
            /** Handle Response */
            if(error.response){
                let status_code = error.response.status
                let errors =      error.response.data.errors
                state.message_error = ''
                /** Client Error */
                if(status_code == 422){
                    state.error = true
                    if(errors.username){
                        state.message_error = '\n - ชื่อผู้ใช้นี้ ผู้ใช้งานในระบบแล้ว'
                    }
                    if(errors.store_name){
                        state.message_error += '\n - ชื่อร้านค้านี้ ถูกใช้งานในระบบแล้ว'
                    }
                    if(errors.phone){
                        state.message_error += '\n - เบอร์โทรนี้ ถูกใช้งานในระบบแล้ว'
                    }
                }
            }else{
                state.error = true
                state.message_error = 'กรุณาลองใหม่ภายหลัง'
            }
        })
    }

    
}

onMounted(() => {
    //Mash Phone
    new InputMask(PhonInput.value, {
        mask: '0000000000'
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
                <span>สร้างบัญชีของคุณ</span>
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
                <span>คุณมีบัญชีแล้ว ?</span>
                <router-link :to="{name: 'member-login'}">เข้าสู่ระบบ</router-link>
            </div>

            <!-- Store Name -->

            <!-- ./ Store Name -->
            <div class="form-group">
                <label class="label" for="store_name">
                    <i class="las la-user-check"></i> <span>ชื่อร้านค้า (ภาษาอังกฤษ)</span>
                </label>
                
                <input type="text" v-model="state.store_name" :class="{ 'is-invalid' : v$.store_name.$error }" class="form-control rounded-full" placeholder="ชื่อร้านค้า (ภาษาอังกฤษ)" id="store_name" />

                <!-- Error Message -->
                <small class="block mt-2 invalid-feedback"  v-if="v$.store_name.$error">กรุณากรอกชื่อร้านค้า (ภาษาอังกฤษ)</small>
                <!-- ./ Error Message -->
            </div>

            <!-- Phone -->
            <div class="form-group">
                <label class="label" for="store_name">
                    <i class="las la-phone"></i> <span>เบอร์โทร</span>
                </label>
                <input type="text" v-model="state.phone" ref="PhonInput" :class="{ 'is-invalid' : v$.phone.$error }" class="form-control rounded-full" placeholder="เบอร์โทร" id="phone" />

                <!-- Error Message -->
                <small class="block mt-2 invalid-feedback"  v-if="v$.phone.$error">กรุณากรอกเบอร์โทร</small>
                <!-- ./ Error Message -->
            </div>
            <!-- ./ Phone -->

            <!-- Username -->
            <div class="form-group">
                <label class="label" for="username">
                    <i class="las la-user-alt"></i> <span>ชื่อผู้ใช้งาน</span>
                </label>
                
                <input type="text" v-model="state.username" :class="{ 'is-invalid' : v$.username.$error }" class="form-control rounded-full" placeholder="ชื่อผู้ใช้งาน" id="username" />

                <!-- Error Message -->
                <small class="block mt-2 invalid-feedback"  v-if="v$.username.$error">กรุณากรอกชื่อผู้ใช้</small>
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
            <div class="alert alert_danger alert_outlined mt-6 mb-3" 
                 style="white-space: pre-line;" v-if="state.error">
                <strong class="uppercase"><bdi>Warning!</bdi></strong>
                {{ state.message_error }}
            </div>

            <!-- Alert success -->
            <div class="alert alert_success alert_outlined mt-6 mb-3" v-if="state.success">
                <strong class="uppercase"><bdi>Success!</bdi></strong>
                สร้างบัญชีของคุณสำเร็จ รอสักครู่... 
            </div>

            
            <!-- Submit Button -->
            <div class="submit">
                <button @click="onSubmitForm"  class="btn btn_secondary w-icon">
                    <span class="la la-arrow-right ltr:mr-2"></span> ส่งข้อมูล
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