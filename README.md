# RPC Cache Implementation for Go-Ethereum 

## Problem Statement
An implementation and benchmarking of various cache policies on the go ethereum implementation of a blockchain node in order to possibly improve read call reverts. 

## Architecture with Technology Components
![architecture_with_tech_components](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/9c6e1bdc-2f3d-44f0-8a0c-042dd1eba229)


## Logical Design
![logical_design](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/0b6159d4-2c08-40ea-99a6-88eb171db28a)

## Platform Brief
- Go-ethereum: Implements Ethereum blockchain in Go, used for Ethereum network interaction.
- Solidity: Programming language for writing smart contracts.
- Sepolia: Ethereum Testnet.
- Remix: Integrated Development Environment for writing, testing, and deploying Ethereum smart contracts.
- Etherscan: Used to access Ethereum network information such as transaction history, smart contract details, and blockchain statistics.
- Faucets: WebApps that distribute small amounts of cryptocurrency for free.
- Metamask: Browser extension enabling interaction with the Ethereum blockchain and accessing dApps.

## Methodology
1. Setup Go Ethereum Node on local machine with Sepolia
2. Develop Smart contracts and upload to Sepolia for Testing
3. Implement various caching algorithms on the go ethereum local copy
4. Develop a script to call the smart contracts and log the latency
5. Run the script on the various caching policy implementations and benchmark the same. 
6. Compare and Contrast the caching policies in terms of their performance.

We Implemented 6 different Caching Policies: 
1. First In First Out (FIFO)
2. Last In First Out (LIFO)
3. Least Recently Used (LRU)
4. Most Recently Used (MRU)
5. Random Replacement (RR)
6. Least Frequently Used (LFU)

Each cache is updated at a time duration of 10 seconds.    

The following are the smart contracts implemented to check for eth calls:
1. Simple Set and Get Message
2. Simple counter 
3. Voting contract
4. Auction
5. Banking
6. Marketplace
7. To-do list
8. Identity Verification
9. Personal Information Storage
10. A reward Mechanism Contract

## Results
Latency for caching policies of diffrent sizes.
![cache_size_3](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/2f897433-3cfc-4129-8f2b-ccf27d34949f)

![cache_size_5](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/bd192e23-8e1e-43a0-bd79-6662c5463b4a)

![cache_size_8](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/dc2c5cca-277d-4fa3-ad87-346ffb59f96c)

Hit-Miss Ratio (For 100 calls)

![hit_miss_ratio](https://github.com/mirchandani-mohnish/cachingForGeth/assets/80059522/c5c12272-e884-492d-971a-37dad66a4f98)


## Conclusion
- Caching across all policies generally leads to similar average results.
- A lack of caching layer also shows similar results to that of a caching layer at the RPC
- Different contracts tend to show slightly different outputs only: The latency does not depend on the contract. 
- Hit/Miss ratio generally increases with cache size. 
- LFU observed a better Hit/Miss ratio compared to other caching policies.




