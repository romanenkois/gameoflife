<template>
    <div class="game-wrapper">
        <div class="game-menu">
            <GameMenu />
            asdassasdsadasd
        </div>
        <div class="game-table">
            <GameTable :table-data="tableData" />
            dasdas
        </div>
    </div>
</template>

<script lang="ts">
import { Game } from '@/shared/game/main';
import GameMenu from './GameMenu.vue';
import GameTable from './GameTable.vue';

let game = new Game;
game.genareteRandomGameTable(10, 20);
console.log(game.getGameTable());

export default {
    name: 'GameComponent',
    components: {
        GameTable,
        GameMenu,
    },
    data() {
        return {
            tableData: game.getGameTable()
        }
    },
    // methods: {
    //     regenareteGameTable() {
    //         console.log('regenareteGameTable');
    //         game.genareteRandomGameTable(10, 20);
    //     } 
    // }
}
</script>

<style lang="sass" scoped>

</style>