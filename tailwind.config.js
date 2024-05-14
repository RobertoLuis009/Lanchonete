/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./**/*.{html,js }"], // os caminhos onde o tailwind vai ser usado
  theme: {
    extend: {
      backgroundImage:{
        home: "url('file:///C:/Users/Pichau/OneDrive/Documentos/projetos/cardapio-online/imagens/bg.png')"
      }
    },
  },
  plugins: [],
}

