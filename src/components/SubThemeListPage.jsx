import React from 'react';
import { Icon } from './Icon';

export const SubThemeListPage = ({ onNavigate, theme, subThemes, themeDescriptions }) => {
    return (
        <div className="py-12 px-4 max-w-4xl mx-auto">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-[#3A8A88] font-bold mb-8 hover:underline">
                <Icon name="back" className="w-6 h-6" />
                VOLTAR PARA TEMAS
            </button>
            <h2 className="text-4xl font-serif text-center text-[#333] mb-4 uppercase">{theme}</h2>
            <p className="text-lg text-gray-700 mb-10 text-center md:text-left">
                {themeDescriptions[theme]}
            </p>
            <div className="space-y-4">
                {subThemes.map(subTheme => (
                    <button key={subTheme} onClick={() => onNavigate('contentTypeGrid', { theme, category: subTheme })} className="w-full text-left bg-[#3A8A88] text-white font-bold text-lg p-5 rounded-lg shadow-md hover:bg-[#317573] transition-colors duration-300">
                        {subTheme.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};