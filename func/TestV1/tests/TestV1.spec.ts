import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TestV1 } from '../wrappers/TestV1';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TestV1', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TestV1');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let testV1: SandboxContract<TestV1>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testV1 = blockchain.openContract(TestV1.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await testV1.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: testV1.address,
            deploy: true,
            //success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and testV1 are ready to use
    });
});
