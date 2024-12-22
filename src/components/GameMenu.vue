<template>
    <div class="game-menu">
        <div class="item">
            <button 
                class="btn"
                @click.prevent="generateNewRandomGame()"
                >
                New Random Game
            </button>
        </div>
        <div class="item">
            <button 
                class="btn"
                @click.prevent="generateNewEmptyGame()"
                >
                New Empty Game
            </button>
        </div>
        <div class="item">
            <button 
                class="btn"
                @click.prevent="passNextTurn()"
                >
                Next Turn
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'GameMenu',
    emits: ['generateNewRandomGame', 'generateNewEmptyGame', 'passNextTurn'],
    methods: {
        generateNewRandomGame() {
            this.$emit('generateNewRandomGame')
        },
        generateNewEmptyGame() {
            this.$emit('generateNewEmptyGame')
        },
        passNextTurn() {
            this.$emit('passNextTurn')
        }
    }
})
</script>

<style lang="scss" scoped>
.game-menu {
    padding: 12px 42px;

    display: flex;
    gap: 42px;
}
</style>