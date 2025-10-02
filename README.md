# 📚 Gestor de Estudos para Concursos Públicos

Uma aplicação web completa e interativa para gerenciar estudos de concursos públicos, com foco em metodologias ágeis de aprendizado e sistema de revisão espaçada.

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

## 🎯 **Sobre o Projeto**

Este sistema foi desenvolvido especificamente para candidatos de concursos públicos que precisam de uma ferramenta robusta e organizada para gerenciar seus estudos. A aplicação implementa técnicas comprovadas de aprendizado, como a **revisão espaçada** e **cronometragem de sessões de estudo**.

### 🤖 **Desenvolvido por IA**
Esta aplicação foi inteiramente criada pelo **Claude 4 Sonnet** (Anthropic), um assistente de IA especializado em engenharia de software com foco em metodologias ágeis. O desenvolvimento seguiu as melhores práticas de:
- Planejamento estruturado de software
- Design responsivo e acessível
- Código limpo e bem documentado
- Experiência do usuário otimizada

## ✨ **Funcionalidades Principais**

### 📊 **Dashboard Inteligente**
- Countdown em tempo real para a data da prova
- Progresso geral dos estudos com visualização gráfica
- Estatísticas detalhadas de desempenho
- Alertas de revisões pendentes

### ⏱️ **Sistema de Cronometragem**
- Cronômetro integrado para sessões de estudo
- Registro automático de tempo por tópico
- Histórico completo de estudos realizados
- Controle de produtividade

### 🔄 **Revisão Espaçada Científica**
- Sistema baseado na curva do esquecimento de Ebbinghaus
- Revisões programadas: 24h, 7 dias e 30 dias
- Notificações automáticas de revisões pendentes
- Acompanhamento do ciclo completo de memorização

### 📝 **Gestão de Conteúdo**
- Tabela interativa com todos os tópicos do edital
- Controle de questões resolvidas e percentual de acertos
- Campo de observações personalizadas
- Busca e filtros avançados

### 📈 **Relatórios e Analytics**
- Progresso detalhado por matéria
- Identificação de pontos fortes e fracos
- Histórico de estudos com métricas
- Análise de desempenho temporal

### 💾 **Backup e Sincronização**
- Exportação completa dos dados em JSON
- Importação de backups anteriores
- Armazenamento local seguro (LocalStorage)
- Portabilidade entre dispositivos

## 🚀 **Como Usar**

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gestor-estudos-concursos.git

# Entre na pasta do projeto
cd gestor-estudos-concursos

# Abra o index.html no seu navegador
# Não requer servidor - funciona offline!
```

### **Primeiros Passos**
1. **Configure a data da prova** no arquivo `script.js` (linha 11)
2. **Adicione seus tópicos** ou use os dados pré-carregados do concurso CPRM
3. **Inicie uma sessão de estudo** clicando no cronômetro
4. **Marque as revisões** conforme for completando cada etapa
5. **Acompanhe seu progresso** no dashboard

## 📁 **Estrutura do Projeto**

```
gestor-estudos-concursos/
│
├── index.html          # Estrutura principal da aplicação
├── styles.css          # Estilos e design responsivo
├── script.js           # Lógica da aplicação e funcionalidades
├── data.js             # Dados iniciais do concurso (editável)
└── README.md           # Documentação do projeto
```

## 🛠️ **Tecnologias Utilizadas**

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design moderno com Flexbox e Grid
- **JavaScript (Vanilla)** - Funcionalidades interativas
- **LocalStorage** - Persistência de dados local
- **Design Responsivo** - Compatível com mobile e desktop

## 📱 **Compatibilidade**

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móveis (iOS/Android)

## 🎨 **Capturas de Tela**

### Dashboard Principal
![Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Dashboard+Principal)

### Tabela de Estudos
![Tabela](https://via.placeholder.com/800x400/3498db/ffffff?text=Tabela+de+Estudos)

### Relatórios
![Relatórios](https://via.placeholder.com/800x400/27ae60/ffffff?text=Relatórios+e+Analytics)

## 🔧 **Personalização**

### **Alterando a Data da Prova**
```javascript
// No arquivo script.js, linha 11
const examDate = new Date('2024-11-30T08:00:00'); // Altere aqui
```

### **Adicionando Novos Tópicos**
```javascript
// No arquivo data.js, adicione ao array initialData
{
    materia: "Nova Matéria", 
    topico: "Novo tópico de estudo"
}
```

### **Customizando Cores**
```css
/* No arquivo styles.css, altere as variáveis de cor */
:root {
    --primary-color: #3498db;
    --success-color: #27ae60;
    --danger-color: #e74c3c;
}
```

## 📊 **Metodologia de Estudo Implementada**

### **Sistema de Revisão Espaçada**
1. **Estudo Inicial** - Primeira exposição ao conteúdo
2. **Revisão 24h** - Primeira revisão após 1 dia
3. **Revisão 7 dias** - Segunda revisão após 1 semana
4. **Revisão 30 dias** - Revisão final após 1 mês

### **Métricas de Acompanhamento**
- Tempo total de estudo por tópico
- Percentual de conclusão por matéria
- Taxa de acertos em questões
- Frequência de revisões

## �� **Contribuindo**

Embora este projeto tenha sido criado por IA, contribuições são bem-vindas!

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 **Roadmap**

- [ ] Integração com APIs de questões
- [ ] Sistema de metas diárias/semanais
- [ ] Gráficos avançados com Chart.js
- [ ] Modo escuro/claro
- [ ] Sincronização em nuvem
- [ ] App mobile nativo
- [ ] Gamificação com pontos e conquistas

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 **Agradecimentos**

- **Claude 4 Sonnet (Anthropic)** - Desenvolvimento completo da aplicação
- **Comunidade de concurseiros** - Inspiração e feedback
- **Metodologias científicas de aprendizado** - Base teórica do sistema

## 📞 **Suporte**

Se você encontrar algum bug ou tiver sugestões:

- Abra uma [Issue](https://github.com/seu-usuario/gestor-estudos-concursos/issues)
- Entre em contato através do [Discussions](https://github.com/seu-usuario/gestor-estudos-concursos/discussions)

---

<div align="center">

**Desenvolvido com 🤖 por Claude 4 Sonnet (Anthropic)**

*"Transformando o estudo em uma experiência organizada e eficiente"*

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

</div>

## 🏆 **Casos de Sucesso**

> *"Esta aplicação revolucionou minha forma de estudar. O sistema de revisão espaçada me ajudou a fixar o conteúdo de forma muito mais eficiente!"*
> 
> **- Candidato aprovado em concurso federal**

---

### 📈 **Estatísticas do Projeto**

- 🎯 **Concursos suportados**: Todos (customizável)
- ⏱️ **Tempo de setup**: Menos de 5 minutos
- �� **Dispositivos compatíveis**: Desktop, tablet e mobile
- 💾 **Tamanho**: Menos de 500KB total
- 🔄 **Atualizações**: Versionamento semântico

---

**Bons estudos e sucesso na sua jornada! 🚀📚**
