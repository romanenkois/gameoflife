<template scoped>
    <div
    class="field"
    :class="{
        'state-0': fieldData.state === 0,
        'state-1': fieldData.state === 1
    }"
    >
        <div class="placeholder"></div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GameField',
    props: {
        fieldData: {
            type: {
                scope: Number,
            },
            required: true
        }
    }
}
</script>

<style scoped>
.state-0 {
    background-color: #fff;
}
.state-1 {
    background-color: #000;
}
.placeholder {
    width: 100%;
    height: 100%;
}
</style>