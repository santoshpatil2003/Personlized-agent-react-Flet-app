// src/backend/Memory.ts
import { SimpleChatHistory, GEMINI_MODEL, Gemini } from 'llamaindex';
import { AgentsData } from '../Backend/AgentData_UserData';

interface HistoryItem {
    ai: boolean;
    message: string;
}

interface ChatMessage<AdditionalMessageOptions = {}> {
    role: 'human' | 'assistant';
    content: string;
    options?: AdditionalMessageOptions;
}

export class Memory {
    private agentdata: any;
    private agent_id: string;
    private chat_his: SimpleChatHistory;
    private llm: Gemini;

    constructor(agent_id: string, agentdata: any) {
        this.agentdata = agentdata;
        this.agent_id = agent_id;
        this.chat_his = new SimpleChatHistory();
        this.llm = new Gemini({ model: GEMINI_MODEL.GEMINI_PRO_1_5 });
    }

    private async get_his(): Promise<void> {
        // const data = new AgentsData();
        const d = await this.agentdata.get_data_of(this.agent_id, this.agentdata.uuid);

        if (d && d.chat_history) {
            const his: HistoryItem[] = d.chat_history;
            his.forEach(j => {
                const message: ChatMessage = {
                    role: j.ai ? 'assistant' : 'human',
                    content: j.message
                };
                this.chat_his.addMessage(message);
            });
        }
    }

    async memory(): Promise<ChatMessage[]> {
        await this.get_his();
        return this.chat_his.newMessages();
    }
}
