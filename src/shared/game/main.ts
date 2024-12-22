import { GameTable, GameTableField } from "@models/game.models";

export class Game {
  private gameTable: GameTable = [];
  public getGameTable(): GameTable {
    return this.gameTable.slice();
  }
  public getGameField(coordinates: [number, number]): GameTableField {
    return { ...this.gameTable[coordinates[0]][coordinates[1]] };
  }
  private setGameTable(newGameTable: GameTable): void {
    this.gameTable = newGameTable;
  }
  private setGameField(coordinates: [number, number], fieldData: GameTableField ) {
    this.gameTable[coordinates[0]][coordinates[1]] = fieldData;
  }
  private getCellNeighborCount(coordinates: [number, number], gameTable: GameTable) {
    gameTable = this.getGameTable();
    let numberOfNeighbors = 0;
    
    const x = coordinates[1];
    const y = coordinates[0];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const neighborY = y + i;
      const neighborX = x + j;
      if (
        neighborY >= 0 &&
        neighborY < gameTable.length &&
        neighborX >= 0 &&
        neighborX < gameTable[0].length
      ) {
        numberOfNeighbors += gameTable[neighborY][neighborX].state;
      }
      }
    }

    return numberOfNeighbors;
  }
  public generateEmptyGameTable(XLength: number, YLength: number): void {
    const newGameTable: GameTable = [];
    for (let i = 0; i < XLength; i++) {
      newGameTable[i] = [];
      for (let j = 0; j < YLength; j++) {
        newGameTable[i][j] = {
          state: 0,
          other: {
            numberOfNeighbors: 0
          }
        };
      }
    }

    this.setGameTable(newGameTable);
  }
  public generateRandomGameTable(XLength: number, YLength: number): void {
    const newGameTable: GameTable = [];
    for (let i = 0; i < XLength; i++) {
      newGameTable[i] = [];
      for (let j = 0; j < YLength; j++) {
        newGameTable[i][j] = {
          state: Math.random() < 0.5 ? 0 : 1,
        };
      }
    }

    // 123123123123
    const yLength = newGameTable.length;
    for (let y = 0; y < yLength; y++) {
      const xLength = newGameTable[y].length;
      for (let x = 0; x < xLength; x++) {
        // const numberOfNeighbors = this.getCellNeighborCount([y, x], newGameTable);
        newGameTable[y][x] = {
          state: newGameTable[y][x].state,
          other: {
            numberOfNeighbors: 0
          }
        } 
      }
    }

    this.setGameTable(newGameTable);
  }

  public changeFieldState(coordinates: [number, number]): void {
    const newGameField = this.getGameField(coordinates);
    newGameField.state == 0 ? newGameField.state = 1 : newGameField.state = 0; 
    this.setGameField(coordinates, newGameField);
  }

  public nextTurn(): void {
    // we need two copies, couse the new table will have it changes based on old state
    // so using like copy of it, it would be rendered in one "turn"
    const oldTable = this.getGameTable().slice();
    const newTable = this.getGameTable().slice();

    const yLength = oldTable.length;
    for (let y = 0; y < yLength; y++) {
      const xLength = oldTable[y].length;
      for (let x = 0; x < xLength; x++) {
        const numberOfNeighbors = this.getCellNeighborCount([y, x], oldTable);
        const cellData = newTable[y][x];
        
        switch (cellData.state) {
          case 0:
            if (numberOfNeighbors == 3) {
              cellData.state = 1;
              cellData.other = cellData.other || {};
              cellData.other.numberOfNeighbors = numberOfNeighbors;
            }
            else {
              cellData.other = cellData.other || {};
              cellData.other.numberOfNeighbors = numberOfNeighbors;
            }
            break;
          case 1:
            if (numberOfNeighbors < 2) {
              cellData.state = 0;
              cellData.other = cellData.other || {};
              cellData.other.numberOfNeighbors = numberOfNeighbors;
            } else if (numberOfNeighbors == 2 || numberOfNeighbors == 3 ) {
              cellData.state = 1;
              cellData.other = cellData.other || {};
              cellData.other.numberOfNeighbors = numberOfNeighbors;
            } else if (numberOfNeighbors > 3) {
              cellData.state = 0;
              cellData.other = cellData.other || {};
              cellData.other.numberOfNeighbors = numberOfNeighbors;
            }
            break;
          default:
            console.error('Unknown cell state');
            break;
        }

        newTable[y][x] = cellData;
      }
    }

    this.setGameTable(newTable);
    console.log('next turn stavsya');
  }
}
