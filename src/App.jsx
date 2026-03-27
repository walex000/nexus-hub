import React, { useState } from 'react';
import Chat from './components/Chat';
import ImageGenerator from './components/ImageGenerator';
import Notes from './components/Notes';
import WebTools from './components/WebTools';

const NexusHub = () => {
    const [notes, setNotes] = useState([]);

    return (
        <div>
            <h1>Nexus Hub</h1>
            <Chat />
            <ImageGenerator />
            <Notes notes={notes} setNotes={setNotes} />
            <WebTools />
        </div>
    );
};

export default NexusHub;
