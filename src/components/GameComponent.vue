<template>
    <div class="game-wrapper">
        <div class="game-menu">
            <GameMenu
                @generate-new-random-game="regenerateNewRandomGame()"
                @generate-new-empty-game="regenerateNewEmptyGame()"
                @pass-next-turn="nextTurn()"
            >
            </GameMenu>
        </div>
        <div class="game-table">
            <GameTable
                :table-data="tableData"
                @field-clicked="changeFieldState"
                >
            </GameTable>
        </div>
    </div>
</template>

<script lang="ts">
import { Game } from '@/shared/game/main';
import GameMenu from './GameMenu.vue';
import GameTable from './GameTable.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
    name: 'GameComponent',
    components: {
        GameTable,
        GameMenu,
    },
    data() {
        return {
            game: new Game,
            tableData: [] as any[],
            xLength: 40,
            yLength: 80,
        }
    },
    created() {
        // let game = new Game;
        this.game.generateRandomGameTable(this.xLength, this.yLength);
        this.tableData = this.game.getGameTable()
    },
    methods: {
        regenerateNewRandomGame() {
            this.game.generateRandomGameTable(this.xLength, this.yLength);
            this.tableData = this.game.getGameTable();
        },
        regenerateNewEmptyGame() {
            this.game.generateEmptyGameTable(this.xLength, this.yLength);
            this.tableData = this.game.getGameTable();
        },
        nextTurn() {
            this.game.nextTurn();
            this.tableData = this.game.getGameTable();
        },
        changeFieldState(coordinates: [number, number]) {
            this.game.changeFieldState(coordinates);
        }
    }
})
</script>

<style lang="sass" scoped>

</style>