import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ConversationList from '@/Components/ConversationList';
import Chat from '@/Components/Chat';
import axios from 'axios';

export default function Index({ auth, conversations: initialConversations }) {
    const [conversations] = useState(initialConversations); // Static conversations
    const [groups, setGroups] = useState([]); // Dynamic groups fetched via Axios
    const [activeChat, setActiveChat] = useState(null); // Selected conversation/group
    const [messages, setMessages] = useState([]); // Messages to show in Chat
    const [activeType, setActiveType] = useState('conversation'); // 'conversation' or 'group'

    useEffect(() => {
        axios.get('/groups').then(res => setGroups(res.data));
    }, []);

    const handleSelectConversation = async (conversation) => {
        setActiveChat(conversation);
        setActiveType('conversation');
        const response = await axios.get(`/conversations/${conversation.id}/messages`);
        setMessages(response.data);
    };

    const handleSelectGroup = async (group) => {
        setActiveChat(group);
        setActiveType('group');
        const response = await axios.get(`/groups/${group.id}/messages`);
        setMessages(response.data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Messenger</h2>}
        >
            <Head title="Messenger" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex h-[600px]">
                            {/* Conversations & Groups List */}
                            <div className="w-1/4 border-r overflow-y-auto">
                                <ConversationList
                                    conversations={conversations}
                                    activeConversation={activeType === 'conversation' ? activeChat : null}
                                    onSelectConversation={handleSelectConversation}
                                />
                                <h2 className="text-lg font-semibold mb-2 px-4">Groups</h2>
                                <div className="space-y-2 px-4">
                                    {groups.map(group => (
                                        <div
                                            key={group.id}
                                            onClick={() => handleSelectGroup(group)}
                                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                                                activeType === 'group' && activeChat?.id === group.id
                                                    ? 'bg-green-50 border border-green-200'
                                                    : ''
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                                                    <span className="text-green-700 font-bold">
                                                        {group.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {group.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {group.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Chat Area */}
                            <div className="flex-1">
                                {activeChat ? (
                                    <Chat
                                        auth={auth}
                                        conversation={activeType === 'conversation' ? activeChat : null}
                                        group={activeType === 'group' ? activeChat : null}
                                        messages={messages}
                                        activeType={activeType}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        Select a conversation or group to start messaging
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 