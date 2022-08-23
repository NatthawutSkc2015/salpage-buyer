import request from '../utils/request'

/**
 * @function GetProducts
 * @params string
 * @return {*}
 */

const GetProductsService = (queryString:string) => {
    return request({
        url:    'product?pagi=yes' + queryString,
        method: 'get'
    })
}

/**
 * @function GetProductsSearch
 * @params json data
 * @return {*}
 */
const GetProductsSearchService = (queryString:string) => {
    return request({
        url:    'product' + queryString,
        method: 'get'
    })
}

/**
 * @function GetProductByID
 * @params json data
 * @return {*}
 */
const GetProductByIDService = (id:number) => {
    return request({
        url: `product/${id}`,
        method: 'get'
    })
}

/**
 * @function CreateProduct
 * @params json data
 * @return {*}
 */
const CreateProductService = (params:any) => {
    return request({
        url: 'product',
        method: 'post',
        data: params
    })
}

/**
 * @function UpdateProduct
 * @params id, json data
 * @return {*}
 */
const UpdateProductService= (id:number, params:any) => {
    return request({
        url: `product/${id}`,
        method: 'put',
        data: params
    })
}

/**
 * @function DeleteProduct
 * @param id
 * @return {*}
 */
const DeleteProductService = (id:number) => {
    return request({
        url: `product/${id}`,
        method: 'delete'
    })
}

export default {
    GetProductsService,
    GetProductsSearchService,
    GetProductByIDService,
    CreateProductService,
    UpdateProductService,
    DeleteProductService
}