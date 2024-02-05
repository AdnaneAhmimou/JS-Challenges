// mainScript.js
const calculateBonus = require('./bonusCalculator');
const { readExcelFile, writeExcelFile } = require('./processEmpData');

try {
    const data = readExcelFile('./employee_data_.xlsx');

    data.forEach(row => {
        const bonusPercentage = calculateBonus(row.AnnualSalary);
        row.BonusPercentage = bonusPercentage;
        row.BonusAmount = row.AnnualSalary * bonusPercentage;
    });

    writeExcelFile(data, 'outputFile.xlsx');
} catch (error) {
    console.error('An error occurred:', error);
}
