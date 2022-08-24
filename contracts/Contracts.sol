pragma solidity ^0.8.13;

contract Contacts {
    uint public count = 0; // 状态变量
    struct Contact {
        uint id;
        string name;
        string phone;
    }

    constructor() public {
        createContact('QuintionTang', '18900000000');
    }

    mapping(uint => Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }
}