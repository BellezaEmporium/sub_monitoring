import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { subscriptions } = usePage().props;
    const [remainingScreens, setRemainingScreens] = useState({});

    const handleConnect = (subscription) => {
        if (remainingScreens[subscription.id] === 0) {
            return;
        }

        if (remainingScreens[subscription.id] === undefined) {
            setRemainingScreens((prevState) => ({
                ...prevState,
                [subscription.id]: subscription.remaining_screens - 1,
            }));
        } else {
            setRemainingScreens((prevState) => ({
                ...prevState,
                [subscription.id]: subscription.remaining_screens + 1,
            }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel</h2>}
        >
            <Head title="Panel souscriptions" />

            <div>
                <h1>Bienvenue {user.name} !</h1>
                <ul>
                    {subscriptions.map((subscription) => (
                        <li key={subscription.id}>
                            {subscription.name} - {subscription.connected_users} utilisateurs connectés
                            {subscription.connected_users > 0 ? (
                                <span style={{ color: 'red' }}>Connecté</span>
                            ) : (
                                <span style={{ color: 'green' }}>Non connecté</span>
                            )}
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
