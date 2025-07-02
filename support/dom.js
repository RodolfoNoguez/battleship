import { listenOnEnemyBoardAttack, attackPlayerBoard, listenOnCellClick } from "../src/main.js";



export function renderPlacingShipsInterface(playerBoard, axis){
    clearMain();

    const borderContainer = createBoardContainer(playerBoard);
    const shipDirection = createShipDirectionButton(axis);

    const  main = document.querySelector('main');
    main.append(borderContainer, shipDirection);
}


function createBoardContainer(playerBoard){
    const boardTitle = document.createElement('h1');
    boardTitle.className = 'place-ship-board-title';
    boardTitle.textContent = 'place ships';

    const board = document.createElement('div')
    board.className = 'board';

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement('div');
            cell.className = 'place-cell';
            cell.setAttribute('data-coordinates', `${i},${j}`);

            if(playerBoard.board[i][j] !== null){
                cell.classList.add('occupied');
            }

            board.appendChild(cell);
        }
    }

    const boardContainer = document.createElement('div');
    boardContainer.className = 'place-ships-board-container';

    boardContainer.append(boardTitle, board);

    return boardContainer
}


function createShipDirectionButton(axis){
    const shipDirection = document.createElement('button');
    shipDirection.className = 'ship-direction';
    shipDirection.textContent = axis === 'x' ? 'horizontal': 'vertical';

    return shipDirection
}

export function handleHighlighting(player, cell, axis, coordinates, placeShipBoardContainer, length, ship){
    const canPlace = player.gameboard.canPlaceShip(ship, coordinates, axis);

    if(canPlace){
        highlightValidCells(cell, axis, coordinates, placeShipBoardContainer, length);
        listenOnCellClick(cell,coordinates,ship);
    }else{
        cell.classList.add('can-not-place');
    }
}


export function highlightValidCells(cell, axis, coordinates, placeShipBoardContainer, length){
    cell.classList.remove('can-not-place');
    if(axis === 'x'){
        for(let i = 0; i < length; cell = cell.nextElementSibling){
            cell.classList.add('can-place');
        }
    }else{
        for(
            let i = coordinates[0], j = coordinates[1], k = 0;
            k < length;
            i++,
                k++,
                cell = placeShipBoardContainer.querySelector(
                `[data-coordinates='${i},${j}']`
                )
            ){
                cell.classList.add('can-place')
            }
        }
}


export function removeCellHighlighting(){
    const cells = document.querySelectorAll('.place-cell');
    cells.forEach((cell) => {
        cell.classList.remove('can-place')
    });
}

export function handleHovering(e, numberOfShipsLeftToPlace, player, axis, placeShipsBoardContainer) {
    removeCellHighlighting();

    let cell = e.target.closest('.place-cell');
    if (cell) {
        const coordinates = cell.dataset.coordinates
            .split(',')
            .map((number) => number * 1);

        let length;
        let ship;

    // Try to place the ship in turn
    switch (numberOfShipsLeftToPlace) {
        case 5:
            ship = player.gameboard.carrier;
            length = 5;
            handleHighlighting(player,cell,axis,coordinates,placeShipsBoardContainer,length,ship);
            break;

        case 4:
            ship = player.gameboard.battleship;
            length = 4;
            handleHighlighting(player,cell,axis,coordinates,placeShipsBoardContainer,length,ship);
            break;

        case 3:
            ship = player.gameboard.cruiser;
            length = 3;
            handleHighlighting(player,cell,axis,coordinates,placeShipsBoardContainer,length,ship);
            break;

        case 2:
            ship = player.gameboard.submarine;
            length = 3;
            handleHighlighting(player,cell,axis,coordinates,placeShipsBoardContainer,length,ship);
            break;

        case 1:
            ship = player.gameboard.destroyer;
            length = 2;
            handleHighlighting(player,cell,axis,coordinates,placeShipsBoardContainer,length,ship);
            break;
        }
    }
}


export function clearMain(){
    const main = document.querySelector('main')
    main.innerHTML = '';
}

export function renderStatus(name){
    const statusContainer = document.createElement('section');
    statusContainer.className = 'status-container';

    const status = document.createElement('p');
    status.className = 'status';
    status.textContent = `Waiting for orders, Captain ${name}`;

    statusContainer.appendChild(status);

    const main = document.querySelector('.main');
    main.appendChild(statusContainer);
}


export function updateStatus(){
    const status = document.querySelector('.status');
    status.textContent = 'incoming...hold steady!';
}

export function renderBoards(playerBoard, computerBoard){
    const playerboard = renderPlayerBoard(playerBoard);
    const computerboard = renderComputerBoard(computerBoard);

    const boardsContainer = document.createElement('section');
    boardsContainer.className = 'boards-container';
    boardsContainer.append(playerboard, computerboard);

    const main = document.querySelector('.main')
    main.appendChild(boardsContainer);
}


function renderPlayerBoard(playerBoard){
    const playerBoardTitle = document.createElement('p');
    playerBoardTitle.className = 'player-board-title board-title';
    playerBoardTitle.textContent = 'your fleet';
    
    const playerGameBoard = document.createElement('div');
    playerGameBoard.className = 'player-board board';

    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-coordinates', `${i},${j}`);

            const missedAttack = playerBoard.missedAttacks.some((coordinates) => coordinates[0] === i && coordinates[1] === j);

            if(missedAttack){
                cell.classList.add('missed');
            }

            if(playerBoard.board[i][j] !== null){
                cell.classList.add('occupied');
                if (playerBoard.board[i][j].hit) {
                    cell.classList.add('hit');
                }
            }

            playerGameBoard.appendChild(cell);
        }
    }

    const playerBoardContainer = document.createElement('article');
    playerBoardContainer.className = 'player-board-container board-container';
    playerBoardContainer.append(playerBoardTitle, playerGameBoard);
  
    return playerBoardContainer;
}


function renderComputerBoard(computerBoard) {
    const computerBoardTitle = document.createElement('p');
    computerBoardTitle.className = 'computer-board-title board-title';
    computerBoardTitle.textContent = 'Enemy Waters';

    const computerGameBoard = document.createElement('div');
    computerGameBoard.className = 'computer-board board';

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.className = 'enemy-cell cell';
            cell.setAttribute('data-coordinates', `${i},${j}`);

            const missedAttack = computerBoard.missedAttacks.some((coordinates) => coordinates[0] === i && coordinates[1] === j);

            if (missedAttack) {
                cell.classList.add('missed');
            }

            if (computerBoard.board[i][j] !== null && computerBoard.board[i][j].hit) {
                cell.classList.add('hit');
            }

            computerGameBoard.appendChild(cell);
        }
    }

    const computerBoardContainer = document.createElement('article');
    computerBoardContainer.className = 'computer-board-container board-container';
    computerBoardContainer.append(computerBoardTitle, computerGameBoard);

    return computerBoardContainer;
}


export function updateGameView(player, computer, playerTurn, gameOver){
    if(gameOver){return;}

    clearMain();
    renderBoards(player.gameboard, computer.gameboard);
    renderStatus(player.name);

    if(playerTurn){
        listenOnEnemyBoardAttack();
    }else{
        attackPlayerBoard();
    }
}


function createRestartButton(){
    const restartButton = document.createElement('button');
    restartButton.className = 'restart';
    restartButton.textContent = 'Battle again!';

    return restartButton;
}

export function announceWinner(name = undefined) {
    clearMain();
  
    let messageText;
  
    if (name) {
      messageText = `Victory! Captain ${name} has conquered the seas!`;
    } else {
      messageText = `Defeat... our fleet has been vanquished.`;
    }
  
    const message = document.createElement('p');
    message.className = 'game-end-message';
    message.textContent = messageText;
  
    const main = document.querySelector('main');
    main.append(message, createRestartButton());
  }

  export function toggleEnemyBoardInteraction(){
    const enemyBoard = document.querySelector('.computer-board');
    enemyBoard.classList.toggle('clickable');
  }