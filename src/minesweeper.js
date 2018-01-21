const neighbors = (i, w, h) => {
  const lastCol = (i % w === w - 1);
  const firstCol = (i % w === 0);
  const lastRow = i + w >= (h * w);
  const firstRow = i - w < 0;
  let n = [];

  if (!firstRow) {
    n = n.concat([i-w])
    if (!firstCol) { n = n.concat([i-w-1]) }
    if (!lastCol) { n = n.concat([i-w+1]) }
  }

  if (!lastRow) {
    n = n.concat([i+w])
    if (!firstCol) { n = n.concat([i+w-1]) }
    if (!lastCol) { n = n.concat([i+w+1]) }
  }

  if (!firstCol) { n = n.concat([i-1]) }
  if (!lastCol) { n = n.concat([i+1]) }

  return n;
}

const uniqueFilter = (val, i, arr) => {
  return arr.indexOf(val) === i;
}

const emptyNeighbors = (i, state) => {
  return neighbors(i, state.width, state.height)
    .filter((n) => { return !isBomb(n, state) })
}

const revealed = (i, state) => {
 return state.revealed.indexOf(i) !== -1;
}

const isBomb = (i, state) => {
 return state.bombs.indexOf(i) !== -1;
}

const bombCount = (i, state) => {
  return neighbors(i, state.width, state.height)
    .filter((n) => { return state.bombs.indexOf(n) !== -1; })
    .length
}

const newState = (width, height, bombs) => {
  const size = width * height;
  let state = { width: width, height: height, gameEnder: null, revealed: [], bombs: [] };

  while (0 < bombs) {
    let i =  Math.floor(Math.random() * size);

    if(state.bombs.indexOf(i) === -1) {
      state.bombs = state.bombs.concat([i]);
      bombs -= 1;
    }
  }

  return state;
};

export { uniqueFilter, newState, bombCount, emptyNeighbors, revealed, isBomb };
