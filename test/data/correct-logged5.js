const myFunc = (a, b) => {
    console.log(`Entering <anonymous function>(${ a }, ${ b }) at line 1`);
    const uselessFunction = function (a, b, c) {
        console.log(`Entering <anonymous function>(${ a }, ${ b }, ${ c }) at line 2`);
    };
    uselessFunction(4, 5, 6);
    console.log(a, b);
};
myFunc(1, 'hi');