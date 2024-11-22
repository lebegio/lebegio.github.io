export declare class Poll {
    id: number;
    name: string;
    is_active: boolean;
    poll_options: PollOption[];
}
export declare class PollOption {
    id: number;
    name: string;
    win: boolean;
    poll: Poll;
}
