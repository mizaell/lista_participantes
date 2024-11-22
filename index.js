let participantes = [
  {
    nome: "Mizael",
    email: "mizael@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 14, 0),
    dataCheckIn: new Date(2024, 2, 25, 21, 30)
  },
  {
    nome: "Carlos",
    email: "carlos.santos@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 9, 45),
    dataCheckIn: new Date(2024, 2, 26, 10, 15)
  },
  {
    nome: "Beatriz",
    email: "bia.lima@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 16, 10),
    dataCheckIn: null
  },
  {
    nome: "João",
    email: "joao.oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 18, 0),
    dataCheckIn: new Date(2024, 2, 25, 22, 10)
  },
  {
    nome: "Mariana",
    email: "mariana.pereira@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 11, 20),
    dataCheckIn: new Date(2024, 2, 26, 9, 0)
  },
  {
    nome: "Pedro",
    email: "pedro.almeida@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 40),
    dataCheckIn: new Date(2024, 2, 25, 21, 15)
  },
  {
    nome: "Larissa",
    email: "larissa.ferreira@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 10, 30),
    dataCheckIn: new Date(2024, 2, 26, 11, 0)
  },
  {
    nome: "Rafael",
    email: "rafael.martins@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 10),
    dataCheckIn: new Date(2024, 2, 25, 22, 30)
  },
  {
    nome: "Clara",
    email: "clara.souza@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 13, 0),
    dataCheckIn: new Date(2024, 2, 25, 20, 0)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista (participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) =>  p.email == participante.email
  )

  if(participanteExiste) {
    alert ('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemconfirmaca = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemconfirmaca) == false){
    return
  }

  const participante = participantes.find(
    (p) =>  p.email == event.target.dataset.email
  )
  participante.dataCheckIn = new Date ()

  atualizarLista(participantes)
}

