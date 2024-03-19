/* global template */

var operazioni = {
    matricole: {
        mostraElenco: function (selettore) {
            $.getJSON('do?action=mostraListMatricoleJSON', function (data) {
                var elencoMatricole = data;
                $(selettore).html(template.matricole.elenco.perElenco(elencoMatricole));
            });
        }
    },
    modelli: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListModelliJSON', function (data) {
                var elencoModelli = data;
                $(selettore).html(template.modello.elenco.perElenco(elencoModelli));
                $(selettoreNumeroElementi).html(elencoModelli.length);
            });
        }
    },
    operatori: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListOperatoriJSON', function (data) {
                var elencoOperatori = data;
                $(selettore).html(template.operatore.elenco.perElenco(elencoOperatori));
                $(selettoreNumeroElementi).html(elencoOperatori.length);
            });
        }
    },
    ordiniDiProduzione: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListOrdiniDiProduzioneJSON', function (data) {
                var elencoOrdiniDiProduzione = data;
                $(selettore).html(template.ordineDiProduzione.elenco.perElenco(elencoOrdiniDiProduzione));
                $(selettoreNumeroElementi).html(elencoOrdiniDiProduzione.length);
            });
        }
    },
    postazioni: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListPostazioniJSON', function (data) {
                var elencoPostazioni = data;
                $(selettore).html(template.postazione.elenco.perElenco(elencoPostazioni));
                $(selettoreNumeroElementi).html(elencoPostazioni.length);
            });
        }
    },
    terminali: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListTerminaliJSON', function (data) {
                var elencoTerminali = data;
                $(selettore).html(template.terminale.elenco.perElenco(elencoTerminali));
                $(selettoreNumeroElementi).html(elencoTerminali.length);
            });
        }
    },
    lavorazioni: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListLavorazioniJSON', function (data) {
                var elencoLavorazioni = data;
                $(selettore).html(template.lavorazione.elenco.perElenco(elencoLavorazioni));
                $(selettoreNumeroElementi).html(elencoLavorazioni.length);
            });
        }
    },
    funzioniDiLavorazione: {
        mostraElenco: function (selettore, selettoreNumeroElementi) {
            $.getJSON('do?action=mostraListFunzioniDiLavorazioneJSON', function (data) {
                var elencoFunzioniDiLavorazioni = data;
                $(selettore).html(template.funzioneDiLavorazione.elenco.perElenco(elencoFunzioniDiLavorazioni));
                $(selettoreNumeroElementi).html(elencoFunzioniDiLavorazioni.length);
            });
        }
    }
};


