// SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

// rough design

contract RegenRetire {
    // args (employer address, employee address, deposit amount)
    event Deposit(address employer, address employee, uint256 amount);
    event Withdrawal(address employee, uint256 amount);
    // employeeAddress => employee401k balance
    mapping(address => uint256) balance;

    modifier isAddress(address _address) {
        require(_address != address(0));
        _;
    }

    // function for employer to deposit on behalf of employee
    // args (employee's address, amount)
    function deposit(address _employeeAddress)
        external
        payable
        isAddress(_employeeAddress)
    {
        // update mapping
        balance[_employeeAddress] += msg.value;
        // send eth && take a fee
        (bool success, ) = _employeeAddress.call{value: msg.value}("");

        require(success, "Failed to send Ether");

        emit Deposit(msg.sender, _employeeAddress, msg.value);
    }

    function withdraw(uint256 withdrawalAmount) public payable {
        // check balance
        require(balance[msg.sender] >= withdrawalAmount);
        // update balance
        balance[msg.sender] -= withdrawalAmount;

        // send eth
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool success, ) = msg.sender.call{value: msg.value}("");

        require(success, "Failed to send Ether");

        emit Withdrawal(msg.sender, msg.value);
    }
}
