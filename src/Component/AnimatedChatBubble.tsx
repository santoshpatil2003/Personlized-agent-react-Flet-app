import React from 'react';
import { Box, Typography } from '@mui/material';

const AnimatedChatBubble: React.FC = () => {
    return (
        <Box
            sx={{
                margin: '10px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Typography>Thinking</Typography>
            <AnimatedDots />
        </Box>
    );
};

// A simple animated dots component
const AnimatedDots: React.FC = () => {
    const [dots, setDots] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                if (prevDots.length >= 3) {
                    return '';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <span>{dots}</span>;
};

export default AnimatedChatBubble;