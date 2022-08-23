
<script setup lang="ts">
import { defineProps, ref,reactive,watch,defineEmits } from 'vue'
import MInputLayout                                    from '../../components/MInputLayout.vue'
import { useVuelidate }                                from '@vuelidate/core'
import { required, minLength }                         from '@vuelidate/validators'
import ProductsService                                 from '../../service/products'
import { useRouter }                                   from 'vue-router'

const Router = useRouter()

/** Props Components */
const props:any = defineProps({
    modalTitle: { type: String, required: true },
    action:     { type : String, required: true },
    prodID:     { type: Number, required: false }
})

/** Steate for component  */
const state:any = reactive({
    id:             0,
    sku_id:         '',
    name:           '',
    detail:         '',
    unit:           '',
    price:          0,
    status:         '',
    use_stock:      '',
    in_stock:       0,
    noti_min_stock: 0,
    cost_per_price: 0,
    imageRequired : false,
    success       : false
})

/**
 * Set demo
 * 
 */
state.sku_id =        '001'
state.name   =        'product name'
state.detail =        'product detail'
state.unit =          'unit'
state.price =          100
state.status =         'open'
state.use_stock =      'open'
state.in_stock =       1
state.noti_min_stock = 5
state.cost_per_price = 5

const emit = defineEmits(['setAction'])

/** Reset Form date  */
const resetForm = () => {
    v$.value.$reset()
    state.id =             0
    state.sku_id =         ''
    state.name =           ''
    state.detail =         ''
    state.unit =           ''
    state.price =          0
    state.status =         ''
    state.use_stock =      ''
    state.in_stock =       ''
    state.noti_min_stock = ''
    document.querySelector('#productImage').value = ''
    custom_choose_file.value.classList.remove('preview')
    emit('setAction','')
}

/** Watch Props valiable */
watch(() => props.action, (action:string) => {
    if(action == 'create'){
        // resetForm()
    }else if(action == 'update'){
        findProductByID(props.prodID)
    }
})

/** Set Rule Validate Form */
const rulesValidate = {
    sku_id:         { required },
    name:           { required },
    detail:         { required },
    unit:           { required },
    price:          { required },
    status:         { required },
    use_stock:      { required },
    in_stock:       { },
    noti_min_stock: { },
    cost_per_price: { }
}

const v$ =        useVuelidate(rulesValidate, state)

/** Preview Image */
const preview:any =            ref(null)
const custom_choose_file:any = ref(null)
const PreviewImage =           (event:any) => {

    let output:any = preview.value

    if(event.target.files[0] == undefined){
        output.src = ''
        custom_choose_file.value.classList.remove('preview')
        return alert('กรุณาเลือกภาพ')
    }

    //Validate Type file (Only)
    let arrayType:string[] = ['image/jpeg','image/png']
    if(!arrayType.includes(event.target.files[0].type)){
        return alert('กรุณาเลือกไฟล์ ที่มีนามสกุล jpg,png หรือ gif เท่านั้น')
    }

    //Image size must not exceed 2 MB.
    if(event.target.files[0].size >= 2097152){
        return alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 2MB')
    }

    //Set Value to img tag (Preview Image) 
    
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src)  // Free memory
    }
    custom_choose_file.value.classList.add('preview')

}

const onSubmitForm = async () => {
    await v$.value.$touch()
    let input_file:any = document.querySelector('#productImage')

    if(props.action == 'create'){
        if(input_file.value == ''){
            state.imageRequired = true
        }else{
            state.imageRequired = false
        }
        
    }
    
    if ( !v$.value.$error && !state.imageRequired) {
        let formData = new FormData
        formData.append('sku_id', state.sku_id)
        formData.append('name', state.name)
        formData.append('detail', state.detail)
        formData.append('unit', state.unit)
        formData.append('price', state.price)
        formData.append('status', state.status),
        formData.append('use_stock', state.use_stock)
        formData.append('noti_min_stock', state.noti_min_stock || 0)
        formData.append('cost_per_price', state.cost_per_price || 0)
        if(input_file.files[0]){
            formData.append('image', input_file.files[0])
        }

        if(props.action == 'create'){
            /** Sent data to service */
            ProductsService.CreateProductService(formData)
            .then(res => {
                if(res.status == 200){
                    state.success = true
                    setTimeout(() => {
                        document.querySelector('#closeModal').click()
                        state.success = false
                    },2000)
                }
            }).catch(err => {
                if(err.response){
                    let status_code = err.response.status
                    if(status_code == 422){
                        let error = err.response.data.errors
                        if(error.hasOwnProperty('sku_id')){
                            alert('รหัส Sku ถูกใช้งานแล้ว')
                        }
                    }
                }else{
                    alert('ผิดพลาดกรุณาลองใหม่ภายหลัง')
                }
            })
        }else if(props.action == 'update'){
            formData.append('id', state.id)
            ProductsService.UpdateProductService(state.id,formData)
            .then(res => {
                if(res.status == 200){
                    state.success = true
                    setTimeout(() => {
                        document.querySelector('#closeModal').click()
                        state.success = false
                    },2000)
                }
            }).catch(err => {
                if(err.response){
                    let status_code = err.response.status
                    if(status_code == 422){
                        let error = err.response.data.errors
                        if(error.hasOwnProperty('sku_id')){
                            alert('รหัส Sku ถูกใช้งานแล้ว')
                        }
                    }
                }else{
                    alert('ผิดพลาดกรุณาลองใหม่ภายหลัง')
                }
            })
        }
        
        
    }

}

const findProductByID = (id:number) => {
    ProductsService.GetProductByIDService(id)
    .then((res:any) => {
        state.id =             res.product.id
        state.sku_id =         res.product.sku_id
        state.name   =         res.product.name
        state.detail =         res.product.detail
        state.unit   =         res.product.unit
        state.price  =         res.product.price
        state.status =         res.product.status
        state.use_stock =      res.product.use_stock
        state.in_stock =       res.product.in_stock
        state.noti_min_stock = res.product.noti_min_stock
        state.cost_per_price = res.product.cost_per_price
        preview.value.src =    res.product.image
        custom_choose_file.value.classList.add('preview')

    })
    .catch(err => {
        alert('ผิดพลาด, กรุณาลองใหม่ภายหลัง')
    })
}


</script>
<template>
    <div id="ModalManage" class="modal" data-static-backdrop data-animations="fadeInDown, fadeOutUp">
        <div class="modal-dialog modal-dialog_centered max-w-6xl">
            <div class="modal-content w-full">
                <div class="modal-header">
                    <h2 class="modal-title">{{ modalTitle }}</h2>
                    <button type="button" class="close la la-times" id="closeModal" @click="resetForm" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Row 1 -->
                    <div class="mt-2 grid grid-cols-2 gap-4">
                        <!-- SKU ID -->
                        <MInputLayout :v$="v$.sku_id" v-model="state.sku_id" type="text" label="SKU ID" 
                                      placeholder="SKU ID" forInput="sku_id" :errors_msg="{required :'กรุณากรอกรหัส SKU ID'}" />

                        <!-- Product Name -->
                        <MInputLayout :v$="v$.name" v-model="state.name" type="text" label="ชื่อสินค้า" 
                                      placeholder="ชื่อสินค้า" forInput="name" :errors_msg="{required :'กรุณากรอกชื่อสินค้า'}" />
                    </div>
                    <!-- ./ Row 1 -->

                    <!-- Row 2 [Product Detail] -->
                    <div class="mt-5">
                        <MInputLayout :v$="v$.detail" v-model="state.detail" type="textarea" label="รายละเอียด" 
                                      placeholder="รายละเอียด" forInput="detail" :errors_msg="{required :'กรุณากรอก รายละเอียด'}" />
                    </div>
                    <!-- ./ Row 2 -->

                    <!-- Row 3 -->
                    <div class="mt-5 grid grid-cols-4 gap-4">
                        <!-- Unit -->
                        <MInputLayout :v$="v$.unit" v-model="state.unit" type="text" label="หน่วยนับ" 
                                      placeholder="หน่วยนับ" forInput="unit" :errors_msg="{required :'กรุณากรอก หน่วยนับ'}" />
                        <!-- ./ Unit -->
                        <!-- Price -->
                        <MInputLayout :v$="v$.price" v-model="state.price" type="text" label="ราคา" 
                                      placeholder="หน่วยนับ" forInput="price" :errors_msg="{required :'กรุณากรอก ราคา'}" />
                        <!-- ./ Price -->
                        <!-- Status -->
                        <MInputLayout :v$="v$.status" v-model="state.status" type="select" label="สถานะ" 
                                      forInput="status" :errors_msg="{required :'กรุณากรอก สถานะ'}" 
                                      :options="[{ value: 'close', label: 'ปิด'},{value: 'open', label: 'เปิด'}]"
                                      className="" />
                        <!-- ./ Status -->
                        <!-- Use Stock -->
                        <MInputLayout :v$="v$.use_stock" v-model="state.use_stock" type="select" label="เปิดใช้งานสต๊อกสินค้า" 
                                      forInput="use_stock" :errors_msg="{required :'กรุณากรอก สถานะ'}" 
                                      :options="[{ value: 'close', label: 'ปิด'}, {value: 'open', label: 'เปิด'}]"
                                      className="" />
                        <!-- ./ Use Stock -->
                    </div>
                    <!-- ./ Row 3 -->
                    <!-- Row 4 -->
                    <div class="mt-5 grid grid-cols-4 gap-4">
                        <!-- in_stock -->
                        <MInputLayout :v$="v$.in_stock" v-model="state.in_stock" type="text" label="จำนวนสินค้าในสต๊อก"
                                      placeholder="จำนวนสินค้าในสต๊อก" forInput="in_stock" :errors_msg="{required :'กุรณากรอก จำนวนสินค้าในสต๊อก'}" />
                        <!-- ./ in_stock -->
                        <!-- noti_min_stock -->
                        <MInputLayout :v$="v$.noti_min_stock" v-model="state.noti_min_stock" type="text" label="แจ้งเตือนเมื่อสินค้าเหลือนน้อยกว่า" 
                                      placeholder="แจ้งเตือนเมื่อสินค้าเหลือนน้อยกว่า" forInput="noti_min_stock" />
                        <!-- ./ noti_min_stock -->
                        <!-- cost_per_price -->
                        <MInputLayout :v$="v$.cost_per_price" v-model="state.cost_per_price" type="text" label="ค่าส่งต่อชิ้น" 
                                      placeholder="ค่าส่งต่อชิ้น" forInput="cost_per_price" />
                        <!-- ./ cost_per_price -->
                    </div>
                    <!-- ./ Row 4 -->
                    
                    <!-- Row 5 -->
                    <div class="mt-5">
                        <label class="label font-heading">รูปภาพสินค้า</label>
                        <label for="productImage" ref="custom_choose_file" class="custom-choose-file">
                            <span class="las la-image"></span>
                            <div class="choose">
                                <span class="las la-mouse-pointer"></span>
                                <span class="text">Choose File</span>
                            </div>
                            <img src="" ref="preview">
                        </label>
                        <input type="file" id="productImage" accept="image/jpeg,image/png"
                               @change="PreviewImage($event)" class="hidden">
                    </div>
                    <!-- ./ Row 5 -->
                    <small class="block invalid-feedback" v-if="state.imageRequired">กรุณาเลือกภาพ</small>

                    <!-- Alert success -->
                    <div class="alert alert_success alert_outlined mt-6 mb-3" v-if="state.success">
                        <strong class="uppercase"><bdi>Success!</bdi></strong>
                        บันทึกข้อมูลสำเร็จ รอสักครู่...
                    </div>

                </div>
                <div class="modal-footer">
                    <div class="flex ltr:ml-auto rtl:mr-auto">
                        <button @click="onSubmitForm" type="button" class="btn btn_success ltr:ml-2 rtl:mr-2 w-icon">
                            <i class="la la-upload"></i> บันทึกข้อมูล
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    /** Style Choose File Upload */
    .custom-choose-file{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 180px;
        height: 180px;
        background: #D1D5DB;
        border-radius: 6px;
        transition: 0.3s;
        overflow: hidden;
        &:hover{
            background: #cacbcd;
        }
        &.w-full{
            width: 100%;
        }
        .la-image{
            display: block;
            &:before{
                color: #2936A8;
                font-size: 110px;
            }
        }
        .choose{
            margin-top:-10px;
            cursor: pointer;
            .la-mouse-pointer{
                &:before{
                    color: #2936A8;
                    font-size: 20px;
                    display: block;
                    transform: translateY(3px);
                }
            }
            .text{
                color: #2936A8;
            }
        }
        img{
            display: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        &.preview{
            position: relative;
            background: unset;
            border:1px solid #D1D5DB;
            &:hover{
                background: unset;
            }
            .la-image{
                display: none;
            }
            .choose{
                position: relative;
                z-index: 1;
                background: #d1d5db82;
                border-radius: 6px;
                padding: .3rem 1rem;
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.28);
                transition: 0.3s;
                &:hover{
                    background: #d1d5db;
                }
            }
            img{
                position: absolute;
                display: unset;
            }
        }
    }

    @import '@/assets/less/pagination.less';
</style>
