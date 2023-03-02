function myFunc(a, b) {
    console.log(`Entering myFunc(${ a }, ${ b }) at line 1`);
    var barString = 'bar';
    var getThree = function () {
        console.log(`Entering <anonymous function>() at line 3`);
        return 3;
    }();
    var getFour = (n => {
        console.log(`Entering <anonymous function>(${ n }) at line 6`);
        return n * 2;
    })(2);
}
myFunc('yes', 'no');