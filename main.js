let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");

// console.log(inputArr);
let command = inputArr[0];
console.log(command+"\n");
let types = {
    media: ["mp4", "mkv","mp3","mov","wmv", "wav","m4a"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'msi', 'dmg', 'pkg', "deb"]
}
switch (command) {
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please give Right command, Checkout Help");
        break;
}