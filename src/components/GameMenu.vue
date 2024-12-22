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
        <div class="item">
            <button
                class="btn"
                @click.prevent="pauseTimer()">
                    AutoTurn
                    <span v-if="isTimerPaused">Start</span>
                    <span v-if="!isTimerPaused">Pause</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'GameMenu',
    emits: ['generateNewRandomGame', 'generateNewEmptyGame', 'passNextTurn'],
    data() {
        return {
            curentTick: 0,
            maxTick: 10,
            isTimerPaused: true
        }
    },
    methods: {
        generateNewRandomGame() {
            this.$emit('generateNewRandomGame')
        },
        generateNewEmptyGame() {
            this.$emit('generateNewEmptyGame')
        },
        pauseTimer() {
            this.isTimerPaused = !this.isTimerPaused
        },
        passNextTurn() {
            this.$emit('passNextTurn')
        }
    },
    watch: {
        isTimerPaused(oldValue, newValue) {
            if (!newValue) {
                setInterval(() => {
                    this.$emit('passNextTurn')
                }, this.maxTick)
            }
        }
    }
})
</script>

<style lang="scss" scoped>
// * {
//     outline: 1px red solid;
// }
.game-menu {
    padding: 8px 42px;

    display: flex;
    flex-wrap: wrap;
    gap: 8px 42px;

    .btn {
        padding: 8px;
    }
}
</style>