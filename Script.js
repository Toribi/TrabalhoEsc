// Lista de usuários cadastrados
let usuarios = [
    { nome: "Paulo Matias", idade: "23", curso: "Informática", turno: "Noturno", endereco: "Rua Exemplo, 123", cep: "00000-000", cadastrado: true },
    { nome: "Geosemir Dantas", idade: "18", curso: "Medicina", turno: "Tarde", endereco: "Av. Teste, 456", cep: "00000-000", cadastrado: true },
    { nome: "Maria Silva", idade: "21", curso: "Engenharia", turno: "Manhã", endereco: "Praça Alegria, 789", cep: "00000-000", cadastrado: true }
];

// Lista de usuários excluídos (lixeira)
let usuariosExcluidos = [
    { nome: "Murilo Castro", idade: "21", curso: "Engenharia", turno: "Manhã", endereco: "Praça Alegria, 789", cep: "00000-000", cadastrado: false },
    { nome: "Jonas Augusto", idade: "18", curso: "Medicina", turno: "Tarde", endereco: "Av. Teste, 456", cep: "00000-000", cadastrado: false }
];

let usuarioEditIndex = null; // Índice do usuário que está sendo editado

document.addEventListener('DOMContentLoaded', function() {
    exibirUsuarios();
    exibirUsuariosExcluidos();
});

// Exibe a lista de usuários cadastrados
function exibirUsuarios() {
    let usuariosUl = document.getElementById('usuarios');
    usuariosUl.innerHTML = '';
    usuarios.forEach((usuario, i) => {
        let zebra_class = (i % 2) ? 'bg' : ''; // Alterna a classe para estilo de fundo
        let status = usuario.cadastrado ? 'Cadastrado' : 'Não cadastrado';
        let badgeClass = usuario.cadastrado ? 'badge-cadastrado' : 'badge-nao-cadastrado';
        let html = `
        <li class="${zebra_class}">
            <div class="collapsible-header" onclick="toggleContent(${i})">
                <i class="tiny material-icons user-icon">account_circle</i>
                <strong>${usuario.nome}</strong> <span class="idade">${usuario.idade} anos</span>
                <span class="curso">${usuario.curso}</span>
                <span class="badge ${badgeClass}">${status}</span>
                <i id="arrow-${i}" class="tiny material-icons user-icon">arrow_drop_down</i>
            </div>
            <div id="content-${i}" class="collapsible-body" style="display: none;">
                <p><strong>Turno:</strong> ${usuario.turno}</p>
                <p><strong>Endereço:</strong> ${usuario.endereco}</p>
                <p><strong>CEP:</strong> ${usuario.cep}</p>
                <p><strong>Status:</strong> ${status}</p>
                <a href="#!" onclick="editarUsuario(${i})"><i class="tiny material-icons user-icon">edit</i> Editar</a>
                <a href="#!" onclick="removerUsuario(${i})"><i class="tiny material-icons user-icon">delete</i> Remover</a>
            </div>
        </li>
        `;
        usuariosUl.innerHTML += html;
    });
}

/* (${i}) Utiliza template literals para incluir o índice 'i' dentro da string, criando IDs únicos para cada elemento.
diferencia elementos dinamicamente gerados, como os botões de expandir/colapsar para cada usuário.
*/

// Remove um usuário e adiciona à lista de excluídos
function removerUsuario(index) {
    if (confirm("Deseja remover este usuário?")) {
        let usuario = usuarios[index];
        usuario.cadastrado = false;
        usuariosExcluidos.push(usuario);
        usuarios.splice(index, 1);
        exibirUsuarios(); 
        exibirUsuariosExcluidos();
    }
}

// Exibe a lista de usuários excluídos
function exibirUsuariosExcluidos() {
    let usuariosUl = document.getElementById('deleted-users');
    usuariosUl.innerHTML = '';
    usuariosExcluidos.forEach((usuario, i) => {
        let zebra_class = (i % 2) ? 'bg' : '';
        let status = usuario.cadastrado ? 'Cadastrado' : 'Não cadastrado';
        let badgeClass = usuario.cadastrado ? 'badge-cadastrado' : 'badge-nao-cadastrado';
        let html = `
        <li class="${zebra_class}">
            <div class="collapsible-header" onclick="toggleContent(${i}, true)">
                <i class="tiny material-icons user-icon">account_circle</i>
                <strong>${usuario.nome}</strong> <span class="idade">${usuario.idade} anos</span>
                <span class="curso">${usuario.curso}</span>
                <span class="badge ${badgeClass}">${status}</span>
                <i id="arrow-excluidos-${i}" class="tiny material-icons user-icon">arrow_drop_down</i>
            </div>
            <div id="content-excluidos-${i}" class="collapsible-body" style="display: none;">
                <p><strong>Turno:</strong> ${usuario.turno}</p>
                <p><strong>Endereço:</strong> ${usuario.endereco}</p>
                <p><strong>CEP:</strong> ${usuario.cep}</p>
                <p><strong>Status:</strong> ${status}</p>
                <a href="#!" onclick="restaurarUsuario(${i})"><i class="tiny material-icons user-icon">restore</i> Restaurar</a>
                <a href="#!" onclick="excluirUsuarioPermanente(${i})"><i class="tiny material-icons user-icon">delete_forever</i> Remover Permanentemente</a>
            </div>
        </li>
        `;
        usuariosUl.innerHTML += html;
    });
}

// Alterna a exibição do conteúdo (setinha)
function toggleContent(index, isDeleted = false) {
    let content = document.getElementById(isDeleted ? `content-excluidos-${index}` : `content-${index}`);
    let arrow = document.getElementById(isDeleted ? `arrow-excluidos-${index}` : `arrow-${index}`);
    if (content.style.display === 'none') {
        content.style.display = 'block';
        arrow.innerText = 'arrow_drop_up';
    } else {
        content.style.display = 'none';
        arrow.innerText = 'arrow_drop_down';
    }
}

// Restaura um usuário da lista de excluídos
function restaurarUsuario(index) {
    if (confirm("Deseja restaurar este usuário?")) {
        let usuario = usuariosExcluidos[index];
        usuario.cadastrado = true;
        usuarios.push(usuario);
        usuariosExcluidos.splice(index, 1);
        exibirUsuarios();
        exibirUsuariosExcluidos();
    }
}

// Remove um usuário permanentemente da lista de excluídos
function excluirUsuarioPermanente(index) {
    if (confirm("Deseja excluir este usuário permanentemente?")) {
        usuariosExcluidos.splice(index, 1);
        exibirUsuariosExcluidos();
    }
}

// Exibe a seção para adicionar usuário
function mostrarAdicionarUsuario() {
    document.getElementById('add-user-section').style.display = 'block';
    document.getElementById('cep-section').style.display = 'none';
    document.getElementById('manage-registration-section').style.display = 'none';
    document.getElementById('deleted-users-section').style.display = 'none';
}

// Exibe a seção para gerenciar cadastro
function mostrarGerenciarCadastro() {
    exibirUsuarios();
    document.getElementById('add-user-section').style.display = 'none';
    document.getElementById('cep-section').style.display = 'none'; 
    document.getElementById('manage-registration-section').style.display = 'block';
    document.getElementById('deleted-users-section').style.display = 'none';
}

// Exibe a seção para a lixeira
function mostrarLixeira() {
    exibirUsuariosExcluidos();
    document.getElementById('add-user-section').style.display = 'none';
    document.getElementById('cep-section').style.display = 'none';
    document.getElementById('manage-registration-section').style.display = 'none';
    document.getElementById('deleted-users-section').style.display = 'block';
}

// Exibe a seção do CEP e valida as informações
function mostrarCep() {
    let nome = document.getElementById('first_name').value;
    let idade = document.getElementById('age').value;
    let curso = document.getElementById('course').value;
    let turno = document.getElementById('shift').value;

    if (validarInformacoes(nome, idade, curso, turno)) {
        document.getElementById('add-user-section').style.display = 'none';
        document.getElementById('cep-section').style.display = 'block';
        document.getElementById('cep-info').style.display = 'none'; 
        document.getElementById('save-button').style.display = 'none';
    }
}

// Valida as informações fornecidas pelo usuário
function validarInformacoes(nome, idade, curso, turno) {
    let valido = true;

    if (!validarNome(nome)) {
        M.toast({html: 'Nome deve ter pelo menos 10 caracteres e conter pelo menos um sobrenome.'});
        valido = false;
    }

    if (!validarIdade(idade)) {
        M.toast({html: 'Idade deve ser um número entre 1 e 150.'});
        valido = false;
    }

    if (!validarCurso(curso)) {
        M.toast({html: 'Curso deve ter pelo menos 3 caracteres.'});
        valido = false;
    }

    if (!turno) {
        M.toast({html: 'Turno é obrigatório.'});
        valido = false;
    }

    return valido;
}

// Valida o nome do usuário
function validarNome(nome) {
    return nome.split(' ').length >= 2 && nome.length >= 10;
}

// Valida a idade do usuário
function validarIdade(idade) {
    let idadeInt = parseInt(idade, 10);
    return idadeInt >= 1 && idadeInt <= 150;
}

// Valida o curso do usuário
function validarCurso(curso) {
    return curso.length >= 3;
}

// Volta para a seção de informações do usuário
function voltarParaInformacoesUsuario() {
    document.getElementById('add-user-section').style.display = 'block';
    document.getElementById('cep-section').style.display = 'none';
}

// Valida e busca o CEP
function validarCEP() {
    let cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    M.toast({html: 'CEP não encontrado.'});
                } else {
                    // Certifique-se de que os IDs dos elementos estão corretos
                    document.getElementById('logradouro').innerText = `Logradouro: ${data.logradouro || 'Não disponível'}`;
                    document.getElementById('bairro').innerText = `Bairro: ${data.bairro || 'Não disponível'}`;
                    document.getElementById('localidade').innerText = `Cidade: ${data.localidade || 'Não disponível'}`;
                    document.getElementById('uf').innerText = `UF: ${data.uf || 'Não disponível'}`;
                    
                    // Verifique se esses IDs existem e são corretos
                    document.getElementById('address').value = data.logradouro || '';
                    document.getElementById('neighborhood').value = data.bairro || '';
                    document.getElementById('city').value = data.localidade || '';
                    document.getElementById('state').value = data.uf || '';
                    
                    document.getElementById('cep-info').style.display = 'block';
                    document.getElementById('save-button').style.display = 'block';
                }
            })
            .catch(() => M.toast({html: 'Erro ao buscar o CEP.'}));
    } else {
        M.toast({html: 'CEP inválido.'});
    }
}



// Adiciona um novo usuário
function adicionarUsuario() {
    let nome = document.getElementById('first_name').value;
    let idade = document.getElementById('age').value;
    let curso = document.getElementById('course').value;
    let turno = document.getElementById('shift').value;
    let endereco = document.getElementById('address').value;
    let cep = document.getElementById('cep').value;

    if (validarInformacoes(nome, idade, curso, turno)) {
        if (usuarioEditIndex !== null) {
          
            usuarios[usuarioEditIndex] = { nome, idade, curso, turno, endereco, cep, cadastrado: true };
            M.toast({html: 'Usuário atualizado com sucesso!'});
            usuarioEditIndex = null; // Reseta o índice de edição
        } else {
            
            usuarios.push({ nome, idade, curso, turno, endereco, cep, cadastrado: true });
            M.toast({html: 'Usuário adicionado com sucesso!'});
        }
        document.getElementById('add-user-form').reset();
        document.getElementById('cep-info').style.display = 'none';
        document.getElementById('save-button').style.display = 'none';
        mostrarGerenciarCadastro();
    }
}

// Edita um usuário existente
function editarUsuario(index) {
    usuarioEditIndex = index; // Define o índice do usuário a ser editado
    document.getElementById('first_name').value = usuarios[index].nome;
    document.getElementById('age').value = usuarios[index].idade;
    document.getElementById('course').value = usuarios[index].curso;
    document.getElementById('shift').value = usuarios[index].turno;
    document.getElementById('cep').value = usuarios[index].cep;

    
    document.getElementById('address').value = usuarios[index].endereco || '';
    document.getElementById('neighborhood').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';

    document.getElementById('add-user-section').style.display = 'block';
    document.getElementById('cep-info').style.display = 'none';
    document.getElementById('save-button').style.display = 'block'; 
    document.getElementById('manage-registration-section').style.display = 'none';
    document.getElementById('deleted-users-section').style.display = 'none';

    document.getElementById('save-button').onclick = function() {
        adicionarUsuario(); 
    };
}

function apagarTodosUsuarios() {
    if (confirm("Deseja apagar todos os usuários?")) {
        usuariosExcluidos = usuariosExcluidos.concat(usuarios);
        usuarios = [];
        
        exibirUsuarios();
        exibirUsuariosExcluidos();
        
        M.toast({html: 'Todos os usuários foram movidos para a lixeira.'});
    }
}

function apagarTodosUsuariosExcluidos() {
    if (confirm("Deseja apagar todos os usuários excluídos?")) {
        usuariosExcluidos = [];
        exibirUsuariosExcluidos();
        M.toast({html: 'Todos os usuários excluídos foram apagados.'});
    }
}

