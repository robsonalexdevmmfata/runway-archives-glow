# Atualizações - Sistema de Categorias com Hover Rosa

## 🎨 Mudanças Implementadas

### 1. **Efeito Hover Rosa Claro**
Todas as categorias agora têm um elegante efeito hover rosa claro quando o mouse passa por cima:
- Fundo rosa translúcido (`hover:bg-pink-500/10`)
- Brilho rosa suave ao redor do card (`shadow-[0_0_20px_rgba(236,72,153,0.3)]`)
- Texto muda para tons de rosa (`group-hover:text-pink-300`)
- Imagem com leve zoom (`group-hover:scale-105`)
- Badge de ranking com borda rosa brilhante

### 2. **Modal de Detalhes Completo**
Ao clicar em qualquer categoria, abre um modal com:
- **Imagem principal** em alta resolução com badge de ranking
- **Vídeo da runway** (se disponível) - embed do YouTube/Vimeo
- **Detalhes textuais** com descrição completa
- **Galeria de imagens adicionais**
- Design com tema rosa e dourado, mantendo a identidade visual

### 3. **Estrutura de Dados Expandida**
O tipo `Nominee` agora suporta:
```typescript
type Nominee = {
  name: string;        // Nome do modelo/desfile
  sub: string;         // Subtítulo/período
  img: string;         // Imagem principal
  rank: string;        // Posição no ranking
  videoUrl?: string;   // URL do vídeo (YouTube embed)
  details?: string;    // Texto descritivo completo
  gallery?: string[];  // Array de URLs de imagens adicionais
}
```

## 📝 Como Adicionar Vídeos e Conteúdo

### Adicionando Vídeo do YouTube
1. Vá para o vídeo no YouTube
2. Clique em "Compartilhar" → "Incorporar"
3. Copie apenas a URL do `src` (formato: `https://www.youtube.com/embed/VIDEO_ID`)
4. Adicione no campo `videoUrl` do nominee

**Exemplo:**
```typescript
{
  name: "ADRIANA LIMA",
  sub: "1999 — 2018",
  img: model1,
  rank: "1º",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL embed do YouTube
  details: "Descrição completa da modelo...",
  gallery: [model2, model3, model4]
}
```

### Adicionando Vídeo do Vimeo
Use o formato: `https://player.vimeo.com/video/VIDEO_ID`

### Adicionando Detalhes
Adicione um texto descritivo no campo `details`:
```typescript
details: "Adriana Lima é considerada uma das Angels mais icônicas..."
```

### Adicionando Galeria
Adicione um array de URLs de imagens:
```typescript
gallery: [
  "/caminho/imagem1.jpg",
  "/caminho/imagem2.jpg", 
  "/caminho/imagem3.jpg"
]
```

## 🎯 Exemplo Completo

```typescript
{
  slug: "melhor-angel",
  title: "MELHOR ANGEL",
  nominees: [
    {
      name: "ADRIANA LIMA",
      sub: "1999 — 2018",
      img: model1,
      rank: "1º",
      videoUrl: "https://www.youtube.com/embed/SEU_VIDEO_ID",
      details: "Adriana Lima é considerada uma das Angels mais icônicas da história da Victoria's Secret. Com 19 anos de desfiles consecutivos, ela se tornou sinônimo da marca.",
      gallery: [model2, model3, model4]
    },
    // outros nominees...
  ]
}
```

## 🔧 Arquivos Modificados

1. **src/routes/categoria.$slug.tsx**
   - Adicionado sistema de modal com Dialog
   - Implementado hover rosa em todos os cards
   - Criado layout responsivo para detalhes

2. **src/lib/vs-data.ts**
   - Expandido tipo `Nominee` com campos opcionais
   - Adicionados exemplos com vídeos e detalhes

3. **src/styles.css**
   - Adicionada cor personalizada `--pink-glow`

## 💡 Dicas

- **Vídeos privados**: Certifique-se que os vídeos do YouTube estão públicos ou não-listados
- **Performance**: Use imagens otimizadas para web (formato WebP recomendado)
- **Responsividade**: O modal é scrollável e responsivo automaticamente
- **Acessibilidade**: Todos os elementos têm alt text e aria-labels apropriados

## 🚀 Próximos Passos Sugeridos

1. Adicionar vídeos reais das runways da Victoria's Secret
2. Expandir galeria com mais fotos históricas
3. Adicionar informações sobre designers e coleções
4. Implementar sistema de favoritos
5. Adicionar compartilhamento social
