// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract MyFirstContract {
    string public mensagem = "Hello, World!";

    function getMensagem() public view returns (string memory) {
        return mensagem;
    }
}