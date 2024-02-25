import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { ElMessageBox,ElMessage } from 'element-plus'

const service=axios.create({
    baseURL:"http://localhost:5432",
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

service.interceptors.request.use(//拦截器，use()有两个参数，分别是请求之前和失败时的回调函数，前面那个变量是参数名,表示当前请求的配置对象/错误对象
    (config)=>{
        if(store.getters.token){
            config.headers["Authorization"]=getToken();
            return config;
        }
    },
    (err)=>{
        //do something with request error
        console.log(err); // for debug
        return Promise.reject(err);
    }
)
service.interceptors.response.use(
    response=>{
        const res=response.data;
        if(res.code!==200){
            ElMessage({
                showClose: true,
                message: res.message || 'Oops! There is an error!',
                type: 'error',
            })
            if(res.code===404){// to re-login
                ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again',
                    'Confirm to re-login',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                    }.then(() => {
                        ElMessage({
                            type: 'success',
                            message: 'Please login',
                        })
                        store.dispatch('user/resetToken').then(() => {
                            location.reload()
                        })
                    }).catch(() => {
                        ElMessage({
                            type: 'info',
                            message: 'request canceled',
                        })
                    })
                ).then()
            }
            return Promise.reject(new Error(res.message || 'Error'))
        }

        else{
            return res;
        }
    },
    error => {
        console.log('err'+error)
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service