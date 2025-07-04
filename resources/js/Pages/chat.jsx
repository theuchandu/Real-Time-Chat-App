import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function Chat({ auth, conversation, messages = [], activeType }) {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        router.post(route('messages.store'), {
            conversation_id: conversation.id,
            content: message
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setMessage('');
            }
        });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="border-b p-4">
                <h3 className="font-semibold">
                    {conversation.participant
                        ? conversation.participant.name
                        : 'Unknown User'}
                </h3>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Array.isArray(messages) && messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.user_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                msg.user_id === auth.user.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {activeType === 'group' && (
                                <div className="text-xs font-bold mb-1">{msg.user_name}</div>
                            )}
                            <p>{msg.content}</p>
                            <span className="text-xs opacity-70">
                                {new Date(msg.created_at).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="border-t p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}