export type GameTableField = {
    state: 0 | 1;
    other?: {
        numberOfNeighbors?: number
    }    
}
export type GameTable = Array<Array<GameTableField>>;

export type coordinates2D = [number, number]