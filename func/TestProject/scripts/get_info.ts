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
    const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });
    console.log(wallet.address);

    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed 3:");
    }
}
