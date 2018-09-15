pragma solidity ^0.4.2;

contract Election{
  //Model A Candidate
  //Store Candidates
  //Fetch Candidate
  //Store Candidates Count

  struct Candidate{
    uint id;
    string name;
    uint voteCount;
  }

  mapping( uint => Candidate) public candidates;
  mapping( address => bool ) public voters;

  uint public candidatesCount;

  //Contructor
  function Election() public {
    addCandidate('Ryan McCreadie');
    addCandidate('Zack Weiner');
    addCandidate('Jerome Starr');
    addCandidate('Inspector Muller');
  }

  function addCandidate(string _name) private{
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote(uint _candidateId) public {
    require(!voters[msg.sender]);
    require(0 < _candidateId && _candidateId <= candidatesCount);
    voters[msg.sender] = true;
    candidates[_candidateId].voteCount++;
  }
}
