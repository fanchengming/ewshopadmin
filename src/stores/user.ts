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
            return this.avatar;
        },
        getNickName():string {
            return this.username;
        },
        getPermissions():string[] {
            return this.permissions;
        },
        getUserInfo():object {
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
                console.log(response);
                this.setUserInfo(response);
                this.setAvatar(response.data.avatar);
                this.setUserName(response.data.name);
            } catch(error) {
                console.log(error);
            }
        }
    },
})