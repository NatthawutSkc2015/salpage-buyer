import request from '../utils/request'

/**
 * @function GetOrders
 * @params json data
 * @return {*}
 */
const GetOrdersService = (queryString:string) => {
    return request({
        url: 'order?pagi=yes' + queryString,
        method: 'get'
    })
}

/**
 * @function GetOrdersSearch
 * @params json data
 * @return {*}
 */
// const GetOrdersSearchService = (queryString:string) => {
//     return request({
//         url: 'order' + queryString,
//         method: 'get'
//     })
// }

/**
 * @function GetOrderByID
 * @params json data
 * @return {*}
 */
const GetOrderByIDService = (id:any) => {
    return request({
        url: `order/${id}`,
        method: 'get'
    })
}

/**
 * @function CreateOrder
 * @params json data
 * @return {*}
 */
const CreateOrderService = (params:any) => {
    return request({
        url: 'order',
        method: 'post',
        data: params
    })
}

/**
 * @function UpdateOrder
 * @params id, json data
 * @return {*}
 */
const UpdateOrderService = (id:number, params:any) => {
    return request({
        url: `order/${id}`,
        method: 'put',
        data: params
    })
}

/** 
 * @function DeleteProduct
 * @param id
 * @return {*}
 * 
 */
const DeleteProductService = (id:number) => {
    return request({
        url: `order/${id}`,
        method: 'delete'
    })
}

export default {
    GetOrdersService,
    // GetOrdersSearchService,
    GetOrderByIDService,
    CreateOrderService,
    UpdateOrderService,
    DeleteProductService
}