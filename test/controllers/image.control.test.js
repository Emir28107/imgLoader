var proxyquire = require("proxyquire");
var callback = sinon.spy() , sidebarStub = sinon.stub() , faStub = {} , pathStub = {} , md5Stub = {} ;
var modelsStub = {
    image : {
        findOne : sinon.spy()
    },
    comment : {
        find : sinon.spy()
    }
}, Image = proxyquire("../../Controllers/image.js" , {
    "../helpers/sidebar.js" : sidebarStub,
    "../models" : modelsStub,
    "fs" : faStub,
    "path" : pathStub,
    "md5" : md5Stub
}), res = {} , req = {} , testImage = {};

describe("Image Controller" , function(){
    beforeEach(function(){
        res = {
            render : sinon.spy(),
            json : sinon.spy(),
            redirect : sinon.spy()
        };
        req.params = {
            image_id : "testing"
        };
        testImage = {
            _id : 1,
            title : "Test Image",
            views : 0,
            likes : 0,
            save : sinon.spy()
        };
    });

    describe("Index" , function(){
        it("Should be defined" , function(){
            expect(Image.index).to.not.be.undefined;
        });
        it("Should call Models.image.findOne" , function(){
            modelsStub.image.findOne = sinon.spy();
            Image.index(req , res);
            expect(modelsStub.image.findOne).to.be.called;
        });
        it("Should find Image by parameter Id" , function(){
            modelsStub.image.findOne = sinon.spy();
            Image.index(req , res);
            expect(modelsStub.image.findOne).to.be.calledWith({
                filename : { $regex : "testing" }
            } , sinon.match.func);
        });


    });

    describe("With found Image Model" , function(){
        beforeEach(function(){
                  modelsStub.image.findOne = sinon.stub().callsArgWith(1 , null , testImage);
        });
        it("Should increment Views by 1 and Save" , function(){
            Image.index(req , res);
            expect(testImage.views).to.equal(1);
            expect(testImage.save).to.be.called;
        });
        it("Should find related comment" , function(){
            Image.index(req , res);
            expect(modelsStub.comment.find).to.be.calledWith(
                { image_id : 1 },
                {},
                { sort : { "timestamp" : 1 }}
            );
        });
        it("Should execute Sidebar" , function(){
            modelsStub.comment.find = sinon.stub().callsArgWith(3 , null , [1 , 2 ,3]);
            Image.index(req , res);
            expect(sidebarStub).to.be.calledWith({
                image : testImage , comment : [1 , 2 , 3]
            } , sinon.match.func);
        });

        it("Should render Image template with image and comments" , function(){
            modelsStub.comment.find = sinon.stub().callsArgWith(3 , null , [1 , 2 , 3]);
            sidebarStub.callsArgWith(1 , { image : testImage  , comment : [1 , 2 , 3] });
            Image.index(req , res);
            expect(res.render).to.be.calledWith("image" , { image : testImage , comment : [1 , 2 , 3]});
        });
    });
});