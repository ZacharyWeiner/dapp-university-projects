var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
  console.log("STARTING......");

  it('intializes with 4 candidates', function(){
    console.log('GETTING THE INSTANCE....');
    return Election.deployed().then(function(instance){
      return instance.candidatesCount();
    }).then(function(count){
      console.log(count);
      assert.equal(count,4);
    });
  });

  it("it intializes the candidates with the correct values", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate){
      assert.equal(candidate[0], 1, 'contians the correct id');
      assert.equal(candidate[1], "Ryan McCreadie", 'contians the correct name');
      assert.equal(candidate[2], 0, 'contiains the correct votes count');
      return electionInstance.candidates(2);
    }).then(function(candidate){
       assert.equal(candidate[0], 2, 'contians the correct id');
       assert.equal(candidate[1], "Zack Weiner", 'contians the correct name');
       assert.equal(candidate[2], 0, 'contiains the correct votes count');
    });
  });
});
