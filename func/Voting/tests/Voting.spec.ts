import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Voting } from '../wrappers/Voting';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Voting', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Voting');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let voting: SandboxContract<Voting>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        voting = blockchain.openContract(Voting.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await voting.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: voting.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and voting are ready to use
    });
});
