// SPDX-License-Identifier: MIT
pragma ton-solidity >= 0.40.0;
// pragma tvm-solidity >= 0.72.0;

contract Voting {
    mapping(address => uint128) public votes1;
    mapping(address => uint128) public votes2;
    uint128 sum1;
    uint128 sum2;
    address owner;
    uint128 winner;
    
    // Constructor
    constructor() {
        tvm.accept();
        sum1 = 0;
        sum2 = 0;
        winner = 0;
        owner = msg.sender;
    }

    modifier isBalanceOk {
		require(msg.value > 100000000);
		tvm.accept();
		_;
	}

    modifier isOwner {
		require(msg.sender == owner);
		tvm.accept();
		_;
	}

    modifier votingInProgress {
        require(winner == 0);
        tvm.accept();
        _;
    }

    function vote(uint128 option) external isBalanceOk votingInProgress {
        require(option == 1 || option == 2);
        tvm.accept();
        if(option == 1){
            sum1 += msg.value;
            votes1[msg.sender] += msg.value;
        } else {
            sum2 += msg.value;
            votes2[msg.sender] += msg.value;
        }
    }

    function claim() external isBalanceOk {
        require(winner != 0);
        uint128 payout = 0;
        uint128 user_pay = 0;
        uint128 bank = 0;
        uint128 share = 0;
        if(winner == 1){
            user_pay = votes1[msg.sender];
            bank = sum1;
            share = sum2;
        } else {
            user_pay = votes2[msg.sender];
            bank = sum2;
            share = sum1;
        }

        require(user_pay > 0);
        tvm.accept();
        // final payout
        payout = user_pay + (bank * user_pay / share);

        msg.sender.transfer(uint16(payout), true, uint16(1));
        // require(status, "Transfer failed");

        // reset deposit
        votes1[msg.sender] = 0;
        votes2[msg.sender] = 0;
    }

    function getOwner() external view isBalanceOk isOwner returns (address) {
        tvm.accept();
        return owner;
    }

    function stop(uint128 winOption) external isBalanceOk isOwner votingInProgress {
        tvm.accept();
        winner = winOption;
    }
}
