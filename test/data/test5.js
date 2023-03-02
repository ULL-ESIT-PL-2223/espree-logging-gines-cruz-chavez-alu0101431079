const myFunc = (a, b) => {
    const uselessFunction = function(a, b, c) {};
    uselessFunction(4, 5, 6);
    console.log(a, b);
}
myFunc(1, "hi");