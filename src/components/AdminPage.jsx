import React, { useState } from 'react';
import { Icon } from './Icon';
import { EditModal } from './EditModal';
import { ConfirmModal } from './ConfirmModal';
import { createContent, updateContent, deleteContent } from '../services/api';

export const AdminPage = ({ db, setDb, onLogout, allThemes, setAllThemes, allCategories, setAllCategories, allTypes, setAllTypes }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [theme, setTheme] = useState(allThemes[0] || '');
    const [category, setCategory] = useState(allCategories[0] || '');
    const [type, setType] = useState(allTypes[0] || '');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newType, setNewType] = useState('');
    const [editingContent, setEditingContent] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const finalTheme = theme === 'new' ? newTheme.toUpperCase().trim() : theme;
        const finalCategory = category === 'new' ? newCategory.trim() : category;
        const finalType = type === 'new' ? newType.trim() : type;

        if (!title || !description || !finalTheme || !finalCategory || !finalType) {
            setMessage('Por favor, preencha todos os campos obrigatórios.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        const newContentData = {
            title, description, linkUrl, theme: finalTheme, category: finalCategory, type: finalType,
            fileUrl: file ? file.name : ''
        };

        try {
            const response = await createContent(newContentData);
            setDb(prevDb => [response.data, ...prevDb]);
            if (theme === 'new' && !allThemes.includes(finalTheme)) setAllThemes(prev => [...prev, finalTheme]);
            if (category === 'new' && !allCategories.includes(finalCategory)) setAllCategories(prev => [...prev, finalCategory]);
            if (type === 'new' && !allTypes.includes(finalType)) setAllTypes(prev => [...prev, finalType]);

            setTitle(''); setDescription(''); setLinkUrl(''); setFile(null);
            setNewTheme(''); setNewCategory(''); setNewType('');
            setTheme(allThemes[0] || ''); setCategory(allCategories[0] || ''); setType(allTypes[0] || '');
            setMessage('Conteúdo adicionado com sucesso!');
        } catch (error) {
            setMessage('Falha ao adicionar conteúdo.');
            console.error(error);
        } finally {
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const confirmDeleteAction = async () => {
        if (deletingId) {
            try {
                await deleteContent(deletingId);
                setDb(prevDb => prevDb.filter(item => item._id !== deletingId));
                setMessage('Conteúdo excluído com sucesso!');
            } catch (error) {
                setMessage('Falha ao excluir conteúdo.');
                console.error(error);
            } finally {
                setDeletingId(null);
                setTimeout(() => setMessage(''), 3000);
            }
        }
    };

    const handleUpdateAction = async (updatedContent) => {
        try {
            const { _id, ...contentData } = updatedContent;
            const response = await updateContent(_id, contentData);
            setDb(prevDb => prevDb.map(item => item._id === _id ? response.data : item));
            setMessage('Conteúdo atualizado com sucesso!');
        } catch (error) {
            setMessage('Falha ao atualizar conteúdo.');
            console.error(error);
        } finally {
            setEditingContent(null);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <>
            {editingContent && <EditModal content={editingContent} onClose={() => setEditingContent(null)} onSave={handleUpdateAction} allThemes={allThemes} allCategories={allCategories} allTypes={allTypes} />}
            <ConfirmModal isOpen={!!deletingId} onClose={() => setDeletingId(null)} onConfirm={confirmDeleteAction} message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita." />
            <div className="py-12 px-4 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-serif text-[#333]">PAINEL DE ADMINISTRAÇÃO</h2>
                    <button onClick={onLogout} className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2">
                        <Icon name="logout" className="w-5 h-5" />
                        <span>LOGOUT</span>
                    </button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-200 mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-[#8B2E2E]">ADICIONAR NOVO CONTEÚDO</h3>
                    <form onSubmit={handleUpload} className="space-y-4">
                        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" rows="3"></textarea>
                        <input type="url" placeholder="Link Externo (Opcional)" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                                    {allThemes.map(t => <option key={t} value={t}>{t}</option>)}
                                    <option value="new">-- Adicionar Novo Tema --</option>
                                </select>
                                {theme === 'new' && <input type="text" placeholder="Novo Tema" value={newTheme} onChange={e => setNewTheme(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
                            </div>
                            <div>
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                                    {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    <option value="new">-- Adicionar Novo Sub-tema --</option>
                                </select>
                                {category === 'new' && <input type="text" placeholder="Novo Sub-tema" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
                            </div>
                            <div>
                                <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                                    {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    <option value="new">-- Adicionar Novo Tipo --</option>
                                </select>
                                {type === 'new' && <input type="text" placeholder="Novo Tipo" value={newType} onChange={e => setNewType(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
                            </div>
                        </div>
                        <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8B2E2E] file:text-white hover:file:bg-[#7a2828]" />
                        <button type="submit" className="w-full bg-[#3A8A88] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#317573] transition-colors duration-300 flex items-center justify-center gap-2">
                            <Icon name="upload" className="w-6 h-6" />
                            <span>FAZER UPLOAD</span>
                        </button>
                    </form>
                    {message && <p className={`mt-4 text-center font-semibold ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-[#8B2E2E]">GERENCIAR CONTEÚDO</h3>
                    <div className="space-y-4">
                        {db.map(item => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <p className="font-bold text-lg">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.theme} / {item.category} / {item.type}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingContent(item)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2">
                                        <Icon name="edit" className="w-5 h-5" />
                                        <span>EDITAR</span>
                                    </button>
                                    <button onClick={() => setDeletingId(item._id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center gap-2">
                                        <Icon name="trash" className="w-5 h-5" />
                                        <span>EXCLUIR</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
import React, { useState } from 'react';
import { Icon } from './Icon';
import { EditModal } from './EditModal';
import { ConfirmModal } from './ConfirmModal';
import { createContent, updateContent, deleteContent } from '../services/api';

export const AdminPage = ({ db, setDb, onLogout, allThemes, setAllThemes, allCategories, setAllCategories, allTypes, setAllTypes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [theme, setTheme] = useState(allThemes[0] || '');
  const [category, setCategory] = useState(allCategories[0] || '');
  const [type, setType] = useState(allTypes[0] || '');
  
  // Estados para guardar o nome e o conteúdo do ficheiro
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState('');

  const [message, setMessage] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newType, setNewType] = useState('');
  const [editingContent, setEditingContent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Função para ler o ficheiro e convertê-lo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Limite de 10MB
        setMessage('O ficheiro é muito grande. O limite é 10MB.');
        e.target.value = null; // Limpa a seleção
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result); // O resultado é a string Base64
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const finalTheme = theme === 'new' ? newTheme.toUpperCase().trim() : theme;
    const finalCategory = category === 'new' ? newCategory.trim() : category;
    const finalType = type === 'new' ? newType.trim() : type;

    if (!title || !description || !finalTheme || !finalCategory || !finalType) {
      setMessage('Por favor, preencha todos os campos obrigatórios.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Envia o nome e o conteúdo do ficheiro para a API
    const newContentData = {
      title, description, linkUrl, theme: finalTheme, category: finalCategory, type: finalType,
      fileName, fileData
    };

    try {
      const response = await createContent(newContentData);
      setDb(prevDb => [response.data, ...prevDb]);
      if (theme === 'new' && !allThemes.includes(finalTheme)) setAllThemes(prev => [...prev, finalTheme]);
      if (category === 'new' && !allCategories.includes(finalCategory)) setAllCategories(prev => [...prev, finalCategory]);
      if (type === 'new' && !allTypes.includes(finalType)) setAllTypes(prev => [...prev, finalType]);
      
      setTitle(''); setDescription(''); setLinkUrl('');
      setFileName(''); setFileData(''); document.getElementById('file-input').value = '';
      setNewTheme(''); setNewCategory(''); setNewType('');
      setTheme(allThemes[0] || ''); setCategory(allCategories[0] || ''); setType(allTypes[0] || '');
      setMessage('Conteúdo adicionado com sucesso!');
    } catch (error) {
      setMessage('Falha ao adicionar conteúdo.');
      console.error(error);
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const confirmDeleteAction = async () => {
    if (deletingId) {
      try {
        await deleteContent(deletingId);
        setDb(prevDb => prevDb.filter(item => item._id !== deletingId));
        setMessage('Conteúdo excluído com sucesso!');
      } catch (error) {
        setMessage('Falha ao excluir conteúdo.');
        console.error(error);
      } finally {
        setDeletingId(null);
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleUpdateAction = async (updatedContent) => {
    try {
      const { _id, ...contentData } = updatedContent;
      const response = await updateContent(_id, contentData);
      setDb(prevDb => prevDb.map(item => item._id === _id ? response.data : item));
      setMessage('Conteúdo atualizado com sucesso!');
    } catch (error) {
      setMessage('Falha ao atualizar conteúdo.');
      console.error(error);
    } finally {
      setEditingContent(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      {editingContent && <EditModal content={editingContent} onClose={() => setEditingContent(null)} onSave={handleUpdateAction} allThemes={allThemes} allCategories={allCategories} allTypes={allTypes} />}
      <ConfirmModal isOpen={!!deletingId} onClose={() => setDeletingId(null)} onConfirm={confirmDeleteAction} message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita." />
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-serif text-[#333]">PAINEL DE ADMINISTRAÇÃO</h2>
          <button onClick={onLogout} className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2">
            <Icon name="logout" className="w-5 h-5" />
            <span>LOGOUT</span>
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-[#8B2E2E]">ADICIONAR NOVO CONTEÚDO</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
            <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" rows="3"></textarea>
            <input type="url" placeholder="Link Externo (Opcional)" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3A8A88] outline-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                  {allThemes.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="new">-- Adicionar Novo Tema --</option>
                </select>
                {theme === 'new' && <input type="text" placeholder="Novo Tema" value={newTheme} onChange={e => setNewTheme(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
              </div>
              <div>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                  {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="new">-- Adicionar Novo Sub-tema --</option>
                </select>
                {category === 'new' && <input type="text" placeholder="Novo Sub-tema" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
              </div>
              <div>
                <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-[#3A8A88] outline-none">
                  {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="new">-- Adicionar Novo Tipo --</option>
                </select>
                {type === 'new' && <input type="text" placeholder="Novo Tipo" value={newType} onChange={e => setNewType(e.target.value)} className="w-full mt-2 p-3 border rounded-lg" />}
              </div>
            </div>
            <input id="file-input" type="file" accept=".pdf" onChange={handleFileChange} className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8B2E2E] file:text-white hover:file:bg-[#7a2828]" />
            <button type="submit" className="w-full bg-[#3A8A88] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#317573] transition-colors duration-300 flex items-center justify-center gap-2">
              <Icon name="upload" className="w-6 h-6" />
              <span>FAZER UPLOAD</span>
            </button>
          </form>
          {message && <p className={`mt-4 text-center font-semibold ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#8B2E2E]">GERENCIAR CONTEÚDO</h3>
          <div className="space-y-4">
            {db.map(item => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.theme} / {item.category} / {item.type}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingContent(item)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2">
                    <Icon name="edit" className="w-5 h-5" />
                    <span>EDITAR</span>
                  </button>
                  <button onClick={() => setDeletingId(item._id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center gap-2">
                    <Icon name="trash" className="w-5 h-5" />
                    <span>EXCLUIR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};