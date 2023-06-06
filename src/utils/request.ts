// 1.引入axios依赖值
import axios from 'axios';
// 2.axios创建对象(
const request = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    timeout: 8000
})
// 3.定义拦截器，请求拦截器，请求发送出去之前触发的
request.interceptors.request.use(
    config => {
        // config 接口请求的配置信息
        const token: string | null = localStorage.getItem('token');
        if (token !== '') {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        
        return config;
    },
    error => {
        // 报错的时候出一个报错信息
        return Promise.reject(error);
    }
)
// 4.定义响应拦截器，响应拦截器，请求发送出去之后触发的
request.interceptors.response.use(
    response => {

        return response;
    },
    error => {
        // 报错的时候出一个报错信息
        const {response} = error;
        switch (response.status) {
            case 401:
                window.$message.error('登录失败，请重新登录')
                localStorage.removeItem('token');
                setTimeout(() => {
                    window.location.href = '/login'
                },500)
                break;
            case 404:
                window.$message.error('接口不存在')
                break;
            case 500:
            case 502:
                window.$message.error('网络异常')
                break;
            case 422:
                console.log(response)
                let msg = response.data.errors[Object.keys(response.data.errors)[0]][0]
                window.$message.error(msg)
                // window.$message.error('参数错误')
                break;
        }
        return Promise.reject(error);
    }
)

// 5.抛出对象的信息
export default request;