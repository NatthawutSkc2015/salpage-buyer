<script type="ts">
import { mapState }     from 'pinia'
import { useAuthStore } from '../../stores/auth'

export default {
    computed: {
        ...mapState(useAuthStore,[
            'prefix_name',
            'store_name',
            'image',
            'createdAt',
            'updatedAt'
        ])
    }
}

</script>
<template>
    <!-- Menu Bar -->
    <aside class="menu-bar menu-sticky menu-wide">
        <div class="menu-items">
            <div class="menu-header">
                <div class="flex items-center mx-8 mt-8">
                    <span class="avatar w-16 h-16">{{ this.prefix_name }}</span>
                    <div class="ltr:ml-4 rtl:mr-4 ltr:text-left rtl:text-right">
                        <div class="font-normal text-2xl">{{ this.store_name }}</div>
                        <div class="font-extralight mt-1 text-[#CBCBCB]">เป็นสมาชิกเมื่อ</div>
                        <div class="font-extralight mt-1 text-[#CBCBCB]">{{ this.createdAt }}</div>
                        <div class="font-extralight mt-1 text-[#CBCBCB]">Pakage: Editor</div>
                    </div>
                </div>
                <hr class="ml-8 my-4">
            </div>
            
            <router-link to="/dashboard" class="link" data-toggle="tooltip-menu" data-tippy-content="Dashboard">
                <span class="icon la la-laptop"></span>
                <span class="title">แผงควบคุม</span>
            </router-link>
            <router-link to="/products" class="link" data-toggle="tooltip-menu" data-tippy-content="Products">
                <span class="icon la la-cube"></span>
                <span class="title">จัดการข้อมูลสินค้า</span>
            </router-link>
            <router-link to="/orders" class="link" data-toggle="tooltip-menu" data-tippy-content="Orders">
                <span class="icon la la-shopping-cart"></span>
                <span class="title">จัดการคำสั่งซื้อ</span>
            </router-link>
            <router-link to="/salepages" class="link" data-toggle="tooltip-menu" data-tippy-content="Salepage">
                <span class="icon la la-file-alt"></span>
                <span class="title">จัดการเซลเพจ</span>
            </router-link>
            <router-link to="/users" class="link" data-toggle="tooltip-menu" data-tippy-content="Users">
                <span class="icon la la-user-alt"></span>
                <span class="title">ผู้ใช้งานระบบ</span>
            </router-link>
        </div>

    </aside>
</template>