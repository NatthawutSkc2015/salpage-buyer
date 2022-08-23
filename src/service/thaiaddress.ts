import provinces    from '../utils/thaiaddress/provinces.json'
import districts    from '../utils/thaiaddress/districts.json'
import sub_district from '../utils/thaiaddress/subDistricts.json'
import zipcode      from '../utils/thaiaddress/zipcodes.json'

const GetProvincesService = (id?:number) => {
    let provs:any = provinces.map((item:any) => {
        item.value = item.PROVINCE_ID
        item.label = item.PROVINCE_NAME
        return item
    })
    if(id){
        return provs.filter((item:any) => item.value == id)
    }else{
        return provs
    }
}

const GetDistrictsService = (id?:number) => {
    let dists:any = districts.map((item:any) => {
        item.value = item.DISTRICT_ID
        item.label = item.DISTRICT_NAME
        return item
    })
    if(id){
        return dists.filter((item:any) => item.PROVINCE_ID == id)
    }else{
        return dists.filter((item:any) => item.PROVINCE_ID == 1)
    }
}

const GetSubDistrictsService = (id?:number) => {
    let subdists:any = sub_district.map((item:any) => {
        item.value = item.SUB_DISTRICT_ID
        item.label = item.SUB_DISTRICT_NAME
        return item
    })
    if(id){
        return subdists.filter((item:any) => item.DISTRICT_ID == id)
    }else{
        return subdists.filter((item:any) => item.DISTRICT_ID == 1)
    }
}

const GetZipcodesService = (pv_id:any,dt_id:any,sdt_id:any) => {
    if(pv_id != '' && dt_id != '' && sdt_id != ''){
        let zc:any = zipcode.find(item => item.PROVINCE_ID == pv_id && item.DISTRICT_ID == dt_id && item.SUB_DISTRICT_ID)
        if(zc){
            return zc.ZIPCODE
        }else{
            return ''
        }
    }else{
        return ''
    }
}

export default {
    GetProvincesService,
    GetDistrictsService,
    GetSubDistrictsService,
    GetZipcodesService
}