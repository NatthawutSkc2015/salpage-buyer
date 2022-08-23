<script setup lang="ts">
import {defineEmits, defineProps} from 'vue'
import ProductsService            from '../../service/products'

const props:any = defineProps({
    products: {
        type: Array,
        required: true
    }
})

const emits = defineEmits(['selectProd','searchProd'])
const selectProd = (id:number) =>{
    emits('selectProd', id)
    const closeModal = document.querySelector('#closeModal') as HTMLInputElement
    closeModal.click()
}

const searchPropd = async (search:string) => {
    if(search.trim() == ''){
        return alert('กรุณาใส่คำที่คุณต้องการค้นหา')
    }

    let prods:any = await ProductsService.GetProductsSearchService('?pagi=no&search=' + search)
    emits('searchProd', prods.products)
    
}
</script>
<template>
    <div id="ModalSelectProduct" class="modal" data-static-backdrop data-animations="fadeInDown, fadeOutUp">
        <div class="modal-dialog modal-dialog_centered max-w-4xl">
            <div class="modal-content w-full">
                <div class="modal-header">
                    <h2 class="modal-title">เลือกสินค้า</h2>
                    <button type="button" class="close la la-times" id="closeModal" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Search -->
                    <div class="relative">
                        <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="name_or_sku_id">
                            ชื่อสินค้าหรือ SKU ID (Enter)
                        </label>
                        <input type="text" class="form-control rounded-md pt-8" id="name_or_sku_id"
                               placeholder="ชื่อสินค้าหรือ SKU ID" @keyup.enter="searchPropd($event.target.value)"/>
                    </div>
                    <!-- Table -->
                    <div class="table-warper !min-h-[unset]">
                        <table class="table-custom bg-[#e5e7eb]">
                            <thead>
                                <tr>
                                    <th width="20%">รูปภาพสินค้า</th>
                                    <th>สินค้า</th>
                                    <th width="20%">ราคา</th>
                                    <th width="20%">จำนวนในสต๊อก</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prod in props.products" v-bind:key="prod.id" 
                                    class="cursor-pointer" 
                                    @click="selectProd(prod)">
                                    <td><img :src="prod.image" class="object-cover h-10 rounded-md"></td>
                                    <td>{{ prod.name }}</td>
                                    <td>{{ prod.price }}</td>
                                    <td>{{ prod.in_stock }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer text-[#2936AB]">
                    *** คลิกที่รายการสินค้าเพื่อเลือกรายการที่ต้องการ
                </div>
            </div>
        </div>
    </div>
</template>