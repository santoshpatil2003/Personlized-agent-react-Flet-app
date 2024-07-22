import React from 'react';
import Signin from './Pages/Signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// import Home from './components/Home';
// import AgentsPage from './components/AgentsPage';
// import { AgentsData, UserData } from './Database/AgentsData';
// import { AgentEdit } from './Backend/Fastapi';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#070C12',
        },
    },
});

interface SigninProps {
    agentData: any; // Replace 'any' with the correct type for agentData
    userData: any; // Replace 'any' with the correct type for userData
    
}

const App: React.FC<SigninProps> = ({ agentData, userData}) => {
    // const agentsData = new AgentsData();
    // const agentEdit = new AgentEdit();
    // const userData = new UserData();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Signin agentData={agentData} userData={userData}/>
        </ThemeProvider>
    );
};

export default App;


// import React from 'react';
// import Signin from './Pages/Signin';
// import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';

// const App: React.FC = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Signin />} />
//                 {/* Uncomment and add other routes as needed */}
//                 {/* <Route path="/Home" element={<Home />} />
//                 <Route path="/:agentId" element={<AgentsPage />} /> */}
//             </Routes>
//         </BrowserRouter>
//     );
// };
// const Home: React.FC = () => <h1>Home</h1>;

// const App: React.FC = () => {
//     return (<Signin />);
// };

// export default App;

