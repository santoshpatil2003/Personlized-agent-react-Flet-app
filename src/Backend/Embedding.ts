import * as path from 'path';
import dotenv from 'dotenv';
import { app, ipcRenderer } from 'electron';
// import {path} from 'path'
import {
    // Document,
    VectorStoreIndex,
    SimpleDirectoryReader,
    Settings,
    GeminiEmbedding,
    GEMINI_EMBEDDING_MODEL,
    GEMINI_MODEL
} from "llamaindex";

class Embedding {
    private agent_id: string;

    constructor(agent_id: string) {
        this.agent_id = agent_id;
    }

    async DataSaver(){
        
        const userDataPath = await ipcRenderer.invoke('get-user-data-path');
        const url = path.join(userDataPath, 'Backend', 'Files', this.agent_id);
        // const url = path.join('Backend', 'Files', this.agent_id);
        // const getFiles = async () => {
        //     try {
        //         const existingFiles = await ipcRenderer.invoke('get-files', this.agent_id);
        //         // setFiles(existingFiles);
        //         return existingFiles
        //     } catch (error) {
        //         console.error('Error getting files:', error);
        //     }
        // };
        // const fil = getFiles();
        console.log("start Embedding");

        dotenv.config();
        const API_KEY = process.env.GOOGLE_API_KEY;
        if (!API_KEY) {
            throw new Error("GOOGLE_API_KEY is not set in the environment variables");
        }

        // const model_name = "models/embedding-001";
        // Set up the embedding model
        Settings.embedModel = new GeminiEmbedding({
            model: GEMINI_EMBEDDING_MODEL.EMBEDDING_001,
            // apiKey: API_KEY
        });

        // Load documents
        const documents = await new SimpleDirectoryReader().loadData({directoryPath: url});

        // Create index
        const index = await VectorStoreIndex.fromDocuments(documents);

        // Persist the index
        
        // const embed_url = path.join('Backend', 'EmbeddedFiles', this.agent_id);
        const embed_url = path.join(userDataPath, 'Backend', 'EmbeddedFiles', this.agent_id);
        await index.indexStore.persist(embed_url);
    }
}

export { Embedding };