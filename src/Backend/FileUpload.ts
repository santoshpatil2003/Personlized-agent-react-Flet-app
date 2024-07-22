import fs from 'fs';
import path from 'path';

class de {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    get(): string {
        return this.name;
    }
}

class FileU {
    private agent_id: string;

    constructor(agent_id: string) {
        this.agent_id = agent_id;
    }

    Filesupload(filepath: string, filename: string): boolean {
        if (filepath !== "" && filename !== "") {
            try {
                const url = path.join('Backend', 'Files', this.agent_id, filename);
                this.ensureDirectoryExistence(url);
                fs.copyFileSync(filepath, url);
                return true;
            } catch (error) {
                console.error("Error uploading file:", error);
                return false;
            }
        }
        return false;
    }

    getfile(): string[] {
        const url = path.join('Backend', 'Files', this.agent_id);
        try {
            return fs.readdirSync(url);
        } catch (error) {
            console.error("Error getting files:", error);
            return [];
        }
    }

    delete_file(myfile: string): void {
        if (fs.existsSync(myfile)) {
            fs.unlinkSync(myfile);
            // console.log("Removed: %s ", myfile);
        } else {
            throw new Error(`Error: ${myfile} file not found`);
        }
    }

    private ensureDirectoryExistence(filePath: string): void {
        const dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
}

export { de, FileU };