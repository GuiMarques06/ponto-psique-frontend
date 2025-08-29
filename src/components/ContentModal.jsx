import React from 'react';
import { Icon } from './Icon';

export const ContentModal = ({ content, onClose }) => {
    if (!content) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                <h3 className="text-3xl font-bold font-serif text-[#333] mb-4">{content.title}</h3>
                <p className="text-lg text-gray-700 mb-6">{content.description}</p>
                <div className="mt-6 flex items-center gap-4">
                    {/* O link de download agora usa os dados do ficheiro e o nome do ficheiro */}
                    {content.fileData && content.fileName && (
                        <a
                            href={content.fileData}
                            download={content.fileName}
                            className="inline-flex items-center gap-2 bg-[#3A8A88] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#317573] transition-colors duration-300"
                        >
                            <Icon name="download" className="w-5 h-5" />
                            Baixar PDF
                        </a>
                    )}
                    {content.linkUrl && (
                        <a
                            href={content.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
                        >
                            <Icon name="link" className="w-5 h-5" />
                            Acessar Link
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};