import { defineStore } from "pinia";
import {login,user} from '@/api/auth';

export interface IUserState {
    token: string;
    username: string;
    avatar:string;
    permissions: string[];
    info: object;
}

export const useUserStore = defineStore({
    id:'app-user',
    state:():IUserState => ({
        token:localStorage.getItem('token') || '',
        username:'',
        avatar:'',  
        permissions:[],
        info:{},
    }),
    getters:{
        getToken():string {
            return this.token;
        },
        getAvatar():string {
            console.log(this)
            return this.avatar;
        },
        getUserName():string {
            // console.log(222)
            // console.log(this)
            // console.log(this.username)
            return this.username;
        },
        getPermissions():string[] {
            return this.permissions;
        },
        getUserInfo():object {
            // 判断 this.info 是否是空对象
            // if(this.info?.id){
            //     console.log('12312312')
            // }else {
            //     console.log('456')
            // }
            if(!this.info?.id) {
                this.getUser();
            }
            return this.info;
        }
    },
    actions:{
        setToken(token:string) {
            localStorage.setItem('token', token);
            this.token = token;
        },
        setAvatar(avatar:string) {
            this.avatar = avatar;
        },
        setUserInfo(info:object) {
            this.info = info;
        },
        setUserName(username:string) {
            this.username = username;
         },
        setPermissions(permissions:string[]) {
            this.permissions = permissions;
        },
        async login(userInfo:Object) {
            try {
                const response = await login(userInfo);
                if(response.data.access_token) {
                    console.log(response);
                    this.setToken(response.data.access_token);
                    
                }
                this.getUser();
            } catch (error) {
                // console.log(error);
            }
        } ,
        async getUser(){
            try {
                const response = await user();
                // console.log(response);
                this.setUserInfo(response);
                this.setAvatar(response.data.avatar_url);
                this.setUserName(response.data.name);
                return response;
            } catch(error) {
                console.log(error);
            }
        }
    },
})