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
    let numberOfNeighbors = 0;
    
    const x = coordinates[1];
    const y = coordinates[0];

    const yLength = gameTable.length;
    const xLength = gameTable[y].length;

    if (x - 1 > -1 && gameTable[y][x - 1].state == 1) {
      numberOfNeighbors++;
    }
    if (x + 1 < xLength && gameTable[y][x + 1].state == 1) {
      numberOfNeighbors++;
    }
    if (y - 1 > -1 && gameTable[y - 1][x].state == 1) {
      numberOfNeighbors++;
    }
    if (y + 1 < yLength && gameTable[y + 1][x].state == 1) {
      numberOfNeighbors++;
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
        const numberOfNeighbors = this.getCellNeighborCount([y, x], newGameTable);
        newGameTable[y][x] = {
          state: newGameTable[y][x].state,
          other: {
            numberOfNeighbors: numberOfNeighbors
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
    const oldTable = this.getGameTable();
    const newTable = this.getGameTable();

    const yLength = oldTable.length;
    for (let y = 0; y < yLength; y++) {
      const xLength = oldTable[y].length;
      for (let x = 0; x < xLength; x++) {
        const numberOfNeighbors = this.getCellNeighborCount([y, x], oldTable);

        // applying new state
        // if dead
        switch (oldTable[y][x].state) {
          case 0:
            if (numberOfNeighbors == 3) {
              newTable[y][x] = {
                state: 1,
                other: {
                  numberOfNeighbors: numberOfNeighbors
                }
                
              }
            }
            else {
              newTable[y][x] = {
                state: 0,
                other: {
                  numberOfNeighbors: numberOfNeighbors
                }
              }
            }
            break;
          case 1:
            if (numberOfNeighbors < 2) {
              newTable[y][x] = {
                state: 0,other: {
                  numberOfNeighbors: numberOfNeighbors
                }
              }
            } else if (numberOfNeighbors == 2 ) {
              newTable[y][x] = {
                state: 1,
                other: {
                  numberOfNeighbors: numberOfNeighbors
                }
              }
            } else if (numberOfNeighbors > 2) {
              newTable[y][x] = {
                state: 0,
                other: {
                  numberOfNeighbors: numberOfNeighbors
                }
              }
            }
            break;
          default:
            break;
        }
      }
    }

    this.setGameTable(newTable);
    console.log('next turn stavsya');
  }
}
