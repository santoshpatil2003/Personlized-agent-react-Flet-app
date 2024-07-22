// AddFileButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddFileButtonProps {
    click: () => void;
}

export const AddFileButton: React.FC<AddFileButtonProps> = ({ click }) => {
    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={click}
            style={{
                height: 100,
                width: 200,
                backgroundColor: "#13121D",
                color: "white",
                borderRadius: 5,
                cursor: "pointer"
            }}
        >
            Add File
        </Button>
    );
};


export default AddFileButton;