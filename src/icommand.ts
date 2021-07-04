import { Message } from 'discord.js';

export interface ICommand {
    name: string;
    helpDescription: string;
    showInHelp: boolean;
    trigger: (message: Message) => boolean;
    command: (...args: any[]) => Promise<void>;
}
