<script setup lang="ts">
import { reactive, defineEmits }     from 'vue'
import MInputLayout     from '../../components/MInputLayout.vue'
import { useVuelidate } from '@vuelidate/core'
import { useRouter }    from 'vue-router'

const router = useRouter()
const emits = defineEmits(['search'])
const state = {
    orders:             [],
    salepages:          [],
    search: {
        order_date:     '',
        order_code:     '',
        c_name:         '',
        c_phone:        '',
        salepage:       '',
        name_or_sku_id: '',
        payment:        '',
        status:         ''
    }
}

/** Submit Form Search */
const onSubmit = () => {
    let query = {
        search: 'search',
        order: '001'
    }
    router.push({name: 'orders-manage', query: query})
    emits('search')
}

</script>
<template>
    <div id="ModalSearch" class="modal" data-static-backdrop data-animations="fadeInDown, fadeOutUp">
        <div class="modal-dialog modal-dialog_centered max-w-6xl">
            <div class="modal-content w-full">
                <div class="modal-header">
                    <h2 class="modal-title">ค้นหารายการสั่งซื้อ</h2>
                    <button type="button" class="close la la-times" id="closeModal"  data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Row 1 -->
                    <div class="mt-2 grid grid-cols-2 gap-5">
                        <!-- Order date -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="order_date">
                                วันที่สั่งซื้อ
                            </label>
                            <input type="date" v-model="state.search.order_date" id="order_date" class="form-control rounded-md pt-8" placeholder="วันที่สั่งซื้อ" />
                        </div>
                        <!-- Order Code -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="order_code">
                                รหัสสั่งซื้อ
                            </label>
                            <input type="text" v-model="state.search.order_code" id="order_code" class="form-control rounded-md pt-8" placeholder="รหัสคำสั่งซื้อ" />
                        </div>
                    </div>
                    <!-- ./ Row 1 -->
                    <!-- Row 2 -->
                    <div class="mt-6 grid grid-cols-2 gap-5">
                        <!-- Customer name -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="c_name">
                                ชื่อลูกค้า
                            </label>
                            <input type="text" v-model="state.search.c_name" id="c_name" class="form-control rounded-md pt-8" placeholder="ชื่อลูกค้า" />
                        </div>
                        <!-- Phone -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="phone">
                                เบอร์โทร
                            </label>
                            <input type="text" v-model="state.search.c_phone" id="phone" class="form-control rounded-md pt-8" placeholder="เบอร์โทร" />
                        </div>
                    </div>
                    <!-- ./ Row 2 -->
                    <!-- Row 3 -->
                    <div class="mt-6 grid grid-cols-2 gap-5">
                        <!-- Salepage -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="salepage">
                                เซลเพจ
                            </label>
                            <div class="border border-[#D1D5DB] rounded-md bg-white font-light relative">
                                <select class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-2 font-extralight mt-8" 
                                        v-model="state.search.salepage" id="salepage">
                                    <option value="">ทดสอบ</option>
                                </select>
                                <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
                            </div>
                        </div>
                        <!-- Product Name / SKU ID -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="name_or_sku_id">
                                ชื่อสินค้า หรือ SKU ID
                            </label>
                            <input type="text" v-model="state.search.name_or_sku_id" id="name_or_sku_id" class="form-control rounded-md pt-8" 
                                   placeholder="ชื่อสินค้า หรือ SKU ID" />
                        </div>
                    </div>
                    <!-- ./ Row 3 -->
                    <!-- Row 4 -->
                    <div class="mt-6 grid grid-cols-2 gap-5">
                        <!-- Payment -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="payment">
                                การชำระเงิน
                            </label>
                            <div class="border border-[#D1D5DB] rounded-md bg-white font-light relative">
                                <select class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-2 font-extralight mt-8" 
                                        v-model="state.search.salepage" id="payment">
                                    <option value="">ทดสอบ</option>
                                </select>
                                <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
                            </div>
                        </div>
                        <!-- Status -->
                        <div class="relative">
                            <label class="label absolute block top-0 mt-2 ltr:ml-4 rtl:mr-4 font-heading z-10" for="status">
                                สถานะ
                            </label>
                            <div class="border border-[#D1D5DB] rounded-md bg-white font-light relative">
                                <select class="focus:outline-none appearance-none w-full bg-transparent pl-3 pr-3 pb-2 font-extralight mt-8" 
                                        v-model="state.search.status" id="status">
                                    <option value="">ทดสอบ</option>
                                </select>
                                <div class="custom-select-icon la la-caret-down text-xl top-[30px] right-[-10px]"></div>
                            </div>
                        </div>
                    </div>
                    <!-- ./ Row 4 -->
                </div>
                <div class="modal-footer">
                    <div class="flex ltr:ml-auto rtl:mr-auto">
                        <button type="button" class="btn btn_secondary ltr:ml-2 rtl:mr-2 w-icon" @click="onSubmit()">
                            <i class="la la-search pr-2"></i> ค้นหารายการ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>