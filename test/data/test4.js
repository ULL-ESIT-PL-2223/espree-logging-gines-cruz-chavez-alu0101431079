// approximate e with taylor series
function e(x) {
  let sum = 0;
  let term = 1;
  for (let i = 1; term > 1e-6; i++) {
    sum += term;
    term *= x / i;
  }
  return sum;
}
console.log(e(1));
