// import { toNano } from '@ton/core';
// import { getHttpEndpoint } from "@orbs-network/ton-access";
// import { TonClient, Address } from "@ton/ton";
// import { TestV1 } from '../wrappers/TestV1';

// export async function run() {
//     // initialize ton rpc client on testnet
//     const endpoint = await getHttpEndpoint({ network: "testnet" });
//     const client = new TonClient({ endpoint });

//     // open Counter instance by address
//     const counterAddress = Address.parse('EQDxH8kLGg31ephmq0SmxTf8G4OBvJ90PD9qHAV94YKvREtp');
//     const testV1 = new TestV1(counterAddress);
//     const testV0Contract = client.open(testV1);

//     var sum = await testV0Contract.getSum();
//     console.log(`Sum from the contract: ${sum}`);
// }

import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import { TestV1 } from "../wrappers/TestV1"; // this is the interface class we just implemented
import { CONTRACT_ADDRESS, MNEMONIC } from "../../private_config"

export async function run() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // open Counter instance by address
  const counterAddress = Address.parse('EQDL-eoDXFs76DY7IE05aKHU0v8Fj0ff5urjkNDCykxNYDsZ'); // replace with your address from step 8
  const testV1 = new TestV1(counterAddress);
  const testV1Contract = client.open(testV1);

  // call the getter on chain
  const counterValue = await testV1Contract.getSum();
  console.log("value:", counterValue.toString());
}
