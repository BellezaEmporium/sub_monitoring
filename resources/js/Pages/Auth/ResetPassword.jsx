import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Réinitialiser le mot de passe" />
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Pour réinitialiser le mot de passe" />

                    <Text>
                        Afin de réinitialiser votre mot de passe, veuillez demander à l'administrateur.
                    </Text>
                </div>
        </GuestLayout>
    );
}
