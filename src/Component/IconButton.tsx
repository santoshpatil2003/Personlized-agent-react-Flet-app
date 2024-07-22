// IconBu.tsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { FileU } from '../Backend/FileUpload'; // Assuming FileU is converted to TypeScript

interface IconBuProps {
    name: string;
    fil: FileU;
    agent_id: string;
    filelist: string[];
    // onDelete: () => void; // Callback to update parent component
}

export const IconBu: React.FC<IconBuProps> = ({ name, fil, agent_id, filelist }) => {
    const deletefile = () => {
        fil.delete_file(`Backend/Files/${agent_id}/${name}`);
        // onDelete(); // Call the callback to update the parent component
    };

    return (
        <IconButton
            onClick={deletefile}
            size="small"
        >
            <CancelIcon sx={{ fontSize: 17 }} />
        </IconButton>
    );
};