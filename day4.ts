import * as fs from 'fs';
fs.readFile('day4Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let letters: string[][] = [];
    let lines: string[] = data.split("\n");
    
    for(let i = 0; i < lines.length; i++){
        let line: string = lines[i];
        let lineLetters: string[] = line.split("");
        letters.push(lineLetters);
    }


    console.log(getX_MasCount(letters));
    console.log(getXMASCount(letters));
});

function getX_MasCount(letters: string[][]): number{
    let count: number = 0;

    for(let i = 0; i < letters.length; i++){
        for(let j = 0; j < letters[i].length; j++){
            let letter: string = letters[i][j];

            if(letter == "M"){
                
                if( (letters[i-1]??[])[j+1] == "A" && 
                    (letters[i-2]??[])[j+2] == "S"){
                        if((letters[i-2]??[])[j] == "M" && (letters[i]??[])[j+2] == "S" ){
                            count++;
                        }

                        if((letters[i-2]??[])[j] == "S" && (letters[i]??[])[j+2] == "M" ){
                            count++;
                        }
                }

                if( (letters[i+1]??[])[j+1] == "A" && 
                    (letters[i+2]??[])[j+2] == "S"){
                        if((letters[i]??[])[j+2] == "M" && (letters[i+2]??[])[j] == "S" ){
                            count++;
                        }

                        if((letters[i]??[])[j+2] == "S" && (letters[i+2]??[])[j] == "M" ){
                            count++;
                        }
                }

            }
        }
    }
    return count;
}

function getXMASCount(letters: string[][]): number{
    let count: number = 0;

    for(let i = 0; i < letters.length; i++){
        for(let j = 0; j < letters[i].length; j++){
            let letter: string = letters[i][j];

            if (letter == "X"){
                // Check horizontal
                if (letters[i][j+1] == "M" &&
                    letters[i][j+2] == "A" &&
                    letters[i][j+3] == "S"){
                        count++;
                }

                // Check vertical
                if ((letters[i+1]??[])[j] == "M" &&
                    (letters[i+2]??[])[j] == "A" &&
                    (letters[i+3]??[])[j] == "S"){
                        count++;
                }
                if ( (letters[i-1] ?? [])[j] == "M" &&
                    (letters[i-2] ?? [])[j] == "A" &&
                    (letters[i-3] ?? [])[j] == "S"){
                        count++;
                }
                // Check diagonal
                if ((letters[i+1]??[])[j+1] == "M" &&
                    (letters[i+2]??[])[j+2] == "A" &&
                    (letters[i+3]??[])[j+3] == "S"){
                        count++;
                }
                if ((letters[i+1]??[])[j-1] == "M" &&
                    (letters[i+2]??[])[j-2] == "A" &&
                    (letters[i+3]??[])[j-3] == "S"){
                        count++;
                }

                if ((letters[i-1] ?? [])[j+1] == "M" &&
                    (letters[i-2]??[])[j+2] == "A" &&
                    (letters[i-3]??[])[j+3] == "S"){
                        count++;
                }
                if ((letters[i-1]??[])[j-1] == "M" &&
                    (letters[i-2]??[])[j-2] == "A" &&
                    (letters[i-3]??[])[j-3] == "S"){
                        count++;
                }
                // Check backwards
                if (letters[i][j-1] == "M" &&
                    letters[i][j-2] == "A" &&
                    letters[i][j-3] == "S"){
                        count++;
                }

            }
        }
    }


    return count;
}