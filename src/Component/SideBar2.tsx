import React, { useState } from 'react';
import { Button, CircularProgress, Switch, Box, Container } from '@mui/material';
import AddFile2 from './AddFile2';
import { format_upload } from '../Backend/Fastapi';
import { AgentsData } from '../Backend/AgentData_UserData';

interface SidebarProps {
    // agent_id: string;
    // agent_edit: {
    //     get_edit: () => boolean;
    //     update_edit: (edit: boolean) => void;
    // };
    // agentdata: any;
}

const Sidebar2: React.FC<SidebarProps> = () => {
    const [isUploading, setIsUploading] = useState(false);

    // const agent_edit_handler = () => {
    //     const value = !agent_edit.get_edit();
    //     agent_edit.update_edit(value);
    // };

    // const for_upload = async () => {
    //     setIsUploading(true);
    //     const agent_data = new AgentsData();
    //     const d = await agent_data.get_data_of(agent_id, agentdata.uuid);
    //     const lis: any[] = d.chat_history;
    //     const context = lis[lis.length - 1].message;
    //     await format_upload(context, agent_id);
    //     setIsUploading(false);
    // };

    return (
        <Container
            maxWidth={false}
            style={{margin: 0 ,padding: 0, height: "100vh", width: "25vw", maxHeight: "94vh", backgroundColor: '#13121D' }}
            // sx={{
            //     bgcolor: '#13121D',
            //     height: "90vh",
            //     width: "25vw",
            //     margin: -1,
            //     display: 'flex',
            //     flexDirection: 'column',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            // }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12.5 }}>
                <AddFile2 />
                <Switch/>
                <Button
                    variant="contained"
                    // onClick={for_upload}
                    disabled={isUploading}
                >
                    {isUploading ? <CircularProgress size={24} /> : "Accept"}
                </Button>
            </Box>
        </Container>
    );
};

export default Sidebar2;

