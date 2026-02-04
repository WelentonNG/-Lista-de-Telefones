let contatos = []

window.onload = function(){
    carregarContatos()
    atualizarLista()
}


function adicionarContato(){

    const nome = document.getElementById("nomeInput").value.trim()
    const telefone = document.getElementById("telefoneInput").value.trim()

    if (nome == '' || telefone == ''){
        alert("😿 Por favor, preencha todos os campos")
        return;

    }

    const contato ={
        id:Date.now(),
        nome:nome,
        telefone: telefone
    }

    contatos.push(contato)
    salvarContato()
    atualizarLista()
    //alert("👌 Contato adicionado com sucesso! ")

}

function removerContato(id) {
    // Confirmar remoção
    if (confirm('Tem certeza que deseja remover este contato?')) {
        // Filtrar o array removendo o contato com o id específico
        contatos = contatos.filter(contato => contato.id !== id);
        
        // Salvar e atualizar
        salvarContato();
        atualizarLista();
        
        //alert('🗑️ Contato removido!');
    }
}

function atualizarLista(){
    const lista = document.getElementById('listaContatos')

    lista.innerHTML=''

    if (contatos.length === 0){
        lista.innerHTML = '<li class="sem-contatosNenhum contato cadastrado ainda <li>'
        return;
    }

    contatos.forEach(contato =>{

        const li = document.createElement('li')
        li.className = 'contato-item'
        li.innerHTML = `
            <div class="contato-info">
                <div class="contato-nome">${contato.nome}</div>
                <div class="contato-telefone">📱 ${contato.telefone}</div>
            </div>
            <div class="contato-acoes">
                <button class="btn-copiar" onclick="copiarTelefone('${contato.telefone}')">
                    📋 Copiar
                </button>
                <button class="btn-remover" onclick="removerContato(${contato.id})">
                    🗑️ Remover
                </button>
            </div>
        `;
        lista.appendChild(li)

    })
}

function salvarContato(){
    localStorage.setItem('contatos',JSON.stringify(contatos))
}

function carregarContatos(){
    const contatosSalvos = localStorage.getItem('contatos')
    if (contatosSalvos){
        contatos = JSON.parse(contatosSalvos)
    }
}

function copiarTelefone(telefone){
    navigator.clipboard.writeText(telefone).then(function(){

        //alert("Numero copiada"  + telefone)

    }).catch(function(erro){
        //alert("Numero: " + telefone + '\n(Copie Manualmente)')
    })
}

