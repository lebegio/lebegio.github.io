import { toNano } from '@ton/core';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address, WalletContractV3R2 } from "@ton/ton";
import { TestV1 } from '../wrappers/TestV1';
import { MNEMONIC } from "../../private_config"
import { mnemonicToWalletKey } from "@ton/crypto";

export async function run() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // wallet sender
    const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });
    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed");
    } else {
        console.log('wallet is deployed')
    }
    console.log(0);

    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    console.log(10);
    const walletSender = walletContract.sender(key.secretKey);
    console.log(20);
    const seqno = await walletContract.getSeqno();

    console.log(1);
    // open Counter instance by address
    const counterAddress = Address.parse('EQDL-eoDXFs76DY7IE05aKHU0v8Fj0ff5urjkNDCykxNYDsZ');
    const testV1 = new TestV1(counterAddress);
    const testV1Contract = client.open(testV1);

    console.log(2);
    await testV1Contract.sendMsg(walletSender, toNano('0.05'), 123n);
    
    console.log(3);
    // wait until confirmed
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }
    console.log("transaction confirmed!");
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}