function myFunc(a, b) {   
    var barString = 'bar';   
    var getThree = (function () {
      return 3;
    })();
    var getFour = (n => { return n*2 })(2);
  }     
myFunc('yes', 'no');