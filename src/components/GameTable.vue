<template>
    <div class="gameTable">
        <table cellspacing="0" cellpadding="0">
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                <td v-for="(field, fieldIndex) in row" :key="fieldIndex">
                    <GameField :field-data="field"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import GameField from './GameField.vue';

(()=>{
    console.log('GameTable component loaded');
})();

export default {
    name: 'GameTable',
    components: {
        GameField
    },
    props: {
        tableData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.gameTable {
    // $table-size: calc(600px);
    // $field-size: calc($table-size/10);
    $field-size: 20px;

    table {
        border-collapse: collapse;

        tr {
            td {
                width: $field-size;
                height: $field-size;
                max-width: $field-size;
                max-height: $field-size;

                overflow: hidden;
                box-sizing: border-box;

                .field {
                    width: $field-size;
                    height: $field-size;
                    max-width: $field-size;
                    max-height: $field-size;

                    overflow: hidden;
                    box-sizing: border-box;
                }
            }
        }
    }
} 
</style>