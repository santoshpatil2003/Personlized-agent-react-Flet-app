import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, CircularProgress, Snackbar } from '@mui/material';

interface SigninProps {
    agentData: any; // Replace 'any' with the correct type for agentData
    userData: any; // Replace 'any' with the correct type for userData

    // santoshpatil2003@gmail.com
}

const Signin: React.FC<SigninProps> = ({ agentData, userData}) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const addUser = async () => {
        setIsLoading(true);
        const user = await userData.add_user();
        
        setIsLoading(false);

        if (user === 1) {
            setSnackbarMessage("User with that email already exists");
        } else if (user === false) {
            setSnackbarMessage("Confirm password is incorrect");
        } else if (user === -2) {
            setSnackbarMessage("Please provide valid credentials. The password must be at least 6 characters long and include at least one letter. The email address must be in a proper format.");
        } else if (user === -1) {
            setSnackbarMessage("Some error occurred, check your internet connection and try again");
        } else {
            userData.createUser(agentData.name, user.uid);
            agentData.set_uuid(user.uid);
            if (agentData.get_user_data(user.uid) !== null) {
                navigate("/home")
            }
        }

        setSnackbarOpen(true);
    };

    const signInUser = async () => {
        console.log("hi2-1")
        setIsLoading(true);
        console.log("hi2-2")
        const uid = await userData.check_user();
       
        console.log("hi2-3")
        setIsLoading(false);
        console.log(uid)

        if (uid === 0) {
            setSnackbarMessage("No user found");
        } else if (uid === false) {
            setSnackbarMessage("Password is incorrect");
        } else if (uid === 1) {
            setSnackbarMessage("Add valid credentials");
        } else {
            console.log(uid)
            agentData.set_uuid(uid);
            if (agentData.get_user_data(uid) !== null) {
                navigate("/home")
            }
        }

        setSnackbarOpen(true);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                {isSignUp ? "Sign Up" : "Log In"}
            </Typography>
            {isSignUp && (
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    onChange={(e: { target: { value: any; }; }) => userData.set_user_name(e.target.value)}
                />
            )}
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                onChange={(e: { target: { value: any; }; }) => userData.set_user_email(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                onChange={(e: { target: { value: any; }; }) => userData.set_user_password(e.target.value)}
            />
            {isSignUp && (
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    onChange={(e: { target: { value: any; }; }) => userData.set_user_cpassword(e.target.value)}
                />
            )}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={isSignUp ? addUser : signInUser}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : (isSignUp ? "Sign Up" : "Log In")}
            </Button>
            <Typography align="center" style={{ marginTop: '1rem' }}>
                {isSignUp ? "I already have an account" : "I don't have an account"}
                <Button color="primary" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Log In" : "Sign Up"}
                </Button>
            </Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default Signin;


// import React from 'react';
// import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';



// const Signin: React.FC = () => {
//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h4" align="center" gutterBottom>
//                 Sign Up
//             </Typography>
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Name"
//                 onChange={(e: { target: { value: any; }; }) => console.log(e.target.value)}
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Email"
//                 onChange={(e: { target: { value: any; }; }) => console.log(e.target.value)}
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 type="password"
//                 onChange={(e: { target: { value: any; }; }) => console.log(e.target.value)}
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Confirm Password"
//                 type="password"
//                 onChange={(e: { target: { value: any; }; }) => console.log(e.target.value)}
//             />
//             <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//             >
//                 Sign Up
//             </Button>
//             <Typography align="center" style={{ marginTop: '1rem' }}>
//                 I already have an account
//                 <Button color="primary">
//                     Log In
//                 </Button>
//             </Typography>
//             <Snackbar
//                 open={false}
//                 autoHideDuration={6000}
//                 onClose={() => {}}
//                 message=""
//             />
//         </Container>
//     );
// };

// export default Signin;


// import React from 'react';
// import './Signin.css';

// const Signin: React.FC = () => {
//     return (
//         <div className="container">
//             <h2>Sign Up</h2>
//             <form>
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input type="text" id="name" />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                     <input type="password" id="confirmPassword" />
//                 </div>
//                 <button type="submit">Sign Up</button>
//             </form>
//             <p>
//                 I already have an account
//                 <button className="link-button">Log In</button>
//             </p>
//         </div>
//     );
// };

// export default Signin;

