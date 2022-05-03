<script setup lang="ts">

</script>

<template>
    <a-empty class="empty-container">
        <template #description>
            <span>抱歉，未找到相应的页面。</span>
        </template>
    </a-empty>
</template>

<style lang="less" scoped>
.empty-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>