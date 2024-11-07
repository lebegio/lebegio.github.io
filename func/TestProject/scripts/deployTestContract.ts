import { toNano } from '@ton/core';
import { TestContract } from '../wrappers/TestContract';
import { compile, NetworkProvider } from '@ton/blueprint';

import * as fs from "fs";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, WalletContractV5R1, WalletContractV3R2 } from "@ton/ton";
import { mnemonicToWalletKey } from "ton-crypto";
import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";

import { CONTRACT_ADDRESS, MNEMONIC } from "../../private_config"

    
//----
export async function run() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    console.log("0");
    // prepare Counter's initial code and data cells for deployment
    // const counter = TestContract.createFromConfig({}, await compile('TestContract'));
    const code = Cell.fromBoc(fs.readFileSync("build/test_contract.cell"))[0]; // compilation output from step 6
    const initialCounterValue = Date.now(); // to avoid collisions use current number of milliseconds since epoch as initial value
    console.log("1");
    // init 
    const data = beginCell()
      .storeUint(initialCounterValue, 64)
      .endCell();
    const workchain = 0; // deploy to workchain 0
    
    const address = contractAddress(workchain, { code, data });
    console.log("2");
    var counter =  new TestContract(address, { code, data });
    console.log("3");
    // exit if contract is already deployed
    console.log("contract address(not wallet):", counter.address.toString());
    if (await client.isContractDeployed(counter.address)) {
      return console.log("Counter already deployed(why already deployed)");
    }
  
    // open wallet v4 (notice the correct wallet version here)
    const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });
    console.log(wallet.address);
    if (!await client.isContractDeployed(wallet.address)) {
      return console.log("wallet is not deployed");
    }
    console.log(4);
    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    console.log("4.1");
    const walletSender = walletContract.sender(key.secretKey);
    console.log("4.2");
    const seqno = await walletContract.getSeqno();

    console.log(seqno);
    // send the deploy transaction
    const counterContract = client.open(counter);
    console.log(5);
    await counterContract.sendDeploy(walletSender);
    console.log(6);
    // wait until confirmed
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
      console.log("waiting for deploy transaction to confirm...");
      await sleep(1500);
      currentSeqno = await walletContract.getSeqno();
    }
    console.log("deploy transaction confirmed!");
  }
  
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
