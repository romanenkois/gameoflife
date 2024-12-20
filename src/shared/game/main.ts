import { GameTable } from "@models/game.models";

// const defaultField: GameTableField = {
//   state: 0,
// };

export class Game {
  // constructor() {
  // }

  private gameTable: GameTable = [];
  public getGameTable(): GameTable {
    return this.gameTable;
  }
  public setGameTable(newGameTable: GameTable): void {
    this.gameTable = newGameTable;
  }

  public genareteRandomGameTable(XLength: number, YLength: number): void {
    const newGameTable: GameTable = [];
    for (let i = 0; i < XLength; i++) {
      newGameTable[i] = [];
      for (let j = 0; j < YLength; j++) {
        newGameTable[i][j] = {
            state: Math.random() < 0.5 ? 0 : 1,
        }
      }
    }
    this.setGameTable(newGameTable);
  }
}
