'use strict'

const Frete = require('../Models/FreteModel')

var hh = 0
var mm = 0
var ss = 0

var tempo = 1000;
var cron;

function AlterFreteStatusTime(param) {
    cron = setInterval(() => { timer(param); }, tempo)
}

function Pause() {
    clearInterval(cron)
}

function Stop() {
    clearInterval(cron)
    hh = 0;
    mm = 0;
    ss = 0;
}

async function timer(param) {
    ss++;

    if (ss == 60) {
        ss = 0;
        mm++
        if (mm == 30) {
            UpdateFreteStatus(param)
            Stop()
        }
    }

    var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    console.log(format)
}



async function UpdateFreteStatus(param) {
    let checkStatus = await Frete.findByPk(param.id)
    if (!checkStatus)
        return console.log('[Error] - Frete not found, ID: ' + param.id)

    if (checkStatus.status == "Pendente") {
        await Frete.update({ status: "Rejeitado" }, { where: { id: param.id } })
    }
}

module.exports = {
    AlterFreteStatusTime, Pause, Stop, timer
}