<template>
    <div class="card">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'card'
};
</script>

<style lang="less" scoped>
.card {
    height: 100%;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
}
</style>
