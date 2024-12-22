<template scoped>
    <div
    class="field"
    :class="{
        'state-0': fieldData.state === 0,
        'state-1': fieldData.state === 1
    }"
    >
        <div class="placeholder">
            <p
            class="numberOfNeighbors"
            >{{fieldData.other.numberOfNeighbors}}</p>
        </div>
    </div>
</template>

<script lang="ts">
// import { coordinates2D } from '@/shared/models/game.models';

export default {
    name: 'GameField',
    props: {
        fieldCoordinates: {
            // type: Object,
            require: true
        },
        fieldData: {
            type: {
                scope: Number,
                other: Object
            },
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.state-0 {
    background-color: #fff;
}
.state-1 {
    background-color: #000;
}
.field {
    cursor: pointer;
    .placeholder {
        width: 100%;
        height: 100%;
        .numberOfNeighbors {
            color: red;
        }
    }
}

</style>