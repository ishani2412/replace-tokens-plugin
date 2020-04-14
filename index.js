#!/usr/bin/env node

//dependency for file handling
var fs = require('fs');

//dependency for taking inputs from CLI using flags
const args = require('yargs').argv;

//dependency for replacing tokens in a file
const Jtr = require("json-token-replace");
const jtr = new Jtr();

//path of file to be replaced
if (args.jsonfile !== undefined) {
    var filePath = args.jsonfile;
    var fileToBeReplaced = fs.readFileSync(filePath,'utf-8');
    console.log(fileToBeReplaced);
} else {
    console.log("Please provide a valid file path");
    return;
}

//if file provided containing token values
if (args.tokensfile !== undefined) {
    const tokenFile = args.tokensfile;
    var tokens = fs.readFileSync(tokenFile,'utf-8');
    console.log(tokens);
} else {
    console.log("Please provide a valid file path containing token values");
    return;
}

tokens = JSON.parse(tokens);
fileToBeReplaced = JSON.parse(fileToBeReplaced);

let jsonOutput = jtr.replace(tokens,fileToBeReplaced, "{{", "}}");
console.log(jsonOutput);

fs.writeFileSync(filePath,JSON.stringify(jsonOutput));