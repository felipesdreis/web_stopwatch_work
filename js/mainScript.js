let startBtn = document.querySelector('#start')
let pauseBtn = document.querySelector('#pause')
let stopBtn = document.querySelector('#stop')
let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let seconds = document.querySelector('#seconds')
let secTenth = document.querySelector('#secTenth')
let tableLogHours = document.querySelector('#tableLogHours')
let totalLabel = document.querySelector('#tempoSoma')

var timer = new easytimer.Timer()

timer.addEventListener('secondTenthsUpdated', () => {
    const obj = timer.getTimeValues()
    hours.innerText = obj.hours.toString().padStart(2, '0')
    minutes.innerText = obj.minutes.toString().padStart(2, '0')
    seconds.innerText = obj.seconds.toString().padStart(2, '0')
    secTenth.innerText = obj.secondTenths.toString().padStart(2, '0')
})

startBtn.addEventListener('click', () => {
    timer.start({
        precision: 'secondTenths'
    })
})

pauseBtn.addEventListener('click', () => {
    timer.pause()
})

//Log Button
stopBtn.addEventListener('click', () => {

    if (parseInt(hours.innerText) == 0 && parseInt(minutes.innerText) == 0) {
        alert("Sem horas de trabalho suficiente para logar")
        timer.stop()
        cleanHours()
        return
    }

    timer.stop()

    //document.getElementById("myForm").style.display = "block";

    description = prompt("Qual a Atividade?")
    var totalTime = `${hours.innerText}:${minutes.innerText}`

    insertRowTable(description, totalTime)
    cleanHours()
    calculaTotal()

})

function manualLog(){
    var descAtvidade = prompt("Qual a Atividade?")
    var ativTempo = prompt("Qual o tempo gasto (00:00)")

    insertRowTable(descAtvidade, ativTempo)
    //cleanHours()
    calculaTotal()
}

function insertRowTable(desc, time) {
console.log("FSDR ~ insertRowTable ~ desc", desc)
    
    if(desc.length  < 1 ){
        alert('Não é possivel inserir atividade com descrição nula')
        let newdesc =  prompt("Qual a Atividade?")
        if(newdesc.length  < 1){
            alert('Log cancelado')
            return
        }
    }

    var row = tableLogHours.insertRow(1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    cell1.innerHTML = desc
    cell2.innerHTML = time

    var tableData = htmlToJson()
    localStorage.setItem("tableData", tableData)

}

function refreshPage() {
    document.location.reload()
    localStorage.clear()
}

function printTable() {
    var toPrint = document.getElementById('divTable')
    newWin = window.open("")
    newWin.document.write(toPrint.outerHTML)
    newWin.print()
    newWin.close()
    
}

function cleanHours() {
    hours.innerText = '00'
    minutes.innerText = '00'
    seconds.innerText = '00'
    secTenth.innerText = '00'
}


function htmlToJson() {
    var table = $('#tableLogHours').tableToJSON();
    let cleanTable = table.filter((line)=>{
        return line.Atividade.length > 1
    })
    return JSON.stringify(cleanTable)
}

window.onload = function () {
    refreshTable()
    calculaTotal()
}

function refreshTable(){
    var data = JSON.parse(localStorage.getItem("tableData"))
    
    try {
        data.forEach(item => {
            var row = tableLogHours.insertRow(1)
            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            cell1.innerHTML = item.Atividade
            cell2.innerHTML = item.Tempo
        });
    } catch (error) {
        console.log("Falha em carregar dados ou sem dados ->", error.message);
    }
}

function calculaTotal(){

    var tableData = htmlToJson()
    tableData = JSON.parse(tableData)

    let iniTempo = moment.duration("00:00")
    tableData.forEach(tableRow => {
        let tempo = (tableRow.Tempo == null || tableRow.Tempo == "") ? 0 : tableRow.Tempo
        console.log("FSDR ~ calculaTotal ~ tempo", tempo)
        let valor_a_somar = moment.duration(tempo)
        iniTempo = moment.duration(iniTempo + valor_a_somar)
    });

    let soma = iniTempo.asSeconds()
    soma = moment().startOf('day').seconds(soma).format("HH:mm")
    console.log("FSDR ~ calculaTotal ~ totalLabel", totalLabel)
    totalLabel.textContent = soma
    
}
