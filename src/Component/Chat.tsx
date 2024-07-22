// src/components/Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import AnimatedChatBubble from './AnimatedChatBubble';
import { Agent } from '../Backend/Fastapi';
import { Memory } from './Memory';

interface ChatProps {
    agent_id: string;
    agent_edit: any; // Replace with proper type
    agentdata: any; // Replace with proper type
    agentData: any;
}

const Chat: React.FC<ChatProps> = ({ agent_id, agent_edit, agentdata, agentData }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const listRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    const memory = new Memory(agent_id, agentdata).memory();

    const agent = new Agent(agent_id, agent_edit);

    agent.initialize(memory);

    useEffect(() => {
        console.log(`ag_id is :  ${agent_id}`)
        console.log(`ag_id2 is :  ${agentData._id}`)
        console.log(`ag_id2_his is :  ${agentData.chat_history}`)
        if (agentData) {
            const d = agentData
            
            if (d.chat_history.length !== 0) {
                console.log(`data is :  ${d.chat_history[0]}`)
                console.log(`data is len :  ${d.chat_history.length}`)
                console.log(`data is ai :  ${d.chat_history[0].ai}`)
                console.log(`data is message :  ${d.chat_history[0].message}`)
                setMessages(d.chat_history.map((l: any) => 
                    <Message ai={l.ai} message={l.message} />
                ));
            }
            setIsLoading(false);
        }
    }, [agentData, agent_id]);

    const q_update = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name_a = e.target.value;
        agent.update_query(name_a);
        console.log(agent.get_query());
        setInputValue('');
    };

    const add_message = (message: any) => {
        try {
            const specific_agent = agentData
            if (specific_agent && specific_agent.chat_history) {
                const lis = [...specific_agent.chat_history, message];
                agentdata.update_agent_history(agent_id, lis, agentdata.uuid);
                setMessages(lis);
            }
        } catch (error) {
            console.error('Error in add_message:', error);
        }
    };

    const get_ans = async () => {
        const n = agent.get_query();
        add_message({ ai: false, message: n });
        setMessages(prev => [...prev, { ai: false, message: n }, { ai: true, message: 'typing...' }]);

        const ans = await agent.agent(n);
        setMessages(prev => [...prev.slice(0, -1), { ai: true, message: ans }]);
        add_message({ ai: true, message: ans });
    };

    const get_ans2 = async () => {
        const n = agent.get_query();
        console.log(n)
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ height: "93vh", width: "75vw", margin: '0'}}>
            <div style={{ height: "84vh", overflowY: 'auto',overflowX: 'hidden', maxWidth: "75vw"}} ref={listRef}>
                {/* {messages.map((msg, index) => (
                    <Message key={index} ai={msg.ai} message={msg.message} />
                ))} */}
                {messages}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <input
                    type="text"
                    placeholder="Message Your AI"
                    style={{
                        height: 43,
                        width: 600,
                        backgroundColor: '#13121D',
                        borderRadius: 30,
                        padding: 15,
                        color: "white",
                        marginTop: "5px"
                    }}
                    onChange={q_update}
                    // value={inputValue}
                />
                <button
                    onClick={get_ans}
                    style={{
                        height: 43,
                        width: 80,
                        backgroundColor: '#13121D',
                        color: 'white',
                        borderRadius: 30,
                        marginLeft: 10,
                        cursor: "pointer",
                        marginTop: "5px"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;