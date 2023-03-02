function e(x) {
    console.log(`Entering e(${ x }) at line 2`);
    let sum = 0;
    let term = 1;
    for (let i = 1; term > 0.000001; i++) {
        sum += term;
        term *= x / i;
    }
    return sum;
}
console.log(e(1));