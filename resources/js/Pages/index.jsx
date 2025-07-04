import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ConversationList from '@/Components/ConversationList';
import Chat from '@/Components/Chat';

export default function Index({ auth, conversations: initialConversations }) {
    const [conversations, setConversations] = useState(initialConversations);
    const [activeConversation, setActiveConversation] = useState(null);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Messenger</h2>}
        >
            <Head title="Messenger" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex h-[600px]">
                                {/* Conversations List */}
                                <div className="w-1/4 border-r">
                                    <ConversationList
                                        conversations={conversations}
                                        activeConversation={activeConversation}
                                        onSelectConversation={setActiveConversation}
                                    />
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1">
                                    {activeConversation ? (
                                        <Chat
                                            auth={auth}
                                            conversation={activeConversation}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500">
                                            Select a conversation to start messaging
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}