const leitor = require('./leitor')
const escritor = require('./escritor')


async function main() {
    const dados = await leitor.ler()
    escritor.escrever(dados)
}

main()