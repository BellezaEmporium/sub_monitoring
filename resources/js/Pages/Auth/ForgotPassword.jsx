import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function ForgotPassword({ }) {

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />
            <div className="mb-4 text-sm">
                Afin de réinitialiser votre mot de passe, veuillez effectuer une demande à l'administrateur.
            </div>
        </GuestLayout>
    );
}
