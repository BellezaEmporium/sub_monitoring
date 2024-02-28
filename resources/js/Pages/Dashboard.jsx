import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { subscriptions } = usePage().props;
    const [remainingScreens, setRemainingScreens] = useState({});

    const handleConnect = async (subscription) => {
        if (remainingScreens[subscription.id] === 0) {
            return;
        }
    
        let newRemainingScreens;
        if (remainingScreens[subscription.id] === undefined) {
            newRemainingScreens = subscription.connected_users - 1;
        } else {
            newRemainingScreens = subscription.connected_users + 1;
        }
    
        setRemainingScreens((prevState) => ({
            ...prevState,
            [subscription.id]: newRemainingScreens,
        }));
    
        await axios.post('/api/subscriptions/' + subscription.id + '/connect');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel</h2>}
        >
            <Head title="Panel souscriptions" />

            <div>
                <h1>Bienvenue {auth.user.name} !</h1>
                <ul>
                    {subscriptions.map((subscription) => (
                        <li key={subscription.id}>
                        {subscription.name} - {remainingScreens[subscription.id] || subscription.connected_users} utilisateurs connectés                    
                        {subscription.connected_users > 0 ? (
                            <>
                                {users.map((user) => {
                                    if (user.id === subscription.connected_users) {
                                        return <span style={{ color: 'red' }}> - {user.name}</span>;
                                    }
                                    else {
                                        return <span style={{ color: 'green' }}> - {user.name}</span>
                                    };
                                })}
                            </>
                        ) : null}
                        <button
                            onClick={() => handleConnect(subscription)}
                            disabled={remainingScreens[subscription.id] === 0}
                        >
                            {remainingScreens[subscription.id] === 0
                                ? 'Tous les écrans sont utilisés pour ce service'
                                : remainingScreens[subscription.id] === undefined
                                ? 'Je suis dessus'
                                : 'Je ne suis plus dessus'}
                        </button>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
