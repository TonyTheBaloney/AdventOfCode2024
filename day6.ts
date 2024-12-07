import * as fs from 'fs';

enum Direction{
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

let uniqueMovements = 0;
let x: number = 0;
let y: number = 0;
let facing: Direction = Direction.UP;

fs.readFile('day6Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }


    let lines: string[] = data.split("\n");
    let map: string[][] = [];



    for(let i = 0; i < lines.length; i++){
        let line: string = lines[i];
        
        let row: string[] = line.split("");
        for(let j = 0; j < row.length; j++){
            let char: string = row[j];
            if(char == "^"){
                x = i;
                y = j;
            }
        }
        map.push(row);
    }

    map = moveUntilWall(map);
    console.log(uniqueMovements);
    console.table(map);

});

function moveUntilWall(map: string[][]){
    while(x >= 0 && x < map[0].length && y >= 0 && y < map.length){
        
        if(map[x][y] != "X"){
            uniqueMovements++
            map[x][y] = "X";
        }
        if(move(map) == "out") return map;
    }
    return map;

}

function move(map: string[][]){
    
    switch(facing){
        case Direction.UP:
            if(map[x-1] == undefined) return "out";
            if(map[x-1][y] == "#"){
                facing = (facing + 1) % 4;
            }else{
                x--;
            }
            break;
        case Direction.DOWN:

            if(map[x+1] == undefined)  return "out";
            if(map[x+1][y] == "#"){
                facing = (facing + 1) % 4;
            }else{
                x++;
            
            }
            break;
        case Direction.LEFT:

            if(map[x][y-1] == undefined)  return "out";
            if(map[x][y-1] == "#"){
                facing = (facing + 1) % 4;
            }else{

                y--;
            }
            break;
        case Direction.RIGHT:
            if(map[x][y+1] == undefined)  return "out";
            if(map[x][y+1] == "#"){
                facing = (facing + 1) % 4;
            }else{
                y++;
            }
            break;
    }
    

}