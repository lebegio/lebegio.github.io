pragma ton-solidity >= 0.58.0;

contract MyContract {
    uint public counter;

    function increment() public {
        counter += 1;
    }
}