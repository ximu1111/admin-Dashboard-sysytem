import request from '../utils/requset'

export const fetchData = () =>{
    return request({
        url: './mock/table.json',
        method: 'get'
    })
}