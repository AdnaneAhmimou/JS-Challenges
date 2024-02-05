const xlsx = require('xlsx');

function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(worksheet);
}

function writeExcelFile(data, outputFilePath) {
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    const newWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    xlsx.writeFile(newWorkbook, outputFilePath);
}

module.exports = {
    readExcelFile,
    writeExcelFile
};
