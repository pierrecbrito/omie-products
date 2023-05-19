const xl = require('excel4node')
const wb = new xl.Workbook()
const ws = wb.addWorksheet('Produtos da Omie')

/**
 * Escrever os produtos nas linhas da planilha
 * 
 * @param {*} dados - Array de produtos
 */
function escrever(dados) {
    escreverColunas()

    let linhaIndex = 2; 
    dados.forEach(produto => { 
        ws.cell(linhaIndex,1).string(produto.nome)
        ws.cell(linhaIndex,2).string(produto.codigo)
        ws.cell(linhaIndex,3).number(produto.valor)
        let valorSemMargem = produto.valor - (0.375 * produto.valor)
        ws.cell(linhaIndex,4).number(valorSemMargem)
        ++linhaIndex
    });

    wb.write('Produtos da Omie.xlsx')
}

/**
 * Escrever na planilha o nome do cabeçalho das colunas
 */
const escreverColunas = () => {
    const colunas = [
        "Nome",
        "Código",
        "Preço (com margem)",
        "Preço (sem margem)"
    ]

    let counter = 1; 
    colunas.forEach(cabecalho => { 
        ws.cell(1, counter++).string(cabecalho);
    });
}

module.exports = { escrever }
