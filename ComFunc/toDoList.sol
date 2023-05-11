// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskList {
    struct Task {
        string title;
        bool completed;
    }

    mapping(address => Task[]) private userTasks;

    function createTask(string memory _title) public {
        userTasks[msg.sender].push(Task(_title, false));
    }

    function retrieveInfo() external view returns (string memory, bool) {
        require(userTasks[msg.sender].length > 0, "No tasks created");

        Task memory task = userTasks[msg.sender][0];
        return (task.title, task.completed);
    }

    function completeTask(uint256 _index) external {
        require(userTasks[msg.sender].length > _index, "Index out of bounds");

        Task storage task = userTasks[msg.sender][_index];
        task.completed = true;
    }
}
