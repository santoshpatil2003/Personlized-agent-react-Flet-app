import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { LLMChain } from "langchain/chains";
import { ipcRenderer } from 'electron';
import {
    QueryEngineTool,
    GeminiEmbedding,
    Gemini,
    // StorageContext,
    // PromptTemplate,
    Settings,
    // QueryPipeline,
    ReActAgent,
    ChatEngineParamsNonStreaming,
    storageContextFromDefaults,
    VectorStoreIndex,
    ChatHistory,
    // ChatMessage,
    ContextChatEngine,
    GEMINI_MODEL,
    GEMINI_EMBEDDING_MODEL,
    SimpleChatHistory
    // TextQaPrompt
} from "llamaindex";

// import { Document, VectorStoreIndex, storageContextFromDefaults } from "./src";

dotenv.config();
const api_key = process.env.GOOGLE_API_KEY || "AIzaSyCUUXynNiEloPn_zQiJ44cdl6LxkTIKBXI";
process.env.GOOGLE_API_KEY = api_key;

const format_upload = async (context: string, agent_id: string) => {
    const format1 = context;

    const userDataPath = await ipcRenderer.invoke('get-user-data-path');
    const dir = path.join(userDataPath, "Backend", "Brain", agent_id);
    const filePath = path.join(dir, "task.txt");

    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, format1, 'utf-8');
    } else {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, format1, 'utf-8');
    }
}

const check_first = async (agent_id: string) => {
    const userDataPath = await ipcRenderer.invoke('get-user-data-path');
    const url = path.join(userDataPath, "Backend", "Brain", agent_id);
    return fs.existsSync(url) && fs.readdirSync(url).length > 0;
}

const get_data = async (agent_id: string) => {
    const userDataPath = await ipcRenderer.invoke('get-user-data-path');
    const url = path.join(userDataPath, "Backend", "Brain", agent_id, "task.txt");


    // const url = path.join("Backend", "Brain", agent_id, "task.txt");
    return fs.readFileSync(url, 'utf-8');
}

class AgentEdit {
    private edit: boolean = false;

    get_edit(): boolean {
        return this.edit;
    }

    update_edit(edit: boolean): void {
        this.edit = edit;
    }
}

interface ChatMessage<AdditionalMessageOptions = {}> {
    role: 'human' | 'assistant';
    content: string;
    options?: AdditionalMessageOptions;
}

class Agent {
    private agent_id: string;
    private agent_edit: AgentEdit;
    private chatHistory?: ChatMessage[];
    private llm: Gemini;
    private embed_model: GeminiEmbedding;
    private query: string = "";
    // private chatHistory: ChatHistory;

    constructor(agent_id: string, agent_edit: AgentEdit) {
        this.agent_id = agent_id;
        this.agent_edit = agent_edit;
        // this.chatHistory = chat_history;
        this.llm = new Gemini({ model: GEMINI_MODEL.GEMINI_PRO_1_5 });
        this.embed_model = new GeminiEmbedding({ model: GEMINI_EMBEDDING_MODEL.EMBEDDING_001 });
        Settings.embedModel = this.embed_model;
        Settings.llm = this.llm;
    }

    async initialize(chatHistoryPromise: Promise<ChatMessage[]>): Promise<void> {
        this.chatHistory = await chatHistoryPromise;
    }

    get_query(): string {
        return this.query;
    }

    update_query(query: string): void {
        this.query = query;
    }

    async agent(user_input: string): Promise<string> {
        const userDataPath = await ipcRenderer.invoke('get-user-data-path');
        const embed_url = path.join(userDataPath, 'Backend', 'EmbeddedFiles', this.agent_id);
        const storage_context = await storageContextFromDefaults({ persistDir: embed_url });
        const index1 = await VectorStoreIndex.init({ storageContext: storage_context });
        const knowledge = index1.asQueryEngine();

        const query_engine_tools1 = [
            new QueryEngineTool({
                queryEngine: knowledge,
                metadata: {
                    name: "KnowledgeBase",
                    description: "Provides information about Content you should write as a copywriter. Use a detailed plain text question as input to the tool."
                }
            })
        ];

        const pack = new ReActAgent({ tools: query_engine_tools1, llm: this.llm, chatHistory: this.chatHistory, verbose: true });

        if (!check_first(this.agent_id) || this.agent_edit.get_edit()) {
            const response1 = await pack.chat({message: user_input});
            return response1.response;
        } else {
            const response1 = await pack.chat({message: user_input});
            const get_format = get_data(this.agent_id);
            return this.rewrite(response1.response, await get_format);
        }
    }

    // Define a custom prompt
    // private newTextQaPrompt: TextQaPrompt = ({ context, query }) => {
    //     const prompt = `Rewrite the below context
    //                 -------------------------------
    //                 ${context}
    //                 -------------------------------
    //                 in the given below format (not same but similar to it).
    //                 Format: ${query}
    //             `;
    //     return prompt
    //     // return `Context information is below.
    //     //     ---------------------
    //     //     ${context}
    //     //     ---------------------
    //     //     Given the context information and not prior knowledge, answer the query.
    //     //     Answer the query in the style of a Sherlock Holmes detective novel.
    //     //     Query: ${query}
    //     //     Answer:`;
    // };

    async rewrite(context: string, format: string): Promise<string> {
        const prompt = `Rewrite the below context
                    -------------------------------
                    {context}
                    -------------------------------
                    in the given below format (not same but similar to it).
                    Format: {format}
                `;
        const template_var_mappings = { "context": "context", "format": "format" };
        // const prompt_tmpl = new PromptTemplate({ template: prompt, templateVarMappings: template_var_mappings });
        const prompt_tmpl = new PromptTemplate({
            template: prompt,
            inputVariables: ['context' , 'format'],
        });
        const formatprompt = prompt_tmpl.format({
            context: context,
            format: format
        })
        // const p = new QueryPipeline({ chain: [prompt_tmpl, this.llm], verbose: true });
        // const llm2 = new Gemini({ model: GEMINI_MODEL.GEMINI_PRO_1_5 });
        const llm2 = new ChatGoogleGenerativeAI({
            model: "gemini-pro",
        })
        const chain = prompt_tmpl.pipe(llm2).pipe(new StringOutputParser());
        // const x = new Gemini().chat({})

        const response = await chain.invoke({ context: context, format: format });


        // const output = await p.run({ context: context, format: format });
        return response.toString();
    }
}

export { Agent, AgentEdit, format_upload, check_first, get_data };