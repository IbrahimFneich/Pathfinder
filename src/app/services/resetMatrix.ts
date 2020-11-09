


export function resetMatrix(grid){

    for (let row = 0; row < 25; row++) {
        for (let col = 0; col < 70; col++) {
            grid[row][col].isWall=false;
            
        }
        
    }

    return grid;
}