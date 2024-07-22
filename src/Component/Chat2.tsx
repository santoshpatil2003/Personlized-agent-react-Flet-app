// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { Agent } from '../Backend/Fastapi';
import { Memory } from './Memory';
import AnimatedChatBubble from './AnimatedChatBubble';

interface ChatProps {
    // agent_id: string;
    // agent_edit: any; // Define proper type
    // agentdata: any; // Define proper type
}

const Chat2: React.FC<ChatProps> = () => {
    const [messages, setMessages] = useState<any[]>([]);
    // const [query, setQuery] = useState('');
    const listRef = useRef<HTMLDivElement>(null);

    // const memory = new Memory(agent_id, agentdata).memory();
    // const agent = new Agent(memory, agent_id, agent_edit);

    // useEffect(() => {
    //     const d = agentdata.get_data_of(agent_id, agentdata.uuid);
    //     if (d.chat_history.length !== 0) {
    //         setMessages(d.chat_history.map((l: any) =>
    //             <Message ai={l.ai} message={l.message} />
    //         ));
    //     }
    // }, []);

    // const q_update = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const name_a = e.target.value;
    //     agent.update_query(name_a);
    //     console.log(agent.get_query());
    //     setQuery('');
    // };

    // const add_message = (message: any) => {
    //     const specific_agent = agentdata.get_data_of(agent_id, agentdata.uuid);
    //     const lis = [...specific_agent.chat_history, message];
    //     agentdata.update_agent_history(agent_id, lis, agentdata.uuid);
    // };

    // const get_ans = async () => {
    //     const n = agent.get_query();
    //     const mes_user = <Message ai={false} message={n} />;
    //     add_message({ ai: false, message: n });
    //     setMessages(prev => [...prev, mes_user, <AnimatedChatBubble />]);

    //     const ans = await agent.agent(n);
    //     setMessages(prev => {
    //         const newMessages = [...prev];
    //         newMessages.pop(); // Remove AnimatedChatBubble
    //         return [...newMessages, <Message ai={true} message={ans} />];
    //     });
    //     add_message({ ai: true, message: ans });
    // };

    return (
        <div style={{ height: "93vh", width: "75vw", margin: '0'}}>
            <div style={{ height: "84vh", overflowY: 'auto',overflowX: 'hidden', maxWidth: "75vw"}} ref={listRef}>
                {messages.map((msg, index) => (
                    <Message key={index} ai={msg.ai} message={msg.message} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <input
                    type="text"
                    placeholder="Message Your AI"
                    style={{
                        height: 10,
                        width: 600,
                        backgroundColor: '#13121D',
                        borderRadius: 30,
                        padding: 15,
                        color: "white",
                        marginTop: "5px"
                    }}
                    // onChange={q_update}
                    // value={query}
                />
                <button
                    // onClick={get_ans}
                    style={{
                        height: 43,
                        width: 80,
                        backgroundColor: '#13121D',
                        color: '#13121D',
                        borderRadius: 30,
                        marginLeft: 10,
                        cursor: "pointer",
                        textDecorationColor: "white"
                    }}
                >
                    {"send"}
                </button>
            </div>
        </div>
    );
};

export default Chat2;
















// src/components/Chat.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import Message from './Message';
// import AnimatedChatBubble from './AnimatedChatBubble';
// import { Agent } from '../Backend/Fastapi';
// import { Memory } from './Memory';

// interface ChatProps {
//     // agent_id: string;
//     // agent_edit: any; // Replace with proper type
//     // agentdata: any; // Replace with proper type
// }

// const Chat2: React.FC<ChatProps> = () => {
//     const [messages, setMessages] = useState<any[]>([]);
//     const [inputValue, setInputValue] = useState('');
//     const listRef = useRef<HTMLDivElement>(null);

//     // const memory = new Memory(agent_id, agentdata).memory();

//     // const agent = new Agent(agent_id, agent_edit);

//     // agent.initialize(memory);

//     // useEffect(() => {
//     //     const d = agentdata.get_data_of(agent_id, agentdata.uuid);
//     //     if (d.chat_history.length !== 0) {
//     //         setMessages(d.chat_history);
//     //     }
//     // }, []);

//     // const q_update = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const name_a = e.target.value;
//     //     agent.update_query(name_a);
//     //     console.log(agent.get_query());
//     //     setInputValue('');
//     // };

//     // const add_message = (message: any) => {
//     //     const specific_agent = agentdata.get_data_of(agent_id, agentdata.uuid);
//     //     const lis = [...specific_agent.chat_history, message];
//     //     agentdata.update_agent_history(agent_id, lis, agentdata.uuid);
//     //     setMessages(lis);
//     // };

//     // const get_ans = async () => {
//     //     const n = agent.get_query();
//     //     add_message({ ai: false, message: n });
//     //     setMessages(prev => [...prev, { ai: false, message: n }, { ai: true, message: 'typing...' }]);

//     //     const ans = await agent.agent(n);
//     //     setMessages(prev => [...prev.slice(0, -1), { ai: true, message: ans }]);
//     //     add_message({ ai: true, message: ans });
//     // };

//     return (
//         <div className="chat-container">
//             <div className="message-list" ref={listRef}>
//                 {messages.map((msg, index) => (
//                     <Message key={index} ai={msg.ai} message={msg.message} />
//                 ))}
//             </div>
//             <div className="input-area">
//                 <input
//                     type="text"
//                     placeholder="Message Your AI"
//                     value={inputValue}
//                     // onChange={q_update}
//                 />
//                 <button>Send</button>
//             </div>
//         </div>
//     );
// };

// export default Chat2;