import * as fs from "fs";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4 } from "@ton/ton";

import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";

export default class Counter implements Contract {

    static createForDeploy(code: Cell, initialCounterValue: number): Counter {
        const data = beginCell()
            .storeUint(initialCounterValue, 64)
            .endCell();
        const workchain = 0; // deploy to workchain 0
        const address = contractAddress(workchain, { code, data });
        return new Counter(address, { code, data });
    }

    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}

export async function run() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // prepare Counter's initial code and data cells for deployment
    const counterCode = Cell.fromBoc(fs.readFileSync("build/counter.cell"))[0]; // compilation output from step 6
    const initialCounterValue = Date.now(); // to avoid collisions use current number of milliseconds since epoch as initial value

    // exit if contract is already deployed
    const contract_address = new Address(0, new Buffer('0QACWl8Gz3E77Nf4asZGFyNcAqTvu6yVsN9O3p7qvgKeG8o9'));
    console.log("contract address:", contract_address);
    if (await client.isContractDeployed(contract_address)) {
        return console.log("Counter already deployed");
    }

    // send the deploy transaction
    const counterContract = client.open(counter);
    await counterContract.sendDeploy(walletSender);

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
