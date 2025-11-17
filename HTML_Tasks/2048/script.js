const SIZE = 4;
let grid = [];
let score = 0;
let best = Number(localStorage.getItem('best2028') || 0);

const $board = $('#board');
const $newGame = $('#new-game');
const $score = $('#score');
const $best = $('#best');

function init() {
  score = 0;
  $score.text(score);
  $best.text(best);

  grid = Array.from({length: SIZE}, () => Array(SIZE).fill(0));
  spawn(); spawn();
  render();
}

function spawn() {
  const empty = [];
  for (let r=0;r<SIZE;r++) {
    for (let c=0;c<SIZE;c++) {
      if (!grid[r][c]) empty.push([r,c]);
    }
  }
  if (!empty.length) return;
  const [r,c] = empty[Math.floor(Math.random()*empty.length)];
  grid[r][c] = Math.random()<0.9 ? 2 : 4;
}

function render() {
  for (let r=0;r<SIZE;r++) {
    for (let c=0;c<SIZE;c++) {
      const idx = r*SIZE+c;
      const $cell = $board.find(`.cell[data-i="${idx}"]`);
      const val = grid[r][c];

      $cell.removeClass().addClass('cell');

      if (val) {
        $cell.addClass('v'+val);
        $cell.text(val);
      } else {
        $cell.text('');
      }
    }
  }
}


function move(dir) {
  const compress = arr=>{
    arr = arr.filter(v=>v);
    for(let i=0;i<arr.length-1;i++){
      if(arr[i]===arr[i+1]){
        arr[i]*=2;
        score += arr[i];
        arr[i+1]=0;
        i++;
      }
    }
    arr = arr.filter(v=>v);
    while(arr.length<SIZE) arr.push(0);
    return arr;
  };

  let moved=false;
  if(dir==='left'||dir==='right'){
    for(let r=0;r<SIZE;r++){
      let row = grid[r].slice();
      if(dir==='right') row.reverse();
      let newRow = compress(row);
      if(dir==='right') newRow.reverse();
      if(newRow.toString()!==grid[r].toString()){grid[r]=newRow;moved=true;}
    }
  } else {
    for(let c=0;c<SIZE;c++){
      let col = grid.map(row=>row[c]);
      if(dir==='down') col.reverse();
      let newCol = compress(col);
      if(dir==='down') newCol.reverse();
      for(let r=0;r<SIZE;r++){
        if(grid[r][c]!==newCol[r]){grid[r][c]=newCol[r];moved=true;}
      }
    }
  }

  if(moved){
    spawn();
    render();
    updateScore();
  }

  if (!canMove()) {
    alert('Игра окончена! Ходов больше нет.');
    init();
  }
}

function updateScore() {
  $score.text(score);
  if (score > best) {
    best = score;
    localStorage.setItem('best2048', best);
    $best.text(best);
  }
}


$(document).on('keydown', e=>{
  if(e.key==='ArrowLeft') move('left');
  if(e.key==='ArrowRight') move('right');
  if(e.key==='ArrowUp') move('up');
  if(e.key==='ArrowDown') move('down');
});


$newGame.on('click', init);


function canMove() {
  for (let r=0;r<SIZE;r++) {
    for (let c=0;c<SIZE;c++) {
      if (grid[r][c] === 0) return true;
    }
  }

  for (let r=0;r<SIZE;r++) {
    for (let c=0;c<SIZE;c++) {
      const v = grid[r][c];
      if (r+1 < SIZE && grid[r+1][c] === v) return true;
      if (c+1 < SIZE && grid[r][c+1] === v) return true;
    }
  }
  return false;
}



init();
