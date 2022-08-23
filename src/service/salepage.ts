import request from '../utils/request'

/**
 * @function GetSalepages
 * @params json data
 * @return {*}
 */
const GetSalepagesService = (queryString:string) => {
    return request({
        url : 'salepage' + queryString
    })
}

export default{
    GetSalepagesService
}

