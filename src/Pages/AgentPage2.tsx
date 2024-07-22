import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Button, Typography, Container, Grid, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../Component/SideBar';
import Chat from '../Component/Chat';
import { useNavigate, useParams } from 'react-router-dom';

interface AgentData {
    agent_name: string;
    _id: string;
}

interface AgentsPageProps {
    agent_edit: any; // Replace with proper type
    agent_data: any; // Replace with proper type
}

const AgentsPage2: React.FC<AgentsPageProps> = ({ agent_edit, agent_data }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [agentData, setAgentData] = useState<AgentData | null>(null);
    const [chatKey, setChatKey] = useState(0);
    const navigate = useNavigate();
    const { agentId } = useParams<{ agentId: string }>();

    const delete_all_history = async (agent_id: string) => {
        setIsDeleting(true);
        const x = await agent_data.delete_agent_history(agent_id, agent_data.uuid);
        if (x) {
            setChatKey(prevKey => prevKey + 1);
        }
        setIsDeleting(false);
    };

    const view_pop = () => {
        navigate("/home");
    };

    useEffect(() => {
        const fetchAgentData = async () => {
            const agents = await agent_data.get_agents_list(agent_data.uuid);
            const agent = agents.find((a: AgentData) => a._id === agentId);
            setAgentData(agent || null);
        };
        fetchAgentData();
    }, [agentId, agent_data]);

    if (!agentData) {
        return <CircularProgress />;
    }
    // #070C12
    return (
        <Container style={{ backgroundColor: '#070C12', height: '100vh', padding: 0, margin:0, width: "100vw", maxWidth: "100vw" }}>
            <AppBar position="static" style={{ backgroundColor: '#13121D', margin:0, padding: 0}}>
                <Grid container alignItems="center">
                    <Grid item style={{marginLeft: "10px"}}>
                        <IconButton edge="start" color="inherit">
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" align="center">
                            {agentData.agent_name}
                            {/* {"You"} */}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            onClick={() => delete_all_history(agentData._id)}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <CircularProgress size={24} /> : "Delete History"}
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container>
                <Grid item style={{marginTop: 0}} >
                    <Sidebar
                        agent_id={agentData._id}
                        agent_edit={agent_edit}
                        agentdata={agent_data}
                    />
                </Grid>
                <Grid item xs>
                    <Chat
                        key={chatKey}
                        agent_id={agentData._id}
                        agent_edit={agent_edit}
                        agentdata={agent_data}
                        agentData={agentData}
                    />
                </Grid>
            </Grid>
        </Container>
        // <Container style={{ backgroundColor: 'red', height: '100vh', padding: 0, margin:0, width: "100vw", maxWidth: "100vw" }}>

        // </Container>
    );
};

export default AgentsPage2;