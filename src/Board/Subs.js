export default class Submarines {
  constructor() {
    this._sub5 = [[], [], [], [], []];
    this._sub4 = [[], [], [], []];
    this._sub3 = [[], [], []];
    this._sub2 = [[], []];
    this._sub = [[]];
  }

  addsub5(newTable) {
    const row = Math.floor(Math.random() * 3 + newTable.length - 4);
    const col = Math.floor(Math.random() * 3 + 6);
    if (col >= 6 && row >= 6) {
      newTable[row][col] = true;
      this._sub5[0].push(row);
      this._sub5[0].push(col);
      newTable[row][col - 1] = true;
      this._sub5[1].push(row);
      this._sub5[1].push(col - 1);
      newTable[row][col - 2] = true;
      this._sub5[2].push(row);
      this._sub5[2].push(col - 2);
      newTable[row][col - 3] = true;
      this._sub5[3].push(col - 3);
      this._sub5[3].push(col);
      newTable[row][col - 4] = true;
      this._sub5[4].push(row);
      this._sub5[4].push(col - 4);
    }
    return newTable;
  }

  addsub4(newTable) {
    const row = Math.floor(Math.random() * 6);
    const col = Math.floor(Math.random() * 10);
    if (row > 3) {
      if (newTable[row][col] !== true && newTable[row - 1][col] !== true
         && newTable[row - 2][col] !== true
        && newTable[row - 3][col] !== true) {
        newTable[row][col] = true;
        this._sub4[0].push(row);
        this._sub4[0].push(col);
        newTable[row - 1][col] = true;
        this._sub4[1].push(row - 1);
        this._sub4[1].push(col);
        newTable[row - 2][col] = true;
        this._sub4[2].push(row - 2);
        this._sub4[2].push(col);
        newTable[row - 3][col] = true;
        this._sub4[3].push(row - 3);
        this._sub4[3].push(col);
      }
    } else if (row <= 3 && col <= 4) {
      newTable[row][col] = true;
      this._sub4[0].push(row);
      this._sub4[0].push(col);
      newTable[row][col + 1] = true;
      this._sub4[1].push(row);
      this._sub4[1].push(col + 1);
      newTable[row][col + 2] = true;
      this._sub4[2].push(row);
      this._sub4[2].push(col + 2);
      newTable[row][col + 3] = true;
      this._sub4[3].push(row);
      this._sub4[3].push(col + 3);
    } else if (row <= 3 && col > 4) {
      newTable[row][col] = true;
      this._sub4[0].push(row);
      this._sub4[0].push(col - 1);
      newTable[row][col - 1] = true;
      this._sub4[1].push(row);
      this._sub4[1].push(col - 1);
      newTable[row][col - 2] = true;
      this._sub4[2].push(row);
      this._sub4[2].push(col - 2);
      newTable[row][col - 3] = true;
      this._sub4[2].push(row);
      this._sub4[2].push(col - 3);
    }

    return newTable;
  }

  addsub3(newTable) {
    this._sub3 = 0;
    let row = Math.floor(Math.random() * newTable.length);
    let col = Math.floor(Math.random() * 8);
    while (newTable[row][col] === true || newTable[row][col + 1] === true
      || newTable[row][col + 2] === true) {
      row = Math.floor(Math.random() * newTable.length);
      col = Math.floor(Math.random() * newTable.length);
    }
    console.log(row, col);
    newTable[row][col] = true;
    newTable[row][col + 1] = true;
    newTable[row][col + 2] = true;
    return newTable;
  }

  addsub2(newTable) {
    this._sub3 = 0;
    let row = Math.floor(Math.random() * newTable.length - 1);
    let col = Math.floor(Math.random() * newTable.length);
    while (newTable[row][col] === true || newTable[row + 1][col] === true) {
      row = Math.floor(Math.random() * newTable.length);
      col = Math.floor(Math.random() * newTable.length);
    }
    newTable[row][col] = true;
    this._sub2[0].push(row);
    this._sub2[0].push(col);
    newTable[row + 1][col] = true;
    this._sub2[1].push(row + 1);
    this._sub2[1].push(col);
    return newTable;
  }

  addsub(newTable) {
    this._sub3 = 0;
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while (newTable[row][col] === true) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }
    console.log(row, col);
    newTable[row][col] = true;
    this._sub4[0].push(row);
    this._sub4[0].push(col);
    return newTable;
  }
}
