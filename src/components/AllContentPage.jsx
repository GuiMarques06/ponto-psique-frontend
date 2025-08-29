import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from './Icon';
import { ContentModal } from './ContentModal';

export const AllContentPage = ({ onNavigate, type, db, allThemes, allCategories }) => {
    const [selectedTheme, setSelectedTheme] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContent, setSelectedContent] = useState(null);

    const availableCategories = useMemo(() => {
        if (selectedTheme === 'all') return allCategories;
        return [...new Set(db.filter(item => item.theme === selectedTheme).map(item => item.category))];
    }, [selectedTheme, db, allCategories]);

    useEffect(() => {
        setLoading(true);
        let filteredContent = db.filter(item => item.type === type);
        if (selectedTheme !== 'all') {
            filteredContent = filteredContent.filter(item => item.theme === selectedTheme);
        }
        if (selectedCategory !== 'all') {
            filteredContent = filteredContent.filter(item => item.category === selectedCategory);
        }
        // Simula um pequeno delay de carregamento
        const timer = setTimeout(() => {
            setContent(filteredContent);
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [type, db, selectedTheme, selectedCategory]);

    return (
        <>
            {selectedContent && <ContentModal content={selectedContent} onClose={() => setSelectedContent(null)} />}
            <div className="py-12 px-4 max-w-5xl mx-auto">
                <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-[#3A8A88] font-bold mb-8 hover:underline">
                    <Icon name="back" className="w-6 h-6" />
                    VOLTAR PARA A PÁGINA INICIAL
                </button>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
                    <h2 className="text-4xl font-serif text-center md:text-left text-[#333] uppercase">TODOS OS {type}</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select value={selectedTheme} onChange={(e) => { setSelectedTheme(e.target.value); setSelectedCategory('all'); }} className="p-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                            <option value="all">TODOS OS TEMAS</option>
                            {allThemes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                        </select>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                            <option value="all">TODOS OS SUB-TEMAS</option>
                            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {loading ? <div className="text-center text-xl">Carregando...</div> : content.length > 0 ? (
                    <div className="space-y-6">
                        {content.map(item => (
                            <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-[#333]">{item.title}</h4>
                                    <p className="text-gray-500 text-sm mb-1 font-semibold">{item.theme} / {item.category}</p>
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
                        <p>Nenhum conteúdo encontrado para os filtros selecionados.</p>
                    </div>
                )}
            </div>
        </>
    );
};
