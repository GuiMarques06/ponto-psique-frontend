import React, { useState, useEffect } from 'react';

export const EditModal = ({ content, onClose, onSave, allThemes, allCategories, allTypes }) => {
    const [editedContent, setEditedContent] = useState(content);

    useEffect(() => {
        setEditedContent(content);
    }, [content]);

    if (!content || !editedContent) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedContent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedContent);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                <h3 className="text-3xl font-bold font-serif text-[#333] mb-6">EDITAR CONTEÚDO</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={editedContent.title} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                    <textarea name="description" value={editedContent.description} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" rows="4"></textarea>
                    <input type="url" name="linkUrl" placeholder="Link Externo (Opcional)" value={editedContent.linkUrl || ''} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select name="theme" value={editedContent.theme} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                            {allThemes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                        </select>
                        <select name="category" value={editedContent.category} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select name="type" value={editedContent.type} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                            {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-400">CANCELAR</button>
                        <button type="submit" className="bg-[#3A8A88] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#317573]">SALVAR ALTERAÇÕES</button>
                    </div>
                </form>
            </div>
        </div>
    );
};