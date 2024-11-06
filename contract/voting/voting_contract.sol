// SPDX-License-Identifier: MIT
pragma ton-solidity >= 0.40.0;

contract Voting {
    // Voting options
    enum Option { None, Option1, Option2 }
    
    // Vote structure
    struct Vote {
        Option option;
        uint256 amount;
    }

    // State variables
    mapping(address => Vote) public votes; // Store user votes
    uint256 public totalVotesOption1; // Total votes for Option 1
    uint256 public totalVotesOption2; // Total votes for Option 2
    uint256 public totalAmount; // Total amount of notcoins deposited
    uint256 public votingEndTime; // End time for voting
    bool public votingEnded; // Flag to check if voting has ended
    address public winner; // Address of the winning option

    // Event declarations
    event Voted(address indexed voter, Option option, uint256 amount);
    event VotingEnded(Option winner, uint256 totalAmount);
    
    // Constructor
    constructor(uint256 duration) {
        votingEndTime = block.timestamp + duration; // Set voting duration
        votingEnded = false;
    }

    // Function to vote
    function vote(Option option) public payable {
        require(now < votingEndTime, "Voting has ended");
        require(msg.value > 0, "Must send some notcoins");
        require(votes[msg.sender].option == Option.None, "You have already voted");

        votes[msg.sender] = Vote(option, msg.value); // Store the vote
        totalAmount += msg.value; // Update total amount

        if (option == Option.Option1) {
            totalVotesOption1 += msg.value; // Count votes for Option 1
        } else if (option == Option.Option2) {
            totalVotesOption2 += msg.value; // Count votes for Option 2
        }

        emit Voted(msg.sender, option, msg.value);
    }

    // Function to end voting
    function endVoting() public {
        require(now >= votingEndTime, "Voting is still ongoing");
        require(!votingEnded, "Voting has already ended");

        votingEnded = true;

        // Determine the winner
        if (totalVotesOption1 > totalVotesOption2) {
            winner = address(this); // Option 1 wins
            emit VotingEnded(Option.Option1, totalAmount);
            distributeRewards(Option.Option1);
        } else if (totalVotesOption2 > totalVotesOption1) {
            winner = address(this); // Option 2 wins
            emit VotingEnded(Option.Option2, totalAmount);
            distributeRewards(Option.Option2);
        } else {
            // In case of a tie, no rewards are distributed
            emit VotingEnded(Option.None, totalAmount);
        }
    }

    // Function to distribute rewards to winners
    function distributeRewards(Option winningOption) private {
        for (address voter in votes.keys()) {
            if (votes[voter].option == winningOption) {
                uint256 reward = (votes[voter].amount * totalAmount) / (winningOption == Option.Option1 ? totalVotesOption1 : totalVotesOption2);
                voter.transfer(reward); // Transfer reward to the voter
            }
        }
    }

    // Function to withdraw funds if voting ended in a tie
    function withdraw() public {
        require(votingEnded, "Voting has not ended yet");
        require(votes[msg.sender].option == Option.None, "You voted, no withdrawal allowed");
        msg.sender.transfer(votes[msg.sender].amount); // Allow non-voters to withdraw their funds
    }
}
