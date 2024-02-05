function calculateBonus(salary) {
    if (salary < 50000) {
        return 0.05;
    } else if (salary >= 50000 && salary <= 100000) {
        return 0.07;
    } else {
        return 0.10;
    }
}

module.exports = calculateBonus;