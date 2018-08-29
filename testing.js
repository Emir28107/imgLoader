var sinon = require("sinon");

var sum = function(x , y) {
    return x+y;
};

var doWork = function(){
    var x = 1 , y = 2;
    sum(x , y);
};

describe("doWork" , function(){
    var sum;

    it("should call sum"  , function(){
        sum = sinon.spy();
        doWork();
        expect(sum).to.be.calledWith(1 , 2);
    });
});