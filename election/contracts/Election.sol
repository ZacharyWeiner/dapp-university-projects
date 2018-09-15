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
}
