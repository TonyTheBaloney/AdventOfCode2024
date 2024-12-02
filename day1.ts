import * as fs from 'fs';

fs.readFile('day1Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    let numbersStr: string[] = data.split("\n"); // string[];
    let leftList: number[] = [];
    let rightList: number[] = [];
    numbersStr.forEach((numStr) => {
        let numArr: string[] = numStr.split("   ");
        leftList.push(parseInt(numArr[0]));
        rightList.push(parseInt(numArr[1]));
    });

    
    console.log(getDifferences(leftList, rightList));

    console.log(getSimilartities(leftList, rightList));
});

function getDifferences(leftList: number[], rightList: number[]): number {
    // Sort the lists
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);


    let diff: number = 0;
    for(let i = 0; i < leftList.length; i++) {
        diff += Math.abs(leftList[i] - rightList[i]);
    }

    return diff;
}

function getSimilartities(leftList: number[], rightList: number[]): number {
  // Map the rightList
  let rightMap: Map<number, number> = new Map();

  for(let i = 0; i < rightList.length; i++){
      let rightVal: number = rightList[i];

      if(rightMap.has(rightVal)){
          rightMap.set(rightVal, rightMap.get(rightVal)! + 1);
      }else{
          rightMap.set(rightVal, 1);
      }
  }

  let similarityScore = 0;
  // Go through the lists and get the values
  for(let i = 0; i < leftList.length; i++){
      let leftVal: number = leftList[i];
      let rightMultiplier: number;
      if(rightMap.has(leftVal)){
          rightMultiplier = rightMap.get(leftVal)!;
      }else{
          rightMultiplier = 0;
      }

      similarityScore += leftVal * rightMultiplier;
  }
  return similarityScore;
}