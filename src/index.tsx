import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter, Outlet, useParams, useLoaderData } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


// santoshpatil2003@gmail.com
// sunny12345


// Assume these imports exist
import Home from './Pages/Home';
import App from "./App";
import AgentsPage from './Pages/AgentPage';
import AgentsPage2 from './Pages/AgentPage2';
import { UserData, AgentEdit, AgentsData } from "./Backend/AgentData_UserData";

// Initialize data objects
const agentsData = new AgentsData();
const agentEdit = new AgentEdit();
const userData = new UserData();

// Create theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#070C12',
    },
  },
});

// Main layout component
const Layout: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

// Loader function to fetch agents
const agentsLoader = async () => {
  if (!agentsData.uuid) return [];
  try {
    const agents = await agentsData.get_agents_list(agentsData.uuid);
    console.log('Loaded agents:', agents); 
    return Array.isArray(agents) ? agents : [];
  } catch (error) {
    console.error("Failed to fetch agents list:", error);
    return [];
  }
};

// Home component that renders agent links
const HomeWithAgents: React.FC = () => {
  // const agents = useLoaderData() as any[];
  return <Home agentsData={agentsData} agentedit={agentEdit}/>;
};

// AgentsPage wrapper that fetches the specific agent
const AgentsPageWrapper: React.FC = () => {
  // const agents = useLoaderData() as any[] | undefined;
  // const { agentId } = useParams<{ agentId: string }>();

  // console.log('Agents:', agents); // Debugging log
  // console.log('Agent ID:', agentId); // Debugging log

  // if (!agents) {
  //   return <div>Loading agents...</div>;
  // }

  // const agent = agents.find((a: any) => a._id === agentId);

  // if (!agent) {
  //   return <div>Agent not found</div>;
  // }

  return <AgentsPage agent_edit={agentEdit} agent_data={agentsData} />;
};

const Root: React.FC = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <App agentData={agentsData} userData={userData} />,
      // element: <AgentsPage2 agent_edit={agentEdit} agent_data={agentsData} />,
    },
    {
      path: '/home',
      element: <Layout />,
      loader: agentsLoader,
      children: [
        {
          index: true,
          element: <HomeWithAgents />,
        },
        {
          path: ':agentId',
          element: <AgentsPage agent_edit={agentEdit} agent_data={agentsData} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

// const Root: React.FC = () => {
//   const router = createHashRouter([
//     {
//       path: '/',
//       element: <App agentData={agentsData} userData={userData} />,
//       // element: <AgentsPage2 agent_edit={agentEdit} agent_data={agentsData} />,
//     },
//     {
//       path: '/home',
//       element: <HomeWithAgents />,
//       loader: agentsLoader,
//       // children: [
//       //   {
//       //     index: true,
//       //     element: <HomeWithAgents />,
//       //   },
//       //   {
//       //     path: ':agentId',
//       //     element: <AgentsPageWrapper />,
//       //   },
//       // ],
//     },
//     {
//       path: '/home/:agentId',
//       element: <AgentsPageWrapper />,
//       loader: agentsLoader,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// Render the app
const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  document.body.style.padding = "0"
  document.body.style.margin = "0"
  root.render(
    // <AgentsPage2 agent_edit={agentEdit} agent_data={agentsData} />
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}