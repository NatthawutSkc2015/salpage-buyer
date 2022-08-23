<script setup lang="ts">
import { ref, reactive, onMounted, computed }  from 'vue'
import MInputLayout                  from '../../components/MInputLayout.vue'
import OrdersService                 from '../../service/orders'
import AddProduct                    from './_Product.vue'
import {useVuelidate}                from '@vuelidate/core'
import {required, email}             from '@vuelidate/validators'
import { useRouter,useRoute }        from 'vue-router'
import moment                        from 'moment'
import ProductsService               from '../../service/products'
import SalepageService               from '../../service/salepage'
import { InputMask }                 from 'imask'
import ThaiAddressService            from '../../service/thaiaddress'

/** Shared */
const route = useRoute()
const router = useRouter()
moment.locale('th')

/** Ref Input */
const ShipingCoustInput:any =        ref(null)
const DiscountInput:any =            ref(null)
let formData:any =                   new FormData
let index_form:number =              0

/** Title Breadcrumb */
const TitleBreadCrumb = (route.name == 'order-create') ? 
                         `เพิ่มคำสั่งซื้อ (${ moment(+Date.now()).format("Do MMM YY") })` : 
                         'แก้ไขคำสั่งซื้อ'

/** State for Component */
const state:any = reactive({
    order_id :       '',
    salepages:       [],
    products:        [],
    products_select: [],
    order_details :  [],
    statuss:         [
        {value: 'new_order',label: 'รายการสั่งซื้อใหม่'},
        {value: 'prepare',  label: 'กำลังเตรียมของ'},
        {value: 'sent',     label: 'ส่งของแล้ว'}
    ],
    salepage_id :    '',
    fullname :       '',
    address:         '',
    province_id :    '',
    district_id :    '',
    sub_district_id: '',
    zipcode:         '',
    phone:           '',
    remark:          '',
    status:          '',
    price_total:     0,
    discount:        0,
    payment_method:  '',
    shiping_cost:    0,
    slip_image:      '',
    success:         false,
    loadding:        false,
    empty_select:    true,
    action:          ''
})

/** Price total */
const total = computed(():number => {
    return state.products_select.reduce(
        (i:any, item:any) => item.total + i,0
    )
})

/** Price total all */
const price_total = computed(():number => {
    return (total.value + parseInt(state.shiping_cost)) - parseInt(state.discount)
})

/** Check if the product has been selected or not. */
const empty_select = computed(():boolean => {
    let result =  (state.products_select.length == 0) ? true : false
    state.empty_select = result
    return result
})


/** Get Provinces | By id */
const provinces = computed(():any => {
    return ThaiAddressService.GetProvincesService()
})

/** Get Districts | By id */
const districts = computed(():any => {
    return (state.province_id) ? ThaiAddressService.GetDistrictsService(state.province_id) : ThaiAddressService.GetDistrictsService()
})

/** Get Sub District | By id */
const sub_districts = computed(():any => {
    let pv_id = state.province_id
    let pd_id = state.district_id
    let sdt_id = state.sub_district_id
    state.zipcode = ThaiAddressService.GetZipcodesService(pv_id,pd_id,sdt_id)
    return (state.district_id) ? ThaiAddressService.GetSubDistrictsService(state.district_id) : ThaiAddressService.GetSubDistrictsService()
})



/** Vuelidate Field */
const rulesValidate = {
    salepage_id:     {required},
    payment_method:  {required},
    fullname:        {required},
    phone:           {required},
    address:         {required},
    province_id:     {required},
    district_id:     {required},
    sub_district_id: {required},
    zipcode:         {required},
    status:          {required},
    remark:          {}
}
const v$ = useVuelidate(rulesValidate, state)

/** Submit Form Order */
const onSubmitForm = async () => {
    await v$.value.$touch()

    
    if (!v$.value.$error && state.empty_select == false){
        formData.append('salepage_id', state.salepage_id)
        formData.append('payment_method', state.payment_method)
        formData.append('fullname', state.fullname)
        formData.append('address', state.address)
        formData.append('province_id', state.province_id)
        formData.append('district_id', state.district_id)
        formData.append('sub_district_id', state.sub_district_id)
        formData.append('phone', state.phone)
        formData.append('zipcode', state.zipcode)
        formData.append('discount', state.discount)
        formData.append('shiping_cost', state.shiping_cost)
        formData.append('price_total', price_total.value)
        formData.append('status', state.status)
        formData.append('action', state.action)
        state.loadding = true

        let order:any
        if(state.action == 'create'){
            order = OrdersService.CreateOrderService(formData)
        }else if(state.action == 'update'){
            order = OrdersService.UpdateOrderService(state.order_id, formData)
        }

        order.then((res:any) => {
            if(res.status == 200){
                setTimeout(() => {
                    state.success = true
                })

                setTimeout(() => {
                    router.push({path: '/orders/manage'})
                },2000)
            }
        }).catch((err:any) => {
            alert('กรุณาลองใหม่ภายหลัง')
            setTimeout(() => {
                router.push({path: '/orders/manage'})
            },1000)
        })

    }
}

onMounted(async () => {

    if(route.name == 'order-create'){
        state.action = 'create'
    }else if(route.name == 'order-update'){
        state.action = 'update'
        let order_by_id:any = await OrdersService.GetOrderByIDService(route.params.id)
        state.products_select = order_by_id.order_details
        state.order_id =        order_by_id.order.id
        state.fullname =        order_by_id.order.fullname
        state.phone =           order_by_id.order.phone
        state.address =         order_by_id.order.address
        state.province_id =     order_by_id.order.province_id
        state.district_id =     order_by_id.order.district_id
        state.sub_district_id = order_by_id.order.sub_district_id
        state.zipcode =         order_by_id.order.zipcode
        state.remark =          order_by_id.order.remark
        state.status =          order_by_id.order.status
        state.salepage_id =     order_by_id.order.salepage_id
        state.payment_method =  order_by_id.order.payment_method
    }

    //get data product all
    let products:any = await ProductsService.GetProductsSearchService('?pagi=no')
    //set data to state
    state.products = products.products

    //get data salepage all
    let salepages:any = await SalepageService.GetSalepagesService('?pagi=no')
    let salepages_ = salepages.salepages.map((item:any) => {
        item.value = item.id
        item.label = item.title
        return item
    })
    //set data to state
    state.salepages = salepages_

    //Mash ShipingCoust Input
    new InputMask(DiscountInput.value, {
        mask: '000',
        min: 0,
        max: 999
    })

    //Mash Discount Input
    new InputMask(ShipingCoustInput.value, {
        mask: '000',
        min: 0,
        max: 999
    })

    //Mas Phone
    new InputMask(document.querySelector('#phone') as HTMLInputElement, {
        mask: '0000000000'
    })
})

/** Select Products */
const selectProd = (prod:any) => {
    if(containsItem(prod.id) === false){
        //Add to
        formData.append(`orders[${index_form}][product_id]`,prod.id)
        formData.append(`orders[${index_form}][price]`, prod.price)
        formData.append(`orders[${index_form}][amount]`, 1)
        formData.append(`orders[${index_form}][shiping_cost]`, prod.cost_per_price || 0)
        formData.append(`orders[${index_form}][total]`, prod.price)
        formData.append(`orders[${index_form}][action]`,'create')
        prod.amount = 1
        prod.total = prod.price * 1
        state.products_select.push(prod)
        index_form++
    }else{
        //Update to
        let i = 0
        for(const _prod of state.products_select){
            if(_prod.id === prod.id){
                state.products_select[i].amount += 1
                state.products_select[i].total = state.products_select[i].amount * _prod.price
            }
            i++
        }
        
        for(const _form of formData.entries()){
            let index = _form[0].replace(/[^0-9]/g, "")
            if(formData.get(`orders[${index}]['product_id']`) == prod.id){

                //Update Amount
                let amString = `orders[${index}]['amount']`
                if(_form[0] == amString){
                    let amount = parseInt(_form[1])
                    formData.set(amString, amount += 1 )
                }

                //Update Total
                let ttString = `orders[${index}]['total']`
                if(_form[0] == ttString){
                    let total = parseInt(_form[1])
                    formData.set(ttString, total + parseInt(prod.price))
                }

            }
        }
    }
}

/** Check if the item has been selected.  */
const containsItem  = (id:number) => {
    for(const prod of state.products_select){
        if(prod.id == id){
            return true
        }
    }
    return false
}

/** Search Product by keyword */
const searchProd = (prods:any) => {
    state.products = prods
}

</script>
<template>
    <!-- Breadcrumb -->
    <section class="breadcrumb">
        <h1>{{ TitleBreadCrumb }}</h1>
        <ul>
            <li><a href="#">เข้าสู่ระบบ</a></li>
            <li class="divider la la-arrow-right"></li>
            <li><router-link :to="{name: 'orders-manage'}">จัดการคำสั่งซื้อ</router-link></li>
            <li class="divider la la-arrow-right"></li>
            <li>{{ TitleBreadCrumb }}</li>
        </ul>
    </section>
    <hr class="relative top-[-10px] mb-2">
    <div class="grid grid-cols-2 gap-6">
        <!-- Let -->
        <div>
            <!-- Products -->
            <div class="flex justify-between">
                <h2 class="text-xl">รายการสินค้า</h2>
                <button v-if="state.action == 'create'" data-toggle="modal" data-target="#ModalSelectProduct"
                        type="button" class="btn btn_secondary w-icon">
                    <span class="la la-plus ltr:mr-2"></span> เพิ่มสินค้า
                </button>
            </div>
            <!-- ./ Products -->
            <!-- Table -->
            <div class="table-warper !max-h-[48vh] !min-h-[unset]">
                <table class="table-custom">
                    <thead>
                        <tr>
                            <th>สินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>ยอดรวม</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in state.products_select" v-bind:key="prod.id">
                            <td>{{ prod.name }}</td>
                            <td>{{ prod.price }}</td>
                            <td>{{ prod.amount }}</td>
                            <td>{{ prod.total }}</td>
                            <td>
                            <template v-if="state.action == 'create'">
                                <button class="hidden"></button>
                                <button><i class="la la-trash-alt"></i></button>
                            </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- ./ Table -->
            <!-- Sumary -->
            <div class="mt-5 rounded-[10px] border border-[#4B5563] p-5 bg-white shadow-md">
                <h3 class="text-lg">สรุปยอดการสั่งซื้อ</h3>
                <div class="flex justify-end font-extralight text-right">
                    <div>
                        <div class="w-[200px]">รวม
                            <input type="text" class="mx-2 w-1/4 font-light text-center bg-transparent" disabled v-model="total"> บาท
                        </div>
                        <div class="w-[200px] mt-2">ค่าขนส่ง 
                            <input ref="DiscountInput" type="text"  class="appearance-none border mx-2 w-1/4 rounded font-light text-center"
                                   v-model="state.shiping_cost"> บาท
                        </div>
                        <div class="w-[200px] mt-2">ส่วนลด 
                            <input ref="ShipingCoustInput" type="text"  class="appearance-none border mx-2 w-1/4 rounded font-light text-center"
                                   v-model="state.discount"> บาท
                        </div>
                        <div class="w-[200px] mt-2 font-normal">ยอดรวม
                            <input type="text" class="mx-2 w-1/4 font-light text-center bg-transparent" disabled v-model="price_total"> บาท
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./ Sumary -->
            <!-- Alert Success -->
            <div class="alert alert_success alert_outlined mt-6 mb-3" v-if="state.success">
                <strong class="uppercase"><bdi>Success!</bdi></strong>
                บันทึกข้อมูลสำเร็จ รอสักครู่...
            </div>

            <!-- Alert Empty Select -->
            <div class="alert alert_danger alert_outlined mt-6 mb-3" v-if="empty_select && v$.$dirty">
                <strong class="uppercase"><bdi>WRONG !</bdi></strong>
                กรุณเลือกรายการสินค้า
            </div>
            <!-- ./ Alert Empty Select -->
        </div>
        <!-- Right -->
        <div>
            <h3 class="text-xl font-light">ข้อมูลลูกค้า</h3>
            <!-- Row 1 -->
            <div class="mt-8 grid grid-cols-2 gap-4">
                <!-- Salepage -->
                <MInputLayout :v$="v$.salepage_id" v-model="state.salepage_id" type="select" label="เซลเพจ" 
                                      forInput="salepage" :errors_msg="{required :'กรุณาเลือก เซลเพจ'}" 
                                      :options="state.salepages"
                                      className="" />
                <!-- Payment -->
                <MInputLayout :v$="v$.payment_method" v-model="state.payment_method" type="select" label="วิธีการชำระเงิน" 
                                      forInput="salepage" :errors_msg="{required :'กรุณาเลือก วิธีการชำระเงิน'}" 
                                      :options="[{ value: 'on_delivery', label: 'ชำระเงินปลายทาง'},{value: 'transfer', label: 'โอนเงิน'}]"
                                      className="" />
            </div>
            <!-- Row 2 -->
            <div class="mt-5 grid grid-cols-2 gap-4">
                <!-- Cutomer -->
                <MInputLayout :v$="v$.fullname" v-model="state.fullname" type="text" label="ชื่อลูกค้า" 
                                      placeholder="ชื่อลูกค้า" forInput="fullname" :errors_msg="{required :'กรุณากกรอกชื่อลูกค้า'}" />
                <!-- Phone -->
                <MInputLayout :v$="v$.phone" v-model="state.phone" type="text" label="เบอร์โทร"
                                      placeholder="เบอร์โทร" forInput="phone" :errors_msg="{required :'กรุณากรอกเบอร์โทร'}" />
            </div>
            <!-- Row 3 -->
            <div class="mt-5">
                <!-- Address -->
                <MInputLayout :v$="v$.address" v-model="state.address" type="textarea" label="ที่อยู่" rows="3"
                                      placeholder="ที่อยู่" forInput="address" :errors_msg="{required :'กรุณากรอกที่อยู่'}" />
            </div>
            <!-- Row 4 -->
            <div class="mt-5 grid grid-cols-2 gap-4">
                <!-- Province -->
                <MInputLayout :v$="v$.province_id" v-model="state.province_id" type="select" label="จังหวัด" 
                                      forInput="province_id" :errors_msg="{required :'กรุณาเลือก จังหวัด'}" 
                                      :options="provinces" />
                <!-- District -->
                <MInputLayout :v$="v$.district_id" v-model="state.district_id" type="select" label="อำเภอ" 
                                      forInput="province_id" :errors_msg="{required :'กรุณาเลือก อำเภอ'}" 
                                      :options="districts" />
            </div>
            <!-- Row 5 -->
            <div class="mt-5 grid grid-cols-2 gap-4">
                <!-- Sub District -->
                <MInputLayout :v$="v$.sub_district_id" v-model="state.sub_district_id" type="select" label="อำเภอ" 
                                      forInput="province_id" :errors_msg="{required :'กรุณาเลือก ตำบล'}" 
                                      :options="sub_districts" />
                <!-- Zipcode -->
                <MInputLayout :v$="v$.zipcode" v-model="state.zipcode" type="text" label="รหัสไปรษณีย์" 
                                      placeholder="รหัสไปรษณีย์" forInput="zipcode" :errors_msg="{required :'กรุณากรอกรหัส รหัสไปรษณีย์'}" />
            </div>
            <!-- Row 6 -->
            <div class="mt-5">
                <!-- Remark -->
                <MInputLayout :v$="v$.remark" v-model="state.remark" type="textarea" label="หมายเหตุ" rows="3"
                                      placeholder="หมายเหตุ" forInput="remark" />
            </div>
            <!-- Row 7 -->
            <div class="mt-5 grid grid-cols-2 gap-4">
                <MInputLayout :v$="v$.status" v-model="state.status" type="select" label="สถานะ" 
                                      forInput="status" :errors_msg="{required :'กรุณาเลือก สถานะ'}" 
                                      :options="state.statuss" />
            </div>
            <div class="flex justify-end">
                <button @click="onSubmitForm()" type="button" class="btn btn_success ltr:ml-2 rtl:mr-2 w-icon" :disabled="state.loadding">
                    <i class="la la-spinner" v-if="state.loadding"></i> 
                    <i class="la la-upload" v-if="!state.loadding"></i> บันทึกข้อมูล
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Add Product -->
    <AddProduct @selectProd="selectProd" @searchProd="searchProd" :products="state.products"/>
</template>
<style lang="less">
    @import '@/assets/less/table.less';
</style>