import React, { useState, useEffect } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface MessageProps {
    ai: boolean;
    message: string;
}

const Message: React.FC<MessageProps> = ({ ai, message }) => {
    const [formattedMessage, setFormattedMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        setFormattedMessage(format_str(message));
    }, [message]);

    const copy_clip = () => {
        navigator.clipboard.writeText(formattedMessage);
        setSnackbarOpen(true);
    };

    const format_str = (context: string): string => {
        let c = -1;
        let space_i = 0;
        const l = context.split('');
        if (l.length < 140) return context;

        for (let i = 0; i < l.length; i++) {
            c++;
            if (l[i] === ' ') space_i = i;
            if (l[i] === '\n') c = -1;
            if (c === 140) {
                if (l[i] === ' ') {
                    l[i] = '\n';
                    c = -1;
                } else if (l[i + 1] === ' ') {
                    l[i + 1] = '\n';
                    c = -1;
                } else {
                    l[space_i] = '\n';
                    c = -1;
                }
            }
        }

        return l.filter(char => char !== '*').join('');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: ai ? 'flex-start' : 'flex-end',
            alignItems: 'center',
            width: '73.5vw',
        }}>
            <div style={{
                backgroundColor: '#13121D',
                padding: '10px',
                borderRadius: '5px',
                margin: '10px',
                // backgroundColor: "greenyellow"
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '30px',
                    margin: 0
                }}>
                    <span style={{ color: '#00FFFF' }}>{ai ? 'AI' : 'User'}</span>
                    {ai && (
                        <IconButton size="small" onClick={copy_clip} style={{color: 'white'}}>
                            <ContentCopyIcon fontSize="small"/>
                        </IconButton>
                    )}
                </div>
                <div style={{color: "white"}}>
                    {formattedMessage}
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Text saved on the clipboard"
            />
        </div>
    );
};

export default Message;