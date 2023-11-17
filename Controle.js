const tbody = document.querySelector('tbody'),
    descItem = document.querySelector('#desc'),
    valor =  document.querySelector('#valor'),
    tipo = document.querySelector('#tipo'),
    btnNovo = document.querySelector('#btnNovo'),
    entradas = document.querySelector('.entradas'),
    saidas = document.querySelector('.saidas'),
    total = document.querySelector('.total')

let itens = []

btnNovo.addEventListener('click', () => {
    if(descItem.value === "" || valor.value === '' || tipo.value === ''){
        return alert('preenche ai krl')
    }

    itens.push({
        desc: descItem.value,
        valor: Math.abs(valor.value).toFixed(2),
        tipo: tipo.value,
    })

    setItensBD()
    loadItens()

    descItem.value = ''
    valor.value = ''

})

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function inserirItens(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.valor}</td>
    <td class="columnTipo">${item.tipo === 'Entrada'
            ? 'subiu'
            : 'desceu'    
    }</td>
    <td class="columnAcao">
        <button class= "button2" onclick="deleteItem(${index})">Excluir</button>
    </td>
    `
    tbody.appendChild(tr)
}

function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        inserirItens(item, index)
    })
    getTotals()
}

function getTotals(){
    const valorEntradas = itens
        .filter((item) => item.tipo === 'Entrada')
        .map((transacao) => Number(transacao.valor))

    const valorSaidas = itens
        .filter((item) => item.tipo === 'Saida')
        .map((transacao) => Number(transacao.valor))

    const totalEntradas = valorEntradas
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    const totalSaidas = valorSaidas
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)

    const totalItens = (totalEntradas - totalSaidas).toFixed(2)

    entradas.innerHTML = totalEntradas
    saidas.innerHTML = totalSaidas
    total.innerHTML = totalItens
    console.log(totalSaidas )
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_itens")) ?? []
const setItensBD = () => localStorage.setItem("db_itens", JSON.stringify(itens))

loadItens()