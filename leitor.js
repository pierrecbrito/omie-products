//Ler todos os produtos da Omie e põe em um array de objetos

const url = 'https://app.omie.com.br/api/v1/geral/produtos/'
const app_key = "3004387328943"
const app_secret = "65a8a234d64af98894c5f9f0787d5797"


/**
 * 
 * @param {*} pagina - Número da página de produtos
 * @returns - Configurações da requisição
 */
const options = (pagina) => {
    return {
        method: "post",
        body: JSON.stringify(body(pagina)),
        headers: { "Content-Type": "application/json" }
    }
}

/**
 * 
 * @param {*} pagina - Número da página de produtos
 * @returns - Corpo da requisição POST
 */
const body = (pagina) => {
    return {
        "call":"ListarProdutos",
        "app_key": app_key,
        "app_secret": app_secret,
        "param":
            [{
                "pagina": pagina,
                "registros_por_pagina": 50,
                "apenas_importado_api":"N",
                "filtrar_apenas_omiepdv": "N"
            }]
    }
}


/**
 * @returns - Um array com produtos ({nome, codigo, valor})
 */
async function ler() {
    let dados = []
    let total_de_paginas = 1

    for (let index = 1; index <= total_de_paginas; index++) {
        const response = await fetch(url, options(index));
        const responseJson = await response.json();

        if(total_de_paginas == 1)
            total_de_paginas = responseJson.total_de_paginas

        responseJson.produto_servico_cadastro.forEach(p => 
             dados.push({nome: p.descricao, codigo: p.codigo, valor: p.valor_unitario})
        )
    }
    
    return dados
}

module.exports = { ler }