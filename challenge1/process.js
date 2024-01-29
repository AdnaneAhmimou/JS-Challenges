const fs = require('fs');
const path = require('path');

function processFiles(filePaths) {
  filePaths.forEach(filePath => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        return;
      }

      const modifiedContent = addTimestamp(data);

      const newFilePath = getNewFilePath(filePath);

      fs.writeFile(newFilePath, modifiedContent, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${newFilePath}: ${err.message}`);
        } else {
          console.log(`File ${newFilePath} successfully written.`);
        }
      });
    });
  });
}

function addTimestamp(content) {
    const timestamp = new Date().toLocaleString(); 
    return `${timestamp}\n${content}`;
}
  

function getNewFilePath(oldFilePath) {
    const modifiedFileName = `${path.basename(oldFilePath, path.extname(oldFilePath))}_modified${path.extname(oldFilePath)}`; 
    return path.join(path.dirname(oldFilePath), modifiedFileName);
}
  
module.exports = processFiles
