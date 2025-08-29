import React, { useState, useEffect, useMemo } from 'react';
import { getContent, login } from './services/api';

// Importando todos os seus componentes
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SubThemeListPage } from './components/SubThemeListPage';
import { ContentTypeGridPage } from './components/ContentTypeGridPage';
import { ContentListPage } from './components/ContentListPage';
import { AllContentPage } from './components/AllContentPage';
import { LoginPage } from './components/LoginPage';
import { AdminPage } from './components/AdminPage';
import { Icon } from './components/Icon';

export default function App() {
    const [page, setPage] = useState('home');
    const [pageProps, setPageProps] = useState({});
    const [db, setDb] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // INÍCIO DA SEÇÃO CORRIGIDA
    const [allThemes, setAllThemes] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allTypes, setAllTypes] = useState([]);

    useEffect(() => {
        // Esta função atualiza as listas de filtros sempre que os dados do DB mudam
        if (db.length > 0) {
            setAllThemes([...new Set(db.map(item => item.theme))]);
            setAllCategories([...new Set(db.map(item => item.category))]);
            setAllTypes([...new Set(db.map(item => item.type))]);
        }
    }, [db]);
    // FIM DA SEÇÃO CORRIGIDA

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await getContent();
                if (Array.isArray(response.data)) {
                    setDb(response.data);
                } else {
                    console.error("Erro: A API não retornou uma lista de dados.", response.data);
                    setDb([]);
                }
            } catch (error) {
                console.error("Falha ao buscar conteúdo da API:", error);
                setDb([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, []);

    const contentHierarchy = {
        'NEUROCIÊNCIAS': ['Neuroanatomia', 'Neurofisiologia'],
        'ABORDAGENS': ['Psicanálise', 'Behaviorismo', 'Gestalt Terapia', 'Cognitivo Comportamental', 'Humanista', 'Psicologia Analítica'],
        'ÁREAS DE ATUAÇÃO': ['Clínica', 'Organizacional', 'Educacional', 'Social', 'Esportiva', 'Hospitalar', 'Trânsito', 'Jurídica', 'Avaliação Psicológica'],
        'PATOLOGIAS': ['Transtornos']
    };

    const themeDescriptions = {
        'ABORDAGENS': 'As abordagens são as diferentes linhas teóricas que orientam a prática da Psicologia. Cada uma traz formas próprias de compreender o ser humano e suas relações, como a Psicanálise, a TCC, a Humanista, entre outras.',
        'NEUROCIÊNCIAS': 'A neurociência estuda o funcionamento do sistema nervoso e como ele influencia pensamentos, emoções e comportamentos.',
        'ÁREAS DE ATUAÇÃO': 'As áreas de atuação mostram os diversos contextos em que o psicólogo pode trabalhar, como clínica, escolar, organizacional, hospitalar, esportiva, entre outras. Cada uma tem demandas e práticas específicas.',
        'PATOLOGIAS': 'Aqui você encontra conteúdos sobre os principais transtornos psicológicos e psiquiátricos, para facilitar o estudo e a compreensão clínica.'
    };

    const mainThemes = Object.keys(contentHierarchy);

    const handleNavigate = (newPage, props = {}) => {
        if (newPage === 'admin' && !isAuthenticated) {
            setPage('login');
            setPageProps({});
        } else {
            setPage(newPage);
            setPageProps(props);
        }
        window.scrollTo(0, 0);
    };

    const handleLogin = async (username, password) => {
        try {
            await login(username, password);
            setIsAuthenticated(true);
            handleNavigate('admin');
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            console.error("Erro no login:", error);
            return false;
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        handleNavigate('home');
    };

    const renderPage = () => {
        if (isLoading) {
            return <div className="text-center py-20 text-xl">Carregando aplicação...</div>;
        }
        switch (page) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} themes={mainThemes} />;
            case 'subThemeList':
                return <SubThemeListPage onNavigate={handleNavigate} subThemes={contentHierarchy[pageProps.theme] || []} themeDescriptions={themeDescriptions} {...pageProps} />;
            case 'contentTypeGrid':
                return <ContentTypeGridPage onNavigate={handleNavigate} types={allTypes} {...pageProps} />;
            case 'contentList':
                return <ContentListPage onNavigate={handleNavigate} db={db} {...pageProps} />;
            case 'allContent':
                return <AllContentPage onNavigate={handleNavigate} db={db} allThemes={allThemes} allCategories={allCategories} {...pageProps} />;
            case 'login':
                return <LoginPage onLogin={handleLogin} />;
            case 'admin':
                return isAuthenticated ?
                    <AdminPage db={db} setDb={setDb} onLogout={handleLogout} allThemes={allThemes} setAllThemes={setAllThemes} allCategories={allCategories} setAllCategories={setAllCategories} allTypes={allTypes} setAllTypes={setAllTypes} />
                    : <LoginPage onLogin={handleLogin} />;
            default:
                return <HomePage onNavigate={handleNavigate} themes={mainThemes} />;
        }
    };

    return (
        <div className="bg-[#FDF6F0] min-h-screen font-sans">
            <Header onNavigate={handleNavigate} types={allTypes} />
            <main>{renderPage()}</main>
            <footer className="text-center py-6 bg-[#8B2E2E] text-white mt-12">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="https://www.instagram.com/pontopsique" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white transition-opacity hover:opacity-75">
                        <Icon name="instagram" className="w-7 h-7" />
                    </a>
                    <a href="https://wa.me/5543999783654" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white transition-opacity hover:opacity-75">
                        <Icon name="whatsapp" className="w-7 h-7" />
                    </a>
                </div>
                <p>&copy; 2024 PontoPsique. Todos os direitos reservados.</p>
                <button onClick={() => handleNavigate('admin')} className="mt-2 text-sm text-gray-300 hover:underline">Acesso Admin</button>
            </footer>
        </div>
    );
}