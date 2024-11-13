import { toNano } from '@ton/core';
import { TestV1 } from '../wrappers/TestV1';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const testV1 = provider.open(TestV1.createFromConfig({}, await compile('TestV1')));

    await testV1.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(testV1.address);

    // run methods on `testV1`
}
