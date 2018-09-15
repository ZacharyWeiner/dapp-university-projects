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

  it('allows a user to cast a vote', function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, {from: accounts[0]});
    }).then(function(reciept){
        return electionInstance.voters(accounts[0]);
    }).then(function(voted){
      assert(voted, 'the voter was marked as having voted');
      return electionInstance.candidates(candidateId);
    }).then(function(candidate){
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, 'increments the candidates vote count');
    })
  });

  it('throws an exception for invalid candidates', function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.vote(99, {from: accounts[0]});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >=0, 'error message must contain revert');
      return electionInstance.candidates(1);
    }).then(function(candidate1){
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, 'candidate1 did not recieve any votes');
      return electionInstance.candidates(2);
    }).then(function(candidate2){
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, 'candidate2 did not recieve any new votes');
    });
  });

  it('throws an exception for double voting', function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      candidateId = 2;
      electionInstance.vote(candidateId, {from: accounts[1]});
      return electionInstance.candidates(candidateId);
    }).then(function(candidate){
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, 'accepts first vote');
      return electionInstance.vote(candidateId, {from: accounts[1]});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >=0, 'error message must contain revert');
      return electionInstance.candidates(1);
    }).then(function(candidate1){
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, 'candidate1 did not recieve any votes');
      return electionInstance.candidates(2);
    }).then(function(candidate2){
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, 'candidate2 did not recieve any new votes');
    });
  });
});
