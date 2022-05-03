import request from '@/utils/request'

export function getVerifiCode(){
    return request.get({
        url: '/system/getVerifiCodeImage',
        responseType: 'arraybuffer'
    });
}

export function login(data: any){
    return request.post({
        url: '/system/login',
        data: data
    });
}

export function getInfo(){
    return request.get({
        url: '/system/getInfo'
    })
}