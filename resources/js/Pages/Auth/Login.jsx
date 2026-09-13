import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Webpass from '@laragear/webpass';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [biometricError, setBiometricError] = useState('');
    const [biometricProcessing, setBiometricProcessing] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        post(route('login'), {
            headers: csrfToken ? {
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            } : {},
        });
    };

    const biometricLogin = async () => {
        setBiometricError('');
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        if (!data.email) {
            setBiometricError('Add meg az email cimedet a biometrikus belepeshez.');
            return;
        }

        if (Webpass.isUnsupported()) {
            setBiometricError('Ez a bongeszo vagy eszkoz nem tamogatja a biometrikus belepest.');
            return;
        }

        if (!csrfToken) {
            setBiometricError('Hianyzik a CSRF token az oldalrol.');
            return;
        }

        setBiometricProcessing(true);

        const result = await Webpass.create({
            credentials: 'same-origin',
        }).assert({
            path: route('webauthn.login.options'),
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: {
                email: data.email,
                remember: data.remember,
            },
        }, {
            path: route('webauthn.login'),
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: {
                remember: data.remember,
            },
        });

        setBiometricProcessing(false);

        if (result.success) {
            window.location.href = route('dashboard');
            return;
        }

        setBiometricError('A biometrikus belepes nem sikerult.');
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {biometricError && (
                    <div className="mt-4 text-sm text-red-600">
                        {biometricError}
                    </div>
                )}

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="mt-4">
                    <SecondaryButton
                        className="w-full justify-center"
                        disabled={processing || biometricProcessing}
                        onClick={biometricLogin}
                    >
                        Biometrikus belepes
                    </SecondaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
