import React, { useState } from 'react';

export const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onLogin(username, password);
        if (!success) setError('Login ou senha inválidos.');
    };

    return (
        <div className="py-20 px-4 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
                <h2 className="text-3xl font-serif text-center text-[#333] mb-8">ACESSO ADMIN</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">USUÁRIO</label>
                        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">SENHA</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button type="submit" className="w-full bg-[#8B2E2E] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#7a2828] transition-colors duration-300">ENTRAR</button>
                </form>
            </div>
        </div>
    );
};