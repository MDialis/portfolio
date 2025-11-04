"use client";

import React, { useState, useEffect } from 'react';

// Convenção do React é usar PascalCase para nomes de componentes
export default function Test() {
  // 1. Estado para armazenar a posição do mouse (x, y)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 2. Efeito para adicionar e remover o "ouvinte" de movimento do mouse
  useEffect(() => {
    // Função que atualiza o estado
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    // Adiciona o "ouvinte" ao carregar o componente
    window.addEventListener('mousemove', handleMouseMove);

    // Função de "limpeza": remove o "ouvinte" ao desmontar o componente
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // O array vazio [] faz com que isso rode apenas uma vez (ao montar)

  // 3. Estilo dinâmico para o texto
  const lightEffect = {
    // Este é o "círculo" colorido. Usamos um gradiente radial.
    backgroundImage: `radial-gradient(
      circle at ${mousePosition.x}px ${mousePosition.y}px, 
      #ff0000, #000, #000
    )`,
    // Define o tamanho do nosso "círculo" gradiente
    backgroundSize: '1500px 1500px',
    // Esta é a mágica: o fundo fica fixo na janela de visualização.
    // Isso garante que todos os <h1>s pareçam "janelas" para o MESMO fundo.
    backgroundAttachment: 'fixed',
    // Outra mágica: corta o fundo para que ele só apareça "dentro" do texto.
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text', // Prefixo para compatibilidade com Safari
    // O texto em si fica transparente, revelando o fundo.
    color: 'transparent',
    // Ajusta a posição do gradiente para centralizá-lo no cursor
    backgroundPosition: `${mousePosition.x - 400}px ${mousePosition.y - 400}px`,
    backgroundRepeat: 'no-repeat',
  };

  return (
    // Adicionei um fundo escuro para o contraste e removi o padding original
    <main style={{ padding: '2rem', backgroundColor: '#111', minHeight: '100vh' }}>
      {/* Aplicamos o mesmo estilo a todos os elementos de texto.
        O 'className' do Tailwind continua funcionando normalmente.
      */}
      <h1 className='text-[10rem]' style={textStyle}>
        ISSO É UM TESTE
      </h1>
      <h1 className='text-[10rem]' style={textStyle}>
        ISSO É UM TESTE
      </h1>
      <h1 className='text-[10rem]' style={textStyle}>
        ISSO É UM TESTE
      </h1>
      <h1 className='text-[10rem]' style={textStyle}>
        ISSO É UM TESTE
      </h1>
      <h1 className='text-[10rem]' style={textStyle}>
        ISSO É UM TESTE
      </h1>

      {/* Removemos o <div> "Circle" porque o círculo agora é o próprio 
        fundo do texto, controlado pelo mouse.
      */}
    </main>
  );
}