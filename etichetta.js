/* global template */

function Etichetta(codiceModello, tensione, corrente, potenza) {
    this.codiceModello = codiceModello;
    this.tensione = tensione;
    this.corrente = corrente;
    this.potenza = potenza;
}
Etichetta.prototype.caricaArrayCampiEtichetta = function () {
    var arrayCampiEtichetta = [];
    arrayCampiEtichetta.push({nome: 'cod.modello', valore: this.codiceModello, coordinataX: 30, coordinataY: 150});
    arrayCampiEtichetta.push({nome: 'tensione', valore: this.tensione, coordinataX: 30, coordinataY: 250});
    arrayCampiEtichetta.push({nome: 'corrente', valore: this.corrente, coordinataX: 30, coordinataY: 350});
    arrayCampiEtichetta.push({nome: 'potenza', valore: this.potenza, coordinataX: 30, coordinataY: 450});
    this.arrayCampiEtichetta = arrayCampiEtichetta;
};
Etichetta.prototype.disegnaCanvasEtichetta = function (selettoreCanvas, funzioneEtichettaCaricata) {
    console.log('invocata la funzione disegnaCanvasEtichetta');
    console.log('this.tensione: ' + this.tensione);
    console.log("selettoreCanvas:" + selettoreCanvas);

    var canvas = document.getElementById(selettoreCanvas);
    var contestoCanvas = canvas.getContext('2d');
    contestoCanvas.font = '50px Helvetica';
    contestoCanvas.fillText('ETICHETTA KEYFROST', 10, 50);
    contestoCanvas.font = '30px Arial';
    function disegnaCampoEtichetta(campoEtichetta) {
        contestoCanvas.fillText(campoEtichetta.nome + ': ' + template.stringheParticolari.segnapostoSeUndefined(campoEtichetta.valore, 'N.D.'), campoEtichetta.coordinataX, campoEtichetta.coordinataY);
    }
    this.arrayCampiEtichetta.forEach(disegnaCampoEtichetta);
    var immagineProva = document.getElementById('logo-keyfrost');
    contestoCanvas.drawImage(immagineProva, 320, 680);
    canvas.style.display = 'block';
    funzioneEtichettaCaricata();
};