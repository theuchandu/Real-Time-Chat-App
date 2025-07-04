import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ConversationList from './ConversationList';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Listen for new messages
        window.Echo.private(`conversation.${activeConversation?.id}`)
            .listen('NewMessage', (e) => {
                setMessages(prev => [...prev, e.message]);
            });

        return () => {
            window.Echo.leave(`conversation.${activeConversation?.id}`);
        };
    }, [activeConversation]);

    const sendMessage = async (content) => {
        try {
            const response = await axios.post(`/api/conversations/${activeConversation.id}/messages`, {
                content
            });
            setMessages(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 border-r bg-white">
                <ConversationList
                    conversations={conversations}
                    activeConversation={activeConversation}
                    onSelectConversation={setActiveConversation}
                />
            </div>
            <div className="flex-1 flex flex-col">
                {activeConversation ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-4">
                            <MessageList messages={messages} />
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="border-t p-4">
                            <MessageInput onSendMessage={sendMessage} />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages; 