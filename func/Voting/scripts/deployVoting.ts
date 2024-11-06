import { toNano } from '@ton/core';
import { Voting } from '../wrappers/Voting';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const voting = provider.open(Voting.createFromConfig({}, await compile('Voting')));

    await voting.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(voting.address);

    // run methods on `voting`
}
