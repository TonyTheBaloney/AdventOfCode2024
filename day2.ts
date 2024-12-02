import * as fs from 'fs';
import { report } from 'process';

fs.readFile('day2Input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    let reportsStr: string[] = data.split("\n");
    let reports: number[][] = [];
    reportsStr.forEach((reportStr) => {
        let reportDataStr = reportStr.split(" ");
        let reportData: number[] = [];

        reportDataStr.forEach((reportDataStr) => {
            reportData.push(parseInt(reportDataStr));
        });

        reports.push(reportData);
    });

    console.log(getSafeReports(reports));
    console.log(getSafeReportWithDampener(reports));

})

function getSafeReports(reports: number[][]): number{
    let count = 0;
    for(let i = 0; i < reports.length; i++){
        if(isSafeReport(reports[i])){
            count++;
        }
    }
    return count;
}

function getSafeReportWithDampener(reports: number[][]): number {
    let count = 0;
    for(let i = 0; i < reports.length; i++){
        if(isSafeReport(reports[i])){
            count++;
        }else{

            for(let j = 0; j < reports[i].length; j++){
                if(isSafeReport(reports[i].slice(0,j).concat(reports[i].slice(j+1)))){
                    count++;
                    break;
                }

            }

        }
    }
    return count;
}

function isSafeReport(report: number[]){

    // Check if all decreasing or all increasing
    let increasing = report[0] < report[1];

    for(let i = 0; i < report.length - 1; i++){

        if(Math.abs(report[i] - report[i+1]) > 3 || Math.abs(report[i] - report[i+1]) < 1){
            return false;
        }

        if(increasing && report[i] > report[i+1]){
            return false;
        }else if(!increasing && report[i] < report[i+1]){
            return false;
        }

    }
    return true;
}