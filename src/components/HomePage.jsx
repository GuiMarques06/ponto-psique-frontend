import React from 'react';
import { ContentNoticeSection } from './ContentNoticeSection';
import { FaqSection } from './FaqSection';

export const HomePage = ({ onNavigate, themes }) => {
    return (
        <>
            <div className="text-center py-12 md:py-20 px-4">
                <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#333] uppercase">Seu ponto de estudos em Psicologia!</h2>
                <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">Explore artigos, resumos e conceitos fundamentais para a sua jornada acadêmica e profissional.</p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {themes.map(theme => (
                        <button key={theme} onClick={() => onNavigate('subThemeList', { theme })} className="bg-[#8B2E2E] text-white font-bold text-xl p-8 rounded-lg shadow-lg hover:bg-[#7a2828] transition-colors duration-300 transform hover:-translate-y-1">
                            {theme.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            <ContentNoticeSection />
            <FaqSection />
        </>
    );
};