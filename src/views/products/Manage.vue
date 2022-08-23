<script setup lang="ts">
import ProductForm                  from './_Form.vue'
import CustomPagination             from '../../components/Pagination.vue'
import { reactive,onMounted,watch } from 'vue'
import ProductsService              from '../../service/products'
import { useRoute, useRouter }      from 'vue-router'

/** Set state Component */
const state:any =  reactive({
    products: [],
    modalTitle: '',
    action: '',
    prodID: 0,
    search: '',
    status: ''
})

/** Create Instance */
const route:any          = useRoute()
const router:any         = useRouter()

/** Fetch data */
const FetchData = async () => {
    let queryString:string = ''
    if(route.query.page){
        queryString += `&page=${parseInt(route.query.page)}`
    }
    if(route.query.search){
        queryString += `&search=${route.query.search}`
    }
    if(route.query.status){
        queryString += `&status=${route.query.status}`
    }
    state.products = await ProductsService.GetProductsService(queryString)
}

/** Fetch date by search */
const FetchDataBySearch = async () => {
    router.push({
        path: '/products/manage', 
        query: {
            search: state.search,
            status: state.status
        }
    })
    let queryString:string = `?search=${state.search}&status=${state.status}`
    state.products = await ProductsService.GetProductsSearchService(queryString)
}

onMounted(async () => {

    //Set state from query string
    if(route.query.search){
        state.search = route.query.search
    }

    if(route.query.status){
        state.status = route.query.status
    }

    FetchData()
})

watch(() => state.action, async (action:string) => {
    if(action == ''){
        FetchData()
    }
})

const deleteProduct = (id:number) => {
    if(confirm('ต้องการลบข้อมูลรายการนี้ ?')){
        ProductsService.DeleteProductService(id)
        .then((res:any) => {
            FetchData()
        })
        .catch(err => {
            alert('กรุณาลองใหม่ภายหลัง')
        })
    }
}

const paginateControl = (data:object) => {
    state.products = data
}

// const customFilter = () => {
//     let datas = state.products.products
//     if(datas){
//         return datas.filter((item:any) => {
//             return item.status == state.status
//         })
//     }
// }

const actionManage = (action:string,id?:number) => { 
    if(action == 'create'){
        state.modalTitle = 'เพิ่มข้อมูลสินค้า'
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
        <h1>จัดการข้อมูลสินค้า</h1>
        <ul>
            <li><a href="#">เข้าสู่ระบบ</a></li>
            <li class="divider la la-arrow-right"></li>
            <li>จัดการสินค้า</li>
        </ul>
    </section>

    <!-- operator -->
    <div class="flex justify-between">
        <div>
            <!-- Button Open Modal Form -->
            <button data-toggle="modal" data-target="#ModalManage" 
                    type="button" class="btn btn_primary w-icon" 
                    @click="actionManage('create')">
                <span class="la la-plus ltr:mr-2"></span> เพิ่มข้อมูล
            </button>

        </div>
        <div class="grid gap-3 grid-cols-[2fr_2fr_1fr]">
            <!-- Input Search -->
            <input type="text" class="form-control rounded-full" 
                   v-model="state.search" placeholder="ค้นหาสินค้า" />
            <!-- Input Status -->
            <div class="custom-select">
                <select class="form-control rounded-full" v-model="state.status">
                    <option value="">สถานะ</option>
                    <option value="open">เปิดใช้งาน</option>
                    <option value="close">ปิดใช้งาน</option>
                </select>
                <div class="custom-select-icon la la-caret-down text-xl"></div>
            </div>
            <!-- Button Submit -->
            <button type="button" class="btn btn_primary w-icon" @click="FetchDataBySearch()">
                <span class="la la-search ltr:mr-2"></span> ค้นหา
            </button>
        </div>
    </div>

    <!-- Table list -->
    <div class="table-warper">
        <table class="table-custom">
            <thead>
                <tr>
                    <th>SKU ID</th>
                    <th>ชื่อสินค้า</th>
                    <th>ราคาขาย</th>
                    <th>หน่วยนับ</th>
                    <th>สต๊อกสินค้า</th>
                    <th>แจ้งเมื่อสินค้าไกล้หมด</th>
                    <th>สถานะ</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in state.products.products" v-bind:key="product.id">
                    <td>{{ product.sku_id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.unit }}</td>
                    <td>{{ (product.use_stock == 'open') ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}</td>
                    <td>{{ product.noti_min_stock }}</td>
                    <td>{{ (product.status == 'open') ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}</td>
                    <td>
                        <button @click="actionManage('update', product.id)" type="button" 
                                data-toggle="modal" data-target="#ModalManage">
                                <i class="la la-pen"></i>
                        </button>
                        <button @click="deleteProduct(product.id)"><i class="la la-trash-alt"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- ./ Table list -->
    <CustomPagination :pageMeta="state.products.page_meta"  @paginateControl="paginateControl"  />
    
    <!-- Form Create | Update -->
    <ProductForm :modalTitle="state.modalTitle" :action="state.action" :prodID="state.prodID" 
                 @setAction="state.action = ''" />
    <!-- ./ Form Create | Update -->

</template>

<style lang="less">
    @import '@/assets/less/table.less';
</style>