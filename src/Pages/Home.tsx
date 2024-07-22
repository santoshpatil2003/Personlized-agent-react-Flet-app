import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {AgentEdit} from "../Backend/AgentData_UserData"
// import RenderAgentCard from '../Component/AgentsBody';
import AgentsPage from './AgentPage';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface AgentsData {
    update_name: (name: string) => void;
    get_name: () => string;
    create_agent: (name: string, uuid: string) => void;
    delete_agent: (agent_id: string, uuid: string) => Promise<void>;
    get_agents_list: (uuid: string) => Promise<Array<{ agent_name: string, _id: string, chat_history: [] }>>;
    uuid: string;
}

// interface AgentEdit {
//     edit: boolean;
//     get_edit:() => boolean;
//     update_edit:() => void;
// }

interface HomeProps {
    agentsData: AgentsData;
    // route: Object[];
    agentedit: AgentEdit;
}

const Home: React.FC<HomeProps> = ({ agentsData, agentedit}) => {
    const navigate = useNavigate();
    const [agentsList, setAgentsList] = useState<Array<{ agent_name: string, _id: string, chat_history: [] }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#070C12',
            },
        },
    });

    // agentsData.get_agents_list(agentsData.uuid).then((array) => {
    //     console.log(array.length)
    //     array.forEach((element) => {
    //         var x = {
    //             path: `/home/${element._id}`,
    //             element: <ThemeProvider theme={darkTheme}><CssBaseline /><AgentsPage agent_data_i={element} agent_edit={agentedit} agent_data={agentsData} /></ThemeProvider>, 
    //         };
    //         console.log(route)
    //         route.push(x)
    //     });
    //     // for (let index = 0; index < array.length; index++) {
    //     //     const element = array[index];
    //     //     console.log(element._id)
    //     //     var x = {
    //     //         path: `/home/${element._id}`,
    //     //         element: <ThemeProvider theme={darkTheme}><CssBaseline /><AgentsPage agent_data_i={element} agent_edit={agentedit} agent_data={agentsData} /></ThemeProvider>, 
    //     //     };
    //     //     console.log(route)
    //     //     route.push(x)
    //     // }
    // })

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleDelete = (event: React.MouseEvent<HTMLElement>, agent_id: string , uuid: string) => {
        event.stopPropagation();
        agentsData.delete_agent(agent_id, uuid)
        handleMenuClose(event);
    };

    const fetchAgents = async () => {
        try {
            const agents = await agentsData.get_agents_list(agentsData.uuid);
            if (Array.isArray(agents)) {
                setAgentsList(agents);
            } else {
                setError('Failed to fetch agents: Unexpected data format');
            }
        } catch (err) {
            setError('Failed to fetch agents: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [agentsData]);

    const create_new_agent_update = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name_a = e.target.value;
        agentsData.update_name(name_a);
        setAgentName(name_a);
    };

    const create_new_agent = () => {
        const n = agentsData.get_name();
        agentsData.create_agent(n, agentsData.uuid);
        setOpen(false);
        fetchAgents(); // Refresh the agents list
    };

    const close_dlg_modal = () => {
        setOpen(false);
    };

    const open_dlg_modal = () => {
        setOpen(true);
    };

    const handleAgentClick = (agentId: string) => {
        navigate(`/home/${agentId}`);
    };

    const renderAgentCard = (agent: { agent_name: string, _id: string }) => (
        <Grid item key={agent._id} xs={12} sm={6} md={4} lg={3}>
            <div style={{ position: 'relative', width: '75%', paddingTop: '100%' }}>
                <Card
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '67%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        borderRadius: '8px',
                        margin: 0
                    }}
                    onClick={() => handleAgentClick(agent._id)}
                >
                    <div style={{ alignSelf: 'flex-end', bottom: '85%', position: 'absolute'}}>
                        <IconButton onClick={handleMenuOpen} size="small">
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={(event) => handleDelete(event, agent._id, agentsData.uuid)}>Delete</MenuItem>
                        </Menu>
                    </div>
                    <CardContent>
                        <Typography align="center">{agent.agent_name}</Typography>
                    </CardContent>
                </Card>
            </div>
        </Grid>
    );

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Grid container spacing={1} style={{ padding: '8px' }}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div style={{ position: 'relative', width: '75%', paddingTop: '100%' }}>
                        <Card
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: '67%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: '#202328', // You can adjust this color
                                borderRadius: '8px', // Optional: for rounded corners
                                margin: 0
                            }}
                            onClick={open_dlg_modal}
                        >
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography>Add Agent</Typography>
                                {/* <Typography variant="h2" component="div" style={{ color: '#ffffff' }}>
                                    +
                                </Typography> */}
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                {agentsList.map(renderAgentCard)}
                {/* {renderAgentCard({agent_name: "youtube", _id: '12345'})} */}
            </Grid>

            <Dialog
                open={open}
                onClose={close_dlg_modal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        color: 'white',
                        backgroundColor: '#13121D',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">Create Your Agent</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name Your Agent"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={create_new_agent_update}
                        value={agentName}
                        InputProps={{
                            style: { borderColor: '#202328', color: 'white', textDecorationColor: 'white' },

                        }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close_dlg_modal}>Cancel</Button>
                    <Button onClick={create_new_agent} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Home;