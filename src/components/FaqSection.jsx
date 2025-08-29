import React from 'react';

export const FaqSection = () => {
    const faqs = [
        { q: "Como os conteúdos estão organizados?", a: "O Ponto Psique é dividido em Abordagens, Neurociência, Áreas de Atuação e Patologias. Dentro de cada tópico você encontra resumos, artigos, mapas mentais e banco de questões." },
        { q: "Esse material segue qual referência?", a: "O conteúdo é baseado em livros acadêmicos, artigos científicos e em classificações oficiais, como o DSM-5." },
        { q: "Posso usar para estudar para provas?", a: "Com certeza! O material foi feito por estudantes e para estudantes, com foco em revisões e estudos para provas da faculdade." },
        { q: "Qual a diferença entre 'Abordagens' e 'Áreas de Atuação'?", a: "Abordagens são linhas teóricas (como Psicanálise, TCC, Humanista) Já as áreas de Atuação são os contextos onde o psicólogo trabalha (como clínica, escolar, organizacional, hospitalar)." }
    ];

    return (
        <div className="py-12 bg-[#FDF6F0]">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-serif text-center text-[#3A8A88] mb-4">Perguntas Frequentes</h2>
                <div className="w-24 h-1 bg-[#3A8A88] mx-auto mb-8"></div>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-l-4 border-[#3A8A88] pl-4">
                            <h3 className="font-bold text-xl text-gray-800">{faq.q}</h3>
                            <p className="text-gray-700 mt-1">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
