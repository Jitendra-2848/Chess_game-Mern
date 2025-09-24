const socket = io()
// io.on("playerRole w",()=>{
//     console.log("ok");
// })
const chess = new Chess()
const boardElement = document.querySelector('.chessBoard')
var playerRole = null
var draggedPiece = null
var sourceSquare = null
// let etc = chess.turn();
// console.log();
const renderBoard = () => {
    document.querySelector(".role").innerHTML = chess.turn() === "w" ? "white" : "black";
  if(playerRole === "b"){
    boardElement.classList.add("flip");
    document.querySelector(".playerrole").innerHTML = "Black"
  }
  else if(playerRole === "w"){
    boardElement.classList.remove("flip");
    document.querySelector(".playerrole").innerHTML = "White"
  }
  else{
    boardElement.classList.remove("flip");
    document.querySelector(".playerrole").innerHTML = "Spectator"
    document.querySelector(".playerrole").classList.add("spec");
    document.querySelector(".Note").innerHTML = "Spectator can't play they are allowed to see only just like people watching a hole on road.😃😃 Lamao,dead"
  }
  const board = chess.board()
  boardElement.innerHTML = ''
  // console.log(boardElement)
  board.forEach((row, rowindex) => {
    row.forEach((col, colindex) => {
      // console.log(col)
      const square = document.createElement('div')
      square.classList.add(
        'square',
        (rowindex + colindex) % 2 == 0 ? 'light' : 'dark'
      )
      square.dataset.row = rowindex
      square.dataset.col = colindex
      if (col) {
        const pieceElement = document.createElement('div')
        pieceElement.classList.add(
          'piece',
          col.color === 'w' ? 'white' : 'black'
        )
        pieceElement.innerText = uniquecode(col)
        pieceElement.draggable = playerRole === col.color
        pieceElement.addEventListener('dragstart', e => {
          // e.preventDefault()
          if (pieceElement.draggable) {
            draggedPiece = pieceElement
            sourceSquare = { row: rowindex, col: colindex }
          }
          else{
            return;
          }
        })
        pieceElement.addEventListener('dragend', () => {
          // e.preventDefault()
          draggedPiece = null
          sourceSquare = null
        })
        square.appendChild(pieceElement)
      }
        square.addEventListener('dragover', e => {
          e.preventDefault()
        })
        square.addEventListener('drop', e => {
          // e.preventDefault()
          const Targetsource = {
            row: parseInt(square.dataset.row),
            col: parseInt(square.dataset.col)
          }
          handleMove(sourceSquare, Targetsource)
        })
      
      boardElement.appendChild(square)
    })
  })
  // console.log(board)
}
const handleMove = (source, target) => {
  renderBoard();
  const move = {
    from: `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q",
  };
  socket.emit('move', move)
}

const uniquecode = piece => {
  const white = {
    k: '♔',
    q: '♕',
    n: '♘',
    b: '♗',
    r: '♖',
    p: '♙'
  }
  const black = {
    k: '♚',
    q: '♛',
    n: '♞',
    b: '♝',
    r: '♜',
    p: '♙'
  }
  if (piece.color === 'w') {
    return white[piece.type] || ''
  } else {
    return black[piece.type] || ''
  }
}
socket.on('playerRole', role => {
  playerRole = role
  renderBoard()
})
socket.on('boardstate', fen => {
  chess.load(fen)
  renderBoard()
})
socket.on('invalidMove', () => {
  console.log('Aap wrong move chal rahe ho!!')
})

socket.on('spectatorRole', () => {
  playerRole=null;
  renderBoard()
})

function changeRole(){

}