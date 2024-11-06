import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type VotingConfig = {};

export function votingConfigToCell(config: VotingConfig): Cell {
    return beginCell().endCell();
}

export class Voting implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Voting(address);
    }

    static createFromConfig(config: VotingConfig, code: Cell, workchain = 0) {
        const data = votingConfigToCell(config);
        const init = { code, data };
        return new Voting(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
