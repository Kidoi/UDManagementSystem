import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth.ts'
import { resetRouter } from '@/router/index.ts'


// export const useUserStore = defineStore({
//     id: 'user',
//     state: ()=>{
//         return {
//             token: ''
//         }
//     },
//     getters: {
        
//     },
//     actions: {
//         resetState(){
//             Object.assign(this, getDefaultUserState);
//         },
//         setToken(token: string){
//             console.log('set')
//             this.$patch({token});
//             setToken(token);
//             console.log('set')
//         },
//         test(){
//             console.log(111)
//         },
//         logout(){
//             removeToken();
//             resetRouter();
//             this.resetState();
//         }
//     }
// });
export const useUserStore = defineStore('user', ()=>{
    const state = ref<object>({
        token: ''
    });
    function resetState(){
        // @ts-ignore
        state.value.token = '';
    }
    function commitToken(token: string){
        // @ts-ignore
        state.value.token = token;
        setToken(token);
    }
    async function logout(){
        await removeToken();
        await resetRouter();
        await resetState();
    }
    return { 
        state,
        commitToken,
        logout 
    };
});