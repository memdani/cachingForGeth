# RPC Cache Implementation for Go-Ethereum 

## Problem Statement
An implementation and benchmarking of various cache policies on the go ethereum implementation of a blockchain node in order to possibly improve read call reverts. 

## Architecture with Technology Components
![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/eb9157ee-c2ea-4480-94a9-f0d2739c15c2)

## Logical Design
![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/ee88f262-62cc-4c50-8fb8-a81e6636e0eb)

## Platform Brief
- Go-ethereum: Implements Ethereum blockchain in Go, used for Ethereum network interaction.
- Solidity: Programming language for writing smart contracts.
- Sepolia: No information found.
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

![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/50f71815-c629-48bc-b9a3-c06aff1b64cc)

![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/b1857936-1364-4c75-89b9-326059f0aac8)

![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/13ccbcfe-a2b9-4073-a198-3a7e84bd2f2c)

Hit-Miss Ratio (For 100 calls)

![image](https://github.com/mirchandani-mohnish/cachingForGeth/assets/87660206/bb658e84-7847-454a-b3ba-dfd4d4f29204)

## Conclusion
- Caching across all policies generally leads to similar average results.
- A lack of caching layer also shows similar results to that of a caching layer at the RPC
- Different contracts tend to show slightly different outputs only: The latency does not depend on the contract. 
- Hit/Miss ratio generally increases with cache size. 
- LFU observed a better Hit/Miss ratio compared to other caching policies.




