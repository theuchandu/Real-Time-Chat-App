import React from 'react';

export default function ConversationList({ conversations = [], activeConversation, onSelectConversation }) {
    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 pb-0">
                <h2 className="text-lg font-semibold mb-4">Conversations</h2>
                <div className="space-y-2">
                    {Array.isArray(conversations) && conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => onSelectConversation(conversation)}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                                activeConversation?.id === conversation.id
                                    ? 'bg-blue-50 border border-blue-200'
                                    : ''
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-600">
                                        {conversation.participant
                                            ? conversation.participant.name.charAt(0)
                                            : 'U'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {conversation.participant
                                            ? conversation.participant.name || 'Unknown User'
                                            : 'Unknown User'}
                                    </p>
                                    {conversation.last_message?.content && (
                                        <p className="text-xs text-gray-500 truncate">
                                            {conversation.last_message.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
