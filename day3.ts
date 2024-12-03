import * as fs from 'fs';


const regexMatch = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;

fs.readFile('day3Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let matches: RegExpStringIterator<RegExpExecArray> = data.matchAll(regexMatch);

    let match = matches.next();
    let numbers: number[][] = []; // list of lists of two numbers

    let isReading: boolean = true;

    while (match.value != null){
        if(match.value[0] == "do()"){
            isReading = true;
        }
        else if(match.value[0] == "don't()"){
            isReading = false;
        }else if(isReading){
            let matchStr: string = match.value[0];
            let leftNumberStr: string = matchStr.split("(")[1].split(",")[0];
            let leftNumber: number = parseInt(leftNumberStr);
            let rightNumberStr: string = matchStr.split(",")[1].split(")")[0];
            let rightNumber: number = parseInt(rightNumberStr);
            numbers.push([leftNumber, rightNumber]);
        }

        match = matches.next();
    }

    console.log(calculateSum(numbers));
});

function calculateSum(numbers: number[][]): number{
    let sum: number = 0;
    for(let i = 0; i < numbers.length; i++){
        sum += numbers[i][0] * numbers[i][1];
    }

    return sum;
}