import React from 'react';

export const Header = ({ onNavigate, types }) => {
    return (
        <header className="bg-[#FDF6F0] w-full py-4 px-4 md:px-8 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <img
                    src="https://i.ibb.co/6cbLLKWv/Portal-2-removebg-preview.png"
                    alt="PontoPsique Logo"
                    className="h-20 cursor-pointer"
                    onClick={() => onNavigate('home')}
                />
                <nav className="w-full mt-4">
                    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8">
                        {types.map(link => (
                            <li key={link}>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('allContent', { type: link }); }} className="text-sm font-semibold text-[#8B2E2E] hover:underline uppercase tracking-wider">{link}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
