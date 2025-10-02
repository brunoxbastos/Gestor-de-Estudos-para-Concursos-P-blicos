// Variáveis globais
let studyData = [];
let timer = {
    startTime: null,
    elapsedTime: 0,
    isRunning: false,
    interval: null,
    currentTopic: null
};

// CORREÇÃO: Data da prova corrigida para 2024
const examDate = new Date('2025-11-30T08:00:00');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    renderStudyTable();
    updateDashboard();
    
    // Event listener para busca
    document.getElementById('searchInput').addEventListener('input', filterTable);
    
    // Event listener para formulário
    document.getElementById('addContentForm').addEventListener('submit', addNewContent);
});

// Gerenciamento de dados
function loadData() {
    const saved = localStorage.getItem('studyData');
    if (saved) {
        studyData = JSON.parse(saved);
    } else {
        // Inicializar com dados do CSV
        studyData = initialData.map((item, index) => ({
            id: index,
            materia: item.materia,
            topico: item.topico,
            isHeader: item.isHeader || false,
            teoria: false,
            rev24h: false,
            rev7d: false,
            rev30d: false,
            questoes: { quantidade: 0, percentual: 0 },
            observacoes: '',
            tempoEstudo: 0,
            dataUltimoEstudo: null,
            datasRevisoes: {
                teoria: null,
                rev24h: null,
                rev7d: null,
                rev30d: null
            }
        }));
        saveData();
    }
}

function saveData() {
    localStorage.setItem('studyData', JSON.stringify(studyData));
    updateDashboard();
}

// CORREÇÃO: Countdown para a prova com melhor formatação
function updateCountdown() {
    const now = new Date();
    const timeLeft = examDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').innerHTML = `
            <div class="time-unit">
                <span class="number">${days}</span>
                <span class="label">Dias</span>
            </div>
            <div class="time-unit">
                <span class="number">${hours}</span>
                <span class="label">Horas</span>
            </div>
            <div class="time-unit">
                <span class="number">${minutes}</span>
                <span class="label">Min</span>
            </div>
            <div class="time-unit">
                <span class="number">${seconds}</span>
                <span class="label">Seg</span>
            </div>
        `;
    } else {
        document.getElementById('countdown').innerHTML = '<h2 style="color: #e74c3c;">🎉 Dia da Prova Chegou!</h2>';
    }
}

// Gerenciamento de abas
function showTab(tabName) {
    // Esconder todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remover classe active de todas as abas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(tabName).classList.remove('hidden');
    
    // Adicionar classe active na aba clicada
    event.target.classList.add('active');
    
    // Atualizar conteúdo específico da aba
    if (tabName === 'relatorios') {
        updateReports();
    }
}

// Renderizar tabela de estudos
function renderStudyTable() {
    const tbody = document.getElementById('studyTableBody');
    tbody.innerHTML = '';
    
    studyData.forEach((item, index) => {
        if (item.isHeader) {
            tbody.innerHTML += `
                <tr class="materia-header">
                    <td colspan="10">${item.materia}</td>
                </tr>
            `;
        } else {
            tbody.innerHTML += `
                <tr>
                    <td>${item.materia}</td>
                    <td>${item.topico}</td>
                    <td><input type="checkbox" class="checkbox" ${item.teoria ? 'checked' : ''} onchange="updateStudy(${index}, 'teoria', this.checked)"></td>
                    <td><input type="checkbox" class="checkbox" ${item.rev24h ? 'checked' : ''} onchange="updateStudy(${index}, 'rev24h', this.checked)"></td>
                    <td><input type="checkbox" class="checkbox" ${item.rev7d ? 'checked' : ''} onchange="updateStudy(${index}, 'rev7d', this.checked)"></td>
                    <td><input type="checkbox" class="checkbox" ${item.rev30d ? 'checked' : ''} onchange="updateStudy(${index}, 'rev30d', this.checked)"></td>
                    <td>
                        <div class="questions-input">
                            <input type="number" value="${item.questoes.quantidade}" min="0" onchange="updateQuestions(${index}, 'quantidade', this.value)">
                            <span>/</span>
                            <input type="number" value="${item.questoes.percentual}" min="0" max="100" onchange="updateQuestions(${index}, 'percentual', this.value)">
                            <span>%</span>
                        </div>
                    </td>
                    <td><input type="text" value="${item.observacoes}" onchange="updateStudy(${index}, 'observacoes', this.value)" style="width: 100%;"></td>
                    <td>${formatTime(item.tempoEstudo)}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${index})" style="padding: 5px 10px; font-size: 12px;">🗑️</button>
                        <button class="btn" onclick="startStudySession(${index})" style="padding: 5px 10px; font-size: 12px;">⏱️</button>
                    </td>
                </tr>
            `;
        }
    });
}

// Atualizar dados de estudo
function updateStudy(index, field, value) {
    studyData[index][field] = value;
    
    // Registrar data da revisão
    if (value && field !== 'observacoes') {
        studyData[index].datasRevisoes[field] = new Date().toISOString();
        studyData[index].dataUltimoEstudo = new Date().toISOString();
    }
    
    saveData();
}

function updateQuestions(index, field, value) {
    studyData[index].questoes[field] = parseInt(value) || 0;
    saveData();
}

// CORREÇÃO: Cronômetro com lógica corrigida
function startTimer() {
    if (!timer.isRunning) {
        timer.startTime = Date.now() - timer.elapsedTime;
        timer.isRunning = true;
        timer.interval = setInterval(updateTimerDisplay, 1000);
        
        // Atualizar visual dos botões
        updateTimerButtons();
        console.log('Timer iniciado:', timer); // Debug
    }
}

function pauseTimer() {
    if (timer.isRunning) {
        timer.isRunning = false;
        clearInterval(timer.interval);
        updateTimerButtons();
        console.log('Timer pausado:', timer); // Debug
    }
}

function resetTimer() {
    timer.isRunning = false;
    timer.elapsedTime = 0;
    timer.currentTopic = null;
    clearInterval(timer.interval);
    updateTimerDisplay();
    updateTimerButtons();
    document.getElementById('currentTopic').textContent = '';
    console.log('Timer resetado:', timer); // Debug
}

function updateTimerDisplay() {
    if (timer.isRunning) {
        timer.elapsedTime = Date.now() - timer.startTime;
    }
    
    const totalSeconds = Math.floor(timer.elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById('timerDisplay').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// NOVA FUNÇÃO: Atualizar visual dos botões do timer
function updateTimerButtons() {
    const startBtn = document.querySelector('button[onclick="startTimer()"]');
    const pauseBtn = document.querySelector('button[onclick="pauseTimer()"]');
    const saveBtn = document.querySelector('button[onclick="saveStudySession()"]');
    
    if (timer.isRunning) {
        startBtn.style.opacity = '0.5';
        pauseBtn.style.opacity = '1';
        saveBtn.style.opacity = '1';
    } else {
        startBtn.style.opacity = '1';
        pauseBtn.style.opacity = '0.5';
        saveBtn.style.opacity = timer.elapsedTime > 0 ? '1' : '0.5';
    }
}

function startStudySession(index) {
    // CORREÇÃO: Melhor controle da sessão de estudo
    timer.currentTopic = index;
    const topico = studyData[index].topico;
    document.getElementById('currentTopic').innerHTML = `
        <strong>📚 Estudando:</strong> ${topico}<br>
        <small>Matéria: ${studyData[index].materia}</small>
    `;
    
    // Reset e start do timer
    resetTimer();
    timer.currentTopic = index; // Reassegurar após reset
    startTimer();
    
    console.log('Sessão iniciada para:', topico, 'Index:', index); // Debug
    showAlert(`Sessão de estudo iniciada: ${topico}`, 'success');
}

// CORREÇÃO: Função de salvar sessão corrigida
function saveStudySession() {
    console.log('Tentando salvar sessão:', timer); // Debug
    
    // Verificar se há uma sessão ativa
    if (timer.currentTopic === null) {
        showAlert('Nenhum tópico selecionado. Clique no botão ⏱️ de um tópico para iniciar uma sessão.', 'warning');
        return;
    }
    
    if (timer.elapsedTime <= 0) {
        showAlert('Nenhum tempo registrado. Inicie o cronômetro primeiro.', 'warning');
        return;
    }
    
    // Salvar o tempo estudado
    const tempoAnterior = studyData[timer.currentTopic].tempoEstudo || 0;
    studyData[timer.currentTopic].tempoEstudo = tempoAnterior + timer.elapsedTime;
    studyData[timer.currentTopic].dataUltimoEstudo = new Date().toISOString();
    
    // Salvar dados
    saveData();
    renderStudyTable();
    
    // Feedback para o usuário
    const tempoSessao = formatTime(timer.elapsedTime);
    const tempoTotal = formatTime(studyData[timer.currentTopic].tempoEstudo);
    const topico = studyData[timer.currentTopic].topico;
    
    showAlert(`✅ Sessão salva! ${tempoSessao} adicionados ao tópico "${topico}". Total: ${tempoTotal}`, 'success');
    
    // Reset do timer
    resetTimer();
}

// Filtrar tabela
function filterTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#studyTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Adicionar novo conteúdo
function addNewContent(event) {
    event.preventDefault();
    
    const materia = document.getElementById('novaMateria').value;
    const topico = document.getElementById('novoTopico').value;
    const observacoes = document.getElementById('novasObservacoes').value;
    
    const newItem = {
        id: studyData.length,
        materia: materia,
        topico: topico,
        isHeader: false,
        teoria: false,
        rev24h: false,
        rev7d: false,
        rev30d: false,
        questoes: { quantidade: 0, percentual: 0 },
        observacoes: observacoes,
        tempoEstudo: 0,
        dataUltimoEstudo: null,
        datasRevisoes: {
            teoria: null,
            rev24h: null,
            rev7d: null,
            rev30d: null
        }
    };
    
    studyData.push(newItem);
    saveData();
    renderStudyTable();
    
    // Limpar formulário
    document.getElementById('addContentForm').reset();
    
    showAlert('Conteúdo adicionado com sucesso!', 'success');
}

// Deletar item
function deleteItem(index) {
    if (confirm('Tem certeza que deseja deletar este item?')) {
        studyData.splice(index, 1);
        saveData();
        renderStudyTable();
        showAlert('Item deletado com sucesso!', 'success');
    }
}

// Atualizar dashboard
function updateDashboard() {
    const totalTopicos = studyData.filter(item => !item.isHeader).length;
    const topicosConcluidos = studyData.filter(item => !item.isHeader && item.teoria && item.rev24h && item.rev7d && item.rev30d).length;
    const progressoGeral = totalTopicos > 0 ? Math.round((topicosConcluidos / totalTopicos) * 100) : 0;
    const horasEstudadas = studyData.reduce((total, item) => total + (item.tempoEstudo || 0), 0);
    
    document.getElementById('progressoGeral').textContent = `${progressoGeral}%`;
    document.getElementById('progressBar').style.width = `${progressoGeral}%`;
    document.getElementById('topicosConcluidos').textContent = topicosConcluidos;
    document.getElementById('totalTopicos').textContent = totalTopicos;
    document.getElementById('horasEstudadas').textContent = formatTime(horasEstudadas);
    
    // Próximas revisões
    updateProximasRevisoes();
}

function updateProximasRevisoes() {
    const now = new Date();
    const proximasRevisoes = [];
    
    studyData.forEach(item => {
        if (item.isHeader) return;
        
        // Verificar revisões pendentes
        if (item.teoria && !item.rev24h && item.datasRevisoes.teoria) {
            const dataTeoria = new Date(item.datasRevisoes.teoria);
            const dataRevisao24h = new Date(dataTeoria.getTime() + 24 * 60 * 60 * 1000);
            if (now >= dataRevisao24h) {
                proximasRevisoes.push({
                    topico: item.topico,
                    tipo: 'Revisão 24h',
                    urgencia: 'urgent'
                });
            }
        }
        
        if (item.rev24h && !item.rev7d && item.datasRevisoes.rev24h) {
            const dataRev24h = new Date(item.datasRevisoes.rev24h);
            const dataRevisao7d = new Date(dataRev24h.getTime() + 7 * 24 * 60 * 60 * 1000);
            if (now >= dataRevisao7d) {
                proximasRevisoes.push({
                    topico: item.topico,
                    tipo: 'Revisão 7 dias',
                    urgencia: 'medium'
                });
            }
        }
        
        if (item.rev7d && !item.rev30d && item.datasRevisoes.rev7d) {
            const dataRev7d = new Date(item.datasRevisoes.rev7d);
            const dataRevisao30d = new Date(dataRev7d.getTime() + 30 * 24 * 60 * 60 * 1000);
            if (now >= dataRevisao30d) {
                proximasRevisoes.push({
                    topico: item.topico,
                    tipo: 'Revisão 30 dias',
                    urgencia: 'low'
                });
            }
        }
    });
    
    const container = document.getElementById('proximasRevisoes');
    if (proximasRevisoes.length === 0) {
        container.innerHTML = '<div class="alert alert-success">🎉 Nenhuma revisão pendente!</div>';
    } else {
        container.innerHTML = proximasRevisoes.map(rev => `
            <div class="revision-card ${rev.urgencia}">
                <strong>${rev.tipo}:</strong> ${rev.topico}
            </div>
        `).join('');
    }
}

// Relatórios
function updateReports() {
    updateProgressoPorMateria();
    updateMateriasMaiorProgresso();
    updateMateriasAtencao();
    updateHistoricoEstudos();
}

function updateProgressoPorMateria() {
    const materias = {};
    
    studyData.forEach(item => {
        if (item.isHeader) return;
        
        if (!materias[item.materia]) {
            materias[item.materia] = { total: 0, concluidos: 0 };
        }
        
        materias[item.materia].total++;
        if (item.teoria && item.rev24h && item.rev7d && item.rev30d) {
            materias[item.materia].concluidos++;
        }
    });
    
    const container = document.getElementById('progressoPorMateria');
    container.innerHTML = Object.entries(materias).map(([materia, dados]) => {
        const progresso = dados.total > 0 ? Math.round((dados.concluidos / dados.total) * 100) : 0;
        return `
            <div style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${materia}</span>
                    <span>${progresso}% (${dados.concluidos}/${dados.total})</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progresso}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function updateMateriasMaiorProgresso() {
    const materias = {};
    
    studyData.forEach(item => {
        if (item.isHeader) return;
        
        if (!materias[item.materia]) {
            materias[item.materia] = { total: 0, concluidos: 0 };
        }
        
        materias[item.materia].total++;
        if (item.teoria && item.rev24h && item.rev7d && item.rev30d) {
            materias[item.materia].concluidos++;
        }
    });
    
    const sorted = Object.entries(materias)
        .map(([materia, dados]) => ({
            materia,
            progresso: dados.total > 0 ? Math.round((dados.concluidos / dados.total) * 100) : 0
        }))
        .sort((a, b) => b.progresso - a.progresso)
        .slice(0, 3);
    
    document.getElementById('materiasMaiorProgresso').innerHTML = sorted.map(item => 
        `<div>📈 ${item.materia}: ${item.progresso}%</div>`
    ).join('');
}

function updateMateriasAtencao() {
    const materias = {};
    
    studyData.forEach(item => {
        if (item.isHeader) return;
        
        if (!materias[item.materia]) {
            materias[item.materia] = { total: 0, concluidos: 0 };
        }
        
        materias[item.materia].total++;
        if (item.teoria && item.rev24h && item.rev7d && item.rev30d) {
            materias[item.materia].concluidos++;
        }
    });
    
    const sorted = Object.entries(materias)
        .map(([materia, dados]) => ({
            materia,
            progresso: dados.total > 0 ? Math.round((dados.concluidos / dados.total) * 100) : 0
        }))
        .sort((a, b) => a.progresso - b.progresso)
        .slice(0, 3);
    
    document.getElementById('materiasAtencao').innerHTML = sorted.map(item => 
        `<div>⚠️ ${item.materia}: ${item.progresso}%</div>`
    ).join('');
}

function updateHistoricoEstudos() {
    const historico = studyData
        .filter(item => !item.isHeader && item.dataUltimoEstudo)
        .sort((a, b) => new Date(b.dataUltimoEstudo) - new Date(a.dataUltimoEstudo))
        .slice(0, 10);
    
    const container = document.getElementById('historicoEstudos');
    if (historico.length === 0) {
        container.innerHTML = '<p>Nenhum estudo registrado ainda.</p>';
    } else {
        container.innerHTML = historico.map(item => {
            const data = new Date(item.dataUltimoEstudo).toLocaleDateString('pt-BR');
            return `
                <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #3498db;">
                    <strong>${item.topico}</strong><br>
                    <small>📅 ${data} | ⏱️ ${formatTime(item.tempoEstudo)}</small>
                </div>
            `;
        }).join('');
    }
}

// Funções utilitárias
function formatTime(milliseconds) {
    if (!milliseconds) return '0h 0m';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${totalSeconds}s`;
    }
}

function showAlert(message, type = 'info') {
    // Criar elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.maxWidth = '400px';
    alert.style.padding = '15px';
    alert.style.borderRadius = '5px';
    alert.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    
    // Adicionar ao body
    document.body.appendChild(alert);
    
    // Remover após 4 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 4000);
}

// Funções de backup e restauração
function exportData() {
    const dataStr = JSON.stringify(studyData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `estudos-cprm-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showAlert('Dados exportados com sucesso!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (confirm('Isso substituirá todos os dados atuais. Deseja continuar?')) {
                studyData = importedData;
                saveData();
                renderStudyTable();
                updateDashboard();
                showAlert('Dados importados com sucesso!', 'success');
            }
        } catch (error) {
            showAlert('Erro ao importar dados. Arquivo inválido.', 'danger');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('studyData');
        studyData = [];
        loadData();
        renderStudyTable();
        updateDashboard();
        showAlert('Todos os dados foram limpos!', 'success');
    }
}