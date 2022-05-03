<script setup lang="ts">
import { particles } from '@/utils/particles-config.ts';
import { ref } from 'vue';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getVerifiCode, login } from '@/api/login.ts';
//import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user.ts';
import { useRouter } from 'vue-router';

const githubLink: string = 'https://github.com/Kidoi';
let loging = ref<boolean>(false);
const router = useRouter();
const userStore = useUserStore();

/*
    验证码
*/
let verifiCode = ref<string>('');
let verifiImg = ref<string>('');
const changeVerifiCode = (): void => {
    getVerifiCode().then(res => {
        let bytes: any = new Uint8Array(res);
        let data: string = "";
        let len: number = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            data += String.fromCharCode(bytes[i]);
        }
        verifiImg.value = "data:image/png;base64," + window.btoa(data);
    })
}
changeVerifiCode();
/*
    登录
*/
let username = ref<string>('');
let password = ref<string>('');
interface loginForm{
    username: string,
    password: string,
    verifiCode: string
};
const handleLogin = (): void => {
    /*
        待填坑：
            表单验证
    */
   const data: loginForm = { 
        username: username.value,
        password: password.value,
        verifiCode: verifiCode.value
    };
   login(data).then(res => {
       jumpToHome(res.data.token);
   });
}
/*
    跳转
*/
const { commitToken } = userStore;
async function jumpToHome(token: string){
    await commitToken(token);
    message.success('登录成功！');
    router.push('/home');
}
</script>

<template>
    <div class="login-container">
        <h1 class="login-container__header">UD Management System</h1>

        <a-card :bordered="false" class="login-container__form">
            <a-form class="login-container__form--body"
            >
                <a-form-item>
                    <a-input class="login-container__form__input"
                            v-model:value="username"
                            placeholder="账号"
                    >
                        <template #prefix>
                            <user-outlined type="user"/>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input-password 
                            class="login-container__form__input"
                            v-model:value="password" 
                            placeholder="密码"
                    >
                        <template #prefix>
                            <lock-outlined/>
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-input
                            class="login-container__form__input"
                            v-model:value="verifiCode"
                            placeholder="验证码"
                    >
                        <template #suffix>
                            <img class="login-container__form__verifiCode"
                                :src="verifiImg" 
                                @click="changeVerifiCode"/>
                        </template>
                    </a-input>
                </a-form-item>

                <a-button class="login-container__form__btn"
                            type="primary"
                            @click="handleLogin"
                >登录</a-button>

                <div class="login-container__form__footer">
                    <a-checkbox class="login-container__form__des--normal" v-model:checked="loging">自动登录</a-checkbox>
                    <a class="login-container__form__des--trans">注册账号</a>
                </div>
            </a-form>
        </a-card>

        <div class="login-container__footer">
            <a class="login-container__footer__des" :href="githubLink" target="_blank"><github-outlined /> Yaqi Chen</a>
            <p class="login-container__footer__des">&copy; 2022 All rights reserved.</p>
        </div>

        <Particles id="tsparticles" :options="particles"></Particles>
    </div>
</template>

<style scoped lang="less">
@import "@/style/common.less";
.uplayer{
    position: relative;
    z-index: 10;
}

.login-container{
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__header{
        .uplayer();
        color: white;
        margin-bottom: 50px;
    }

    &__form{
        .uplayer();
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 50px;

        &--body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
        }
        
        &__input{
            width: 280px;
        }

        &__btn{
            margin-bottom: 20px;
        }

        &__footer{
            display: flex;
            justify-content: space-between;
        }

        &__des--normal{
            color: @gray;
        }

        &__des--trans{
            color: @blue;
            margin-bottom: 0;
        }

        &__verifiCode{

            &:hover{
                cursor: pointer;
            }
        }
    }


    &__footer{
        position: fixed;
        bottom: 20px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__des{
            color: @gray;
            font-size: 13px;
            text-align: center;
            margin-bottom: 0;
        }
    }
    

    #tsparticles{
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>