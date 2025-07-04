import React from 'react';

const ConversationList = ({ conversations, activeConversation, onSelectConversation }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => onSelectConversation(conversation)}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            activeConversation?.id === conversation.id
                                ? 'bg-blue-50'
                                : ''
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src={conversation.participant.avatar || '/default-avatar.png'}
                                    alt={conversation.participant.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                {conversation.participant.is_online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {conversation.participants && conversation.participants[0]
                                        ? conversation.participants[0].name
                                        : 'Unknown User'}
                                </p>
                                {conversation.last_message && (
                                    <p className="text-xs text-gray-500 truncate">
                                        {conversation.last_message.content}
                                    </p>
                                )}
                            </div>
                            {conversation.unread_count > 0 && (
                                <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {conversation.unread_count}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConversationList;