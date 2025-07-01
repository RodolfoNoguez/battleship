import { listeOnEnemyAttack, attackPlayerBoard, listenShipDirectionChange } from "../src/main.js";



export function renderPlacingShipInterface(playerBoard, axis){
    clearMain();

    const borderContainer = createBoardContainer(playerBoard);
    const shipDirection = createShipDirection(axis);

    const  main = document.querySelector('main');
    main.append(borderContainer, shipDirection);
}


function createBoardContainer(playerBoard){
    const boardTitle = document.createElement('h1');
    boardTitle.className = 'place-ship-board-title';
    boardTitle.textContent = 'palce ships';

    const board = document.createElement('div')
    board.className = 'board';

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement('div');
            cell.className = 'place-cell';
            cell.setAttribute('data-coordinates', `${i}, ${j}`);

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

export function handleHiglighting(player, cell, axis, coordinates, placeShipBoardContainer, length, ship){
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
            cell.classList.add('can-place')
        }
    }else{
        for(
            let i = coordinates[0], j = coordinates[1], k = 0;
            k < length;
            i++,
                k++,
                cell = placeShipsBoardContainer.querySelector(
                `[data-coordinates='${i},${j}']`
                )
            ){
                cell.classList.add('can-place')
            }
        }
}


export function removeCellHighlighting(){
    const cells = document.querySelector('plae-cell');
    cell.forEach((cell) => {
        cell.classList.remove('can-place')
    });
}