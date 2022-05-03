<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { DashboardOutlined, ProfileOutlined, BarChartOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { getInfo } from '@/api/login.ts';
import { useUserStore } from '@/store/user.ts';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

/*
    计算顶部菜单项
*/
let routes = computed(()=>{
    return  Array.prototype.slice.call(router.getRoutes()).filter((r)=>{
        return r.meta.hidden!==true;
    });
});
/*
    计算当前路由
*/
let activeRoute = ref([]);
activeRoute.value.push(route.path);
watch(activeRoute, (newValue, oldValue)=>{
    router.replace(newValue[0]);
});
/*
    获取用户信息
*/
let userName = ref<string>('用户名');
let avatar = ref<string>('');
function getUserInfo(): void{
    getInfo().then(res=>{
        userName.value = res.data.name;
        avatar.value = res.data.avatar;
    })
}
getUserInfo();
/*
    跳转到个人中心
*/
function jumpToPersonalCenter():void {

}
/* 
    退出登录
*/
const { logout } = useUserStore();
async function jumpToLogOut(){
    await logout();
    router.replace('/login');
}




</script>

<template>
    <div class="bar">
        <div class="left-menu">
            <a-menu 
                v-model:selectedKeys="activeRoute"
                mode="horizontal"
            >
                <a-menu-item
                    v-for="route in routes"
                    :key="route.path"
                >
                    <template #icon>
                        <dashboard-outlined v-if="route.meta.title === '主页'"/>
                        <profile-outlined v-else-if="route.meta.title === '设备详情' "/>
                        <bar-chart-outlined v-else-if="route.meta.title === '数据详情'"/>
                    </template>
                    {{ route.meta.title }}
                </a-menu-item>
            </a-menu>
        </div>
        <div class="right-menu">
            <question-circle-outlined class="right-menu__item"/>
            <bell-outlined class="right-menu__item"/>
            
            <a-dropdown>
                <div class="right-menu__item">
                    <a-avatar size="small" class="right-menu__avatar" :src="avatar"/>
                    <span class="right-menu__username">{{ userName }}</span>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item class="menu__item--hover" @click="jumpToPersonalCenter">个人中心</a-menu-item>
                        <a-menu-item class="menu__item--hover" @click="jumpToLogOut">退出登录</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<style scoped lang="less">
@import '@/style/common.less';
.bar{
    height: 50px;
    padding: 0 20px 0 10px;
    border-bottom: 1px solid @border-line;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-menu{
        display: inline-block;
        width: 50%;
    }

    .right-menu{
        display: flex;
        align-items: center;

        &__item{
            margin-left: 20px;
            cursor: pointer;
        }


        &__avatar{
            margin-right: 5px;
        }

        &__username{
            font-weight: bold;
        }
        
    }
}
</style>