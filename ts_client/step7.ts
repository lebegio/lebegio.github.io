import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
// to run : npx tsx src/index.ts
async function main() {
  // open wallet v4 (notice the correct wallet version here)
  // const mnemonic = "unfold sugar water homeess sugar water unfold sugar water unfold sugar water unfold sugar water unfold sugar water unfold sugar water unfold sugar water"; // your 24 secret words (replace ... with the rest of the words)
  const mnemonic = "a a a a a a a a a a a a a a a a a a a a a a a a"; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // print wallet address
  console.log(wallet.address.toString({ testOnly: true }));

  // print wallet workchain
  console.log("workchain:", wallet.address.workChain);
}

main();
