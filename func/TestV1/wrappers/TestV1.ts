import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TestV1Config = {};

export function testV1ConfigToCell(config: TestV1Config): Cell {
    return beginCell().storeUint(0, 64).endCell();
}

export class TestV1 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TestV1(address);
    }

    static createFromConfig(config: TestV1Config, code: Cell, workchain = 0) {
        const data = testV1ConfigToCell(config);
        const init = { code, data };
        return new TestV1(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    // my contract functions
    async sendMsg(provider: ContractProvider, via: Sender, value: bigint, x: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(x, 64).endCell(),
        });
    }

    async getSum(provider: ContractProvider) {
        const result = (await provider.get('get_value', [])).stack;
        return result.readBigNumber();
    }
}
