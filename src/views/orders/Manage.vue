<script setup lang="ts">
import SearchModal                  from './Search.vue'
import OrdersService                from '../../service/orders'
import { useRoute, useRouter }      from 'vue-router'
import { reactive,onMounted,watch } from 'vue'

/** Set state Component */
const state:any = reactive({
    orders:     [],
    modalTitle: '',
    action:     '',
    prodID:     0,
    search:     '',
    status:     ''
})

/** Create Instance */
const route:any =                  useRoute()
const router:any =                 useRouter()

/** Fetch data */
const FetchData = async () => {
    let queryString:string = ''
    if(route.query.page){
        queryString += `&page=${parseInt(route.query.page)}`
    }
    
    state.orders = await OrdersService.GetOrdersService('?pagi=yes' + queryString)
}

/** Fetch data by search */
const FetchDataBySearch = async () => {
    route.push({
        path: '/orders/manage',
        query: {

        }
    })
    let queryString:string = `?search=`
    state.orders = await OrdersService.GetOrdersService(queryString)
    const closeModal = document.querySelector('#closeModal') as HTMLInputElement
    closeModal.click()
}

onMounted(async () => {

    //Set sate from query string
    
    FetchData()
})

const deleteOrder = (id:number) => {
    if(confirm('ต้องการลบข้อมูลรายการนี้ ?')){
        OrdersService.DeleteProductService(id)
        .then((res:any) => {
            FetchData()
        })
        .catch(err => {
            alert('กรุณาลองใหม่ภายหลัง')
        })
    }
}

const paginationControl = (data:object) => {
    state.orders = data
}

const actionManage = (action:string,id?:number) => {
    if(action == 'create'){
        state.modalTitle = 'เพิ่มข้อมูลสั่งซื้อ'
    }else if(action == 'update'){
        state.modalTitle = 'แก้ไขข้อมูล'
        state.prodID = id
    }
    state.action = action
}



</script>
<template>
    <!-- Breadcrumb -->
    <section class="breadcrumb">
        <h1>จัดการคำสั่งซื้อ</h1>
        <ul>
            <li><a href="#">เข้าสู่ระบบ</a></li>
            <li class="divider la la-arrow-right"></li>
            <li>จัดการคำสั่งซื้อ</li>
        </ul>
    </section>

    <!-- Operator -->
    <div class="flex justify-between">
        <div>
            <!-- Button Open Modal Form -->
            <router-link to="/orders/create" class="btn btn_primary w-icon" >
                <span class="la la-plus ltr:mr-2"></span> เพิ่มข้อมูล
            </router-link>
        </div>
        <div class="grid gap-3 grid-cols-[2fr_1fr]">
            <div class="text-[#14A2B8] text-base text-right font-light relative top-[7px]">ผลการค้นหา : 1 กุมภาพันธ์ 2565</div>
            <!-- Button Submit -->
            <button data-toggle="modal" data-target="#ModalSearch" 
                    type="button" class="btn btn_primary w-icon" >
                <span class="la la-search ltr:mr-2"></span> ค้นหารายการสั่งซื้อ
            </button>
        </div>
    </div>
    <!-- ./ Operator -->

    <!-- Table List -->
    <div class="table-warper">
        <table class="table-custom">
            <thead>
                <tr>
                    <th>รหัสสั่งซื้อ</th>
                    <th>เซลเพจ</th>
                    <th>ชื่อลูกค้า</th>
                    <th>เบอร์โทร</th>
                    <th>ยอดชำระเงิน</th>
                    <th>สถานะ</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in state.orders.orders" v-bind:key="order.id">
                    <td>{{ order.order_code }}</td>
                    <td>{{ order.Salepage.title }}</td>
                    <td>{{ order.fullname }}</td>
                    <td>{{ order.phone }}</td>
                    <td>{{ order.price_total }}</td>
                    <td>{{ order.status }}</td>
                    <td>
                        <button @click="$router.push({path: 'update/' + order.id})" type="button">
                            <i class="la la-pen"></i>
                        </button>
                        <button @click="deleteOrder(order.id)"><i class="la la-trash-alt"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- ./ Table List -->

    <SearchModal @search="FetchDataBySearch()" />
</template>

<style lang="less">
    @import '@/assets/less/table.less';
</style>