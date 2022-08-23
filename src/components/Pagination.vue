
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ProductsService              from '../service/products'
import {useRoute, useRouter}        from 'vue-router'

const props = defineProps({
    pageMeta: {
        required: true
    }
})

const emit =    defineEmits(['paginateControl'])
const route =   useRoute()
const router =  useRouter()
const paginateControl = (page:number) => {

    /** Call Request from @utils  */
    ProductsService.GetProductsService('&page=' + page)
    .then(res => {
        let search = {}
        if(route.query.search){
            search = {search: route.query.search}
        }
        let status = {}
        if(route.query.status){
            status = {status: route.query.status}
        }
        let p = {page: page}
        let query = Object.assign({},p, search, status)
        router.push({path: route.path, query: query })

        //Sent data to parent component
        emit('paginateControl', res)
    }).catch(err => {
        console.log(err)
    })
}

</script>
<template>
    <ul class="mt-5 custom-pagination" v-if="props.pageMeta">
        <li class="first">
            <a href="" @click.prevent="paginateControl(1)">
                <i class="la la-angle-double-left"></i>
            </a>
        </li>
        <li class="prev">
            <a href="" @click.prevent="paginateControl(1)">
            <i class="las la-caret-left"></i></a>
        </li>
        <li class="page" :class="{'active' : p.number == props.pageMeta.current_page_number }" 
            v-for="p in props.pageMeta.pagis" v-bind:key="p.number">
            <a href="" @click.prevent="paginateControl(p.number)">
                {{ p.number }}
            </a>
        </li>
        <li class="next">
            <!-- Have page next -->
            <a href="" v-if="props.pageMeta.has_next_page" @click.prevent="paginateControl(props.pageMeta.next_page_number)">
                <i class="las la-caret-right"></i>
            </a>
            <!-- Not Have page next -->
            <a href="" @click.prevent v-if="!props.pageMeta.has_next_page">
                <i class="las la-caret-right"></i>
            </a>
        </li>
        <li class="last">
            <a href="" @click.prevent="paginateControl(props.pageMeta.number_of_pages)">
            <i class="las la-angle-double-right"></i></a>
        </li>
        <!-- <li class="first"><a href=""><i class="la la-angle-double-left"></i></a></li>
        <li class="prev"><a href=""><i class="las la-caret-left"></i></a></li>
        <li class="page"><a href="">1</a></li>
        <li class="page"><a href="">2</a></li>
        <li class="page"><a href="">3</a></li>
        <li class="page"><a href="">...</a></li>
        <li class="page"><a href="">7</a></li>
        <li class="page"><a href="">8</a></li>
        <li class="page"><a href="">9</a></li>
        <li class="page active"><a href="">10</a></li>
        <li class="page"><a href="">...</a></li>
        <li class="page"><a href="">15</a></li>
        <li class="page"><a href="">16</a></li>
        <li class="page"><a href="">17</a></li>
        <li class="next"><a href=""><i class="las la-caret-right"></i></a></li>
        <li class="last"><a href=""><i class="las la-angle-double-right"></i></a></li> -->
    </ul>
</template>

<style lang="less">
    @import '@/assets/less/pagination.less';
</style>

