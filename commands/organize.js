let fs = require('fs');
let path = require('path')
let types = {
    media: ["mp4", "mkv","mp3","mov","wmv", "wav","m4a"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'msi', 'dmg', 'pkg', "deb"]
}
function organizeFn(directory) {
    // console.log(directory);
    let destination;
    if (directory == undefined) {
        destination = process.cwd();
    } else {
        let doesExist = fs.existsSync(directory);

        if (doesExist) {
            destination = path.join(directory, "organized_files");    //path name given
            if (fs.existsSync(destination) == false) {
                fs.mkdirSync(destination);                         //made folder 
            }

        } else {

            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(directory, destination);
}
function organizeHelper(src, dest) {
    
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category, "Category");
            sendFiles(childAddress, dest, category);
        }
    }
}
function sendFiles(srcFilePath, dest, category) {
    
    let categoryPath = path.join(dest, category);
    
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(fileName, "copied to ", category);

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);

    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    organizeKey: organizeFn
}