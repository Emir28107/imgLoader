var imageModel = require("../../models/image");

describe("Image Model" , function(){
       
    var Image;

    it("Should have a Mongoose schema" , function(){
        expect(imageModel.schema).to.not.be.undefined;
    });

    beforeEach(function(){
        Image = new imageModel({
            title : "Test",
            description : "Testing",
            filename : "testfile.png"
        });
    });

    describe("Schema" , function(){
        it("Should have a title string" , function(){
            expect(Image.title).to.not.be.undefined;
        });
        it("Should have a description string" , function(){
            expect(Image.description).to.not.be.undefined;
        });
        it("Should have a filename string" , function(){
            expect(Image.filename).to.not.be.undefined;
        });
        it("Should have a views numbe rdefault to 0" , function(){
            expect(Image.views).to.equal(0);
        });
        it("Should have a likes number default to 0" , function(){
            expect(Image.likes).to.equal(0);
        });
        it("Should have a timestamp date" , function(){
            expect(Image.timestamp).to.not.be.undefined;
        });
    });

    describe("Virtuals" , function(){
        describe("uniqueId" , function(){
            it("Should be defined" , function(){
                expect(Image.uniqueId).to.not.be.undefined;
            });
            it("Should get filename without extension" , function(){
                expect(Image.uniqueId).to.equal("testfile");
            });
        });
    });
});