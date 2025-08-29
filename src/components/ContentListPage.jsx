import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from './Icon';
import { ContentModal } from './ContentModal';

export const ContentListPage = ({ onNavigate, theme, category, type, db }) => {
    const [loading, setLoading] = useState(true);
    const [selectedContent, setSelectedContent] = useState(null);

    const content = useMemo(() => {
        return db.filter(item => item.category === category && item.type === type);
    }, [category, type, db]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300); // Simula um pequeno delay
        return () => clearTimeout(timer);
    }, [category, type]); // Recalcula apenas quando a categoria ou tipo mudam

    return (
        <>
            {selectedContent && <ContentModal content={selectedContent} onClose={() => setSelectedContent(null)} />}
            <div className="py-12 px-4 max-w-5xl mx-auto">
                <button onClick={() => onNavigate('contentTypeGrid', { theme, category })} className="flex items-center gap-2 text-[#3A8A88] font-bold mb-8 hover:underline">
                    <Icon name="back" className="w-6 h-6" />
                    VOLTAR PARA {category.toUpperCase()}
                </button>
                <h2 className="text-4xl font-serif text-center text-[#333] mb-2 uppercase">{type}</h2>
                <h3 className="text-2xl font-serif text-center text-[#8B2E2E] mb-10 uppercase">{category}</h3>
                {loading ? <div className="text-center text-xl">Carregando...</div> : content.length > 0 ? (
                    <div className="space-y-6">
                        {content.map(item => (
                            <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-[#333]">{item.title}</h4>
                                    <p className="text-gray-600 mt-1">{item.description}</p>
                                </div>
                                <button onClick={() => setSelectedContent(item)} className="bg-[#3A8A88] text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#317573] transition-colors duration-300 flex items-center gap-2 w-full md:w-auto justify-center">
                                    <Icon name="eye" className="w-5 h-5" />
                                    <span>VER CONTEÚDO</span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg py-10 border-2 border-dashed rounded-lg">
                        <p>Nenhum conteúdo encontrado para esta seção ainda.</p>
                    </div>
                )}
            </div>
        </>
    );
};
