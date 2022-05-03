<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

let key = ref<string>('');
key = computed(()=> route.path);
</script>

<template>
    <section class="app-main">
        <router-view :key="key" v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </section>
</template>

<style scoped lang="less">
.app-main{
    padding: 20px;
    
}
</style>