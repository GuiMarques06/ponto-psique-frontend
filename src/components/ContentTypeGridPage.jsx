import React from 'react';
import { Icon } from './Icon';

export const ContentTypeGridPage = ({ onNavigate, theme, category, types }) => {
    return (
        <div className="py-12 px-4 max-w-6xl mx-auto">
            <button onClick={() => onNavigate('subThemeList', { theme })} className="flex items-center gap-2 text-[#3A8A88] font-bold mb-8 hover:underline">
                <Icon name="back" className="w-6 h-6" />
                VOLTAR PARA {theme.toUpperCase()}
            </button>
            <h2 className="text-4xl font-serif text-center text-[#8B2E2E] mb-10 border-b-2 border-[#8B2E2E] pb-2 uppercase">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {types.map(typeTitle => (
                    <div key={typeTitle} onClick={() => onNavigate('contentList', { theme, category, type: typeTitle })} className="border-2 border-gray-300 p-6 rounded-lg shadow-lg cursor-pointer hover:border-[#8B2E2E] hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center items-center">
                        <h3 className="text-2xl font-bold text-center text-[#333] uppercase">{typeTitle}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
