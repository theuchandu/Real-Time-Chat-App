import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${
                        message.is_own ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.is_own
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        <div className="text-sm">{message.content}</div>
                        <div
                            className={`text-xs mt-1 ${
                                message.is_own ? 'text-blue-100' : 'text-gray-500'
                            }`}
                        >
                            {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList; 