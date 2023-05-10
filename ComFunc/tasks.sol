// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskList {
    struct Task {
        uint256 id;
        string title;
        bool completed;
    }

    mapping(address => Task[]) private tasks;
    uint256 private nextTaskId;

    event TaskAdded(uint256 indexed id, string title);
    event TaskCompleted(uint256 indexed id);

    function addTask(string memory title) public {
        tasks[msg.sender].push(Task(nextTaskId, title, false));
        emit TaskAdded(nextTaskId, title);
        nextTaskId++;
    }

    function completeTask(uint256 taskId) public {
        require(taskId < tasks[msg.sender].length, "Invalid task ID");

        tasks[msg.sender][taskId].completed = true;
        emit TaskCompleted(tasks[msg.sender][taskId].id);
    }

    function getTaskCount() public view returns (uint256) {
        return tasks[msg.sender].length;
    }

    function getTask(uint256 taskId) public view returns (uint256 id, string memory title, bool completed) {
        require(taskId < tasks[msg.sender].length, "Invalid task ID");

        Task memory task = tasks[msg.sender][taskId];
        return (task.id, task.title, task.completed);
    }
}
