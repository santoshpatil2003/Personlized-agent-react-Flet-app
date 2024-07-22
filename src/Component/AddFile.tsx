// App.tsx
import React, { useState, useEffect } from 'react';
import { AddFileButton } from './AddFileButton';
import { IconBu } from './IconButton';
import { FileU } from '../Backend/FileUpload';
import { Embedding } from '../Backend/Embedding';
import { Button, List, ListItem, CircularProgress } from '@mui/material';
import { ipcRenderer } from 'electron';

interface AddFileProps {
    agentId: string;
}

const AddFile: React.FC<AddFileProps> = ({ agentId }) => {
    const [files, setFiles] = useState<string[]>([]);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done'>('idle');
    const embedding = new Embedding(agentId);

    useEffect(() => {
        const getFiles = async () => {
            try {
                const existingFiles = await ipcRenderer.invoke('get-files', agentId);
                setFiles(existingFiles);
            } catch (error) {
                console.error('Error getting files:', error);
            }
        };
        getFiles();
    }, [agentId]);

    const click = async () => {
        try {
            const result = await ipcRenderer.invoke('show-open-dialog');
            if (!result.canceled && result.filePaths.length > 0) {
                const newFiles = await ipcRenderer.invoke('upload-files', agentId, result.filePaths);
                setFiles(newFiles);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const uploadFiles = async () => {
        setUploadStatus('uploading');
        try {
            await embedding.DataSaver();
            setUploadStatus('done');
        } catch (error) {
            console.error('Error in DataSaver:', error);
            setUploadStatus('idle');
        }
    };

    return (
        <div style={{ backgroundColor: '#13121D', height: 250, width: 250, margin: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <AddFileButton click={click} />
                <List style={{ backgroundColor: '#13121D', height: 100, width: 250, padding: 10, overflow: 'auto' }}>
                    {files.map((file, index) => (
                        <ListItem key={index} style={{ height: 25 }}>
                            {file}
                            <IconBu name={file} fil={new FileU(agentId)} agent_id={agentId} filelist={files} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    onClick={uploadFiles}
                    disabled={files.length === 0 || uploadStatus === 'done'}
                    style={{ backgroundColor: '#13121D', height: 50, width: 115, padding: 10, cursor:'pointer', color: "white" }}
                >
                    {uploadStatus === 'uploading' ? <CircularProgress size={24} /> : uploadStatus === 'done' ? 'Done' : 'Upload'}
                </Button>
            </div>
        </div>
    );
};

export default AddFile;




















// // App.tsx
// import React, { useState, useEffect } from 'react';
// import { AddFileButton } from './AddFileButton';
// import { IconBu } from './IconButton';
// import { FileU } from '../Backend/FileUpload';
// import { Embedding } from '../Backend/Embedding';
// import { Button, List, ListItem, CircularProgress } from '@mui/material';
// import * as remote from '@electron/remote';

// interface AddFileProps {
//     agentId: string;
// }

// const AddFile: React.FC<AddFileProps> = ({ agentId }) => {
//     const [files, setFiles] = useState<string[]>([]);
//     const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done'>('idle');
//     const embedding = new Embedding(agentId);

//     useEffect(() => {
//         const url = `Backend/Files/${agentId}`;
//         if (remote.require('fs').existsSync(url)) {
//             const fil = new FileU(agentId);
//             setFiles(fil.getfile());
//         }
//     }, [agentId]);

//     const click = async () => {
//         console.log("click add file")
//         const result = await remote.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
//         console.log("click add file1")
//         if (!result.canceled && result.filePaths.length > 0) {
//             const fil = new FileU(agentId);
//             result.filePaths.forEach((path: string) => {
//                 const name = path.split('/').pop() || '';
//                 fil.Filesupload(path, name);
//             });
//             setFiles(fil.getfile());
//         }
//         console.log("click add file2")
//     };

//     const uploadFiles = async () => {
//         setUploadStatus('uploading');
//         await embedding.DataSaver();
//         setUploadStatus('done');
//     };

//     return (
//         <div style={{ backgroundColor: '#13121D', height: 250, width: 250, margin: 0 }}>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
//                 <AddFileButton click={click} />
//                 <List style={{ backgroundColor: '#13121D', height: 100, width: 250, padding: 10, overflow: 'auto' }}>
//                     {files.map((file, index) => (
//                         <ListItem key={index} style={{ height: 25 }}>
//                             {file}
//                             <IconBu name={file} fil={new FileU(agentId)} agent_id={agentId} filelist={files} />
//                         </ListItem>
//                     ))}
//                 </List>
//                 <Button
//                     variant="contained"
//                     onClick={uploadFiles}
//                     disabled={files.length === 0 || uploadStatus === 'done'}
//                     style={{ backgroundColor: '#13121D', height: 50, width: 115, padding: 10, cursor:'pointer' }}
//                 >
//                     {uploadStatus === 'uploading' ? <CircularProgress size={24} /> : uploadStatus === 'done' ? 'Done' : 'Upload'}
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default AddFile;