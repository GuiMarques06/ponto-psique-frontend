import axios from 'axios';

// Cria uma instância do axios que aponta para a URL do seu backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Função para fazer o login
export const login = (username, password) => {
    return api.post('/api/login', { username, password });
};

// Função para buscar todo o conteúdo
export const getContent = () => {
    return api.get('/api/content');
};

// Função para criar um novo conteúdo
export const createContent = (newContent) => {
    // O ID é gerado pelo MongoDB, então não precisamos enviá-lo
    const { id, ...contentData } = newContent;
    return api.post('/api/content', contentData);
};

// Função para atualizar um conteúdo existente pelo seu ID
export const updateContent = (id, updatedContent) => {
    return api.put(`/api/content/${id}`, updatedContent);
};

// Função para deletar um conteúdo pelo seu ID
export const deleteContent = (id) => {
    return api.delete(`/api/content/${id}`);
};