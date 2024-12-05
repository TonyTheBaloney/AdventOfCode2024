import * as fs from 'fs';
fs.readFile('day5Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let section: string[] = data.split("\n\n");

    // Map for number where page, and then array of numbers that have to be after it

    let rulesStr: string[] = section[0].split("\n");
    let pagesStr: string[] = section[1].split("\n");

    let rules: number[][] = [];
    for(let i = 0; i < rulesStr.length; i++){
        let rule: number[] = rulesStr[i].split("|").map(x => parseInt(x));
        rules.push(rule);
    }
    let pages: number[][] = [];
    for(let i = 0; i < pagesStr.length; i++){
        let page: number[] = pagesStr[i].split(",").map(x => parseInt(x));
        pages.push(page);
    }

    let map: Map<number, number[]> = parseRules(rules);

    let validPages: number[][] = [];
    let invalidPages: number[][] = [];
    
    for(let i = 0; i < pages.length; i++){
        let page = pages[i];
        if(isValidPages(map, page)){
            validPages.push(page);
        }else{
            invalidPages.push(page);
        }
    }
    console.log(calculateMiddleSum(validPages));
    fixPages(map, invalidPages);
    console.log((invalidPages));
});

function calculateMiddleSum(pages: number[][]): number{
    let sum:number = 0;
    for(let i = 0; i < pages.length; i++){
        let page = pages[i];
        let middleIdx = Math.floor(page.length / 2);
        sum += page[middleIdx];
    }
    return sum;
}

function fixPages(rulesMap: Map<number, number[]>, pages: number[][]){
    for(let i = 0; i < pages.length; i++){
        let page = pages[i];
        
        for(let j = 0; j < page.length; j++){
            let currentNumber: number = page[j];
            if (rulesMap.has(currentNumber)){
                // Check if there's a page that can't be after this page
                let invalidPagesAfter: number[] = rulesMap.get(currentNumber);
                for(let k = j+1; k < page.length; k++){
                    if(invalidPagesAfter.includes(page[k])){
                        // Swap the pages
                        let temp = page[j];
                        page[j] = page[k];
                        page[k] = temp;
                    }
                }

            }else{
                continue;
            }
        }
    }
}

// Returns a map, where a key is a page,
// and the value is an array of pages that can't be after it
function parseRules(rules: number[][]): Map<number, number[]>{
    let map: Map<number, number[]> = new Map();

    for(let i = 0; i < rules.length; i++){
        let firstPage = rules[i][0];
        let secondPage = rules[i][1];

        if(map.has(secondPage)){
            map.get(secondPage).push(firstPage);
        }else{
            map.set(secondPage, [firstPage]);
        }
    }
    return map;
}

function isValidPages(rulesMap: Map<number,number[]>, page: number[]): boolean{
    for(let i = 0; i < page.length; i++){
        let currentPage = page[i];
        if (rulesMap.has(currentPage)){
            // Check if there's a page that can't be after this page
            let invalidPagesAfter = rulesMap.get(currentPage);
            for(let j = i+1; j < page.length; j++){
                if(invalidPagesAfter.includes(page[j])){
                    return false;
                }
            }

        }else{
            continue;
        }
    }
    return true;
}