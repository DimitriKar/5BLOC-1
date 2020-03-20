pragma solidity >=0.4.20;
pragma experimental ABIEncoderV2;

import "./SafeMath.sol";

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
   
  using SafeMath for uint256;
  
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
        bool isCreated;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;
    
    uint32 public dateEnd;

    /** 
     * @dev Create a new ballot to choose one of 'proposalNames'.
     * @param _proposalNames names of proposals
     */
    constructor(string[] memory _proposalNames, uint32 _dateEnd) public {
        require(
            _proposalNames.length != 0,
            "No proposal names"
        );
        chairperson = msg.sender;
        voters[chairperson].weight = voters[chairperson].weight.add(1);
        dateEnd = _dateEnd;

        for (uint i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({
                name: _proposalNames[i],
                voteCount: 0
            }));
        }
    }
    
    /** 
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param _voter address of voter
     */
    function giveRightToVote(address _voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[_voter].voted,
            "The voter already voted."
        );
        require(voters[_voter].weight == 0);
        voters[_voter].weight = voters[_voter].weight.add(1);
        voters[_voter].isCreated = true;
    }

    /**
     * @dev Delegate your vote to the voter 'to'.
     * @param _to address to which vote is delegated
     */
    function delegate(address _to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(_to != msg.sender, "Self-delegation is disallowed.");

        while (voters[_to].delegate != address(0)) {
            _to = voters[_to].delegate;

            // We found a loop in the delegation, not allowed.
            require(_to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = _to;
        Voter storage delegate_ = voters[_to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount = proposals[delegate_.vote].voteCount.add(sender.weight);
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight = delegate_.weight.add(sender.weight);
        }
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param _proposal index of proposal in the proposals array
     */
    function vote(uint _proposal) public {
        require(dateEnd >= now, "Already Closed");
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = _proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[_proposal].voteCount = proposals[_proposal].voteCount.add(sender.weight);
    }

    /**
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /**
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view
            returns (string memory winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }

    /**
     * @dev Calls alreadyVote() function verify if a voter as already voter
     * @return alreadyVote_
     */
    function alreadyVote() public view returns(bool alreadyVote_)
    {
        Voter storage sender = voters[msg.sender];
        alreadyVote_ = sender.voted;
    }

    /**
     * @dev Calls getProposalList() function that return all proposals
     */
    function getProposalList() public view returns(Proposal[] memory)
    {
        uint length = proposals.length;
        Proposal[] memory listProposal = new Proposal[](length);
        for (uint i = 0; i < length; i++) {
            Proposal storage item = proposals[i];
            listProposal[i] = item;
        }
        return listProposal;
    }

    function getVoter(address _address) public view returns (Voter memory)
    {
        return voters[_address];
    }

    function isChair() public view returns (bool)
    {
        return msg.sender == chairperson;
    }
}
