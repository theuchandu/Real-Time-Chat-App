import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MessageList from '@/Components/MessageList';
import MessageInput from '@/Components/MessageInput';
import axios from 'axios';

export default function Show({ auth, conversation, messages: initialMessages }) {
    const [messages, setMessages] = useState(initialMessages);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Listen for new messages
        window.Echo.private(`conversation.${conversation.id}`)
            .listen('NewMessage', (e) => {
                setMessages(prev => [...prev, e.message]);
            });

        return () => {
            window.Echo.leave(`conversation.${conversation.id}`);
        };
    }, [conversation.id]);

    const sendMessage = async (content) => {
        try {
            const response = await axios.post(`/api/conversations/${conversation.id}/messages`, {
                content
            });
            setMessages(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    console.log("Rendering groups:", groups);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Chat with {conversation.participant.name}
                    </h2>
                    {conversation.participant.is_online && (
                        <span className="ml-2 text-sm text-green-500">• Online</span>
                    )}
                </div>
            }
        >
            <Head title={`Chat with ${conversation.participant.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col h-[600px]">
                                <div className="flex-1 overflow-y-auto mb-4">
                                    <MessageList messages={messages} />
                                </div>
                                <div className="border-t pt-4">
                                    <MessageInput onSendMessage={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 