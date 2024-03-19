var template = {
    stringheParticolari: {
        segnapostoSeUndefined: function (stringa, segnaposto) {
            if (segnaposto === undefined) {
                segnaposto = '---';
            }
            if (stringa === undefined) {
                return segnaposto;
            } else {
                return stringa;
            }
        },
        segnapostoDaBoolean: function (valoreBoolean, segnapostoTrue, segnapostoFalse) {
            if (valoreBoolean === undefined) {
                return '---';
            }
            if (segnapostoTrue === undefined) {
                throw new Error('segnapostoTrue undefined');
            }
            if (segnapostoFalse === undefined) {
                throw new Error('segnapostoFalse undefined');
            }
            if (valoreBoolean) {
                return segnapostoTrue;
            } else {
                return segnapostoFalse;
            }
        }
    },
    orari: {
        oreMinutiSecondi: function (numeroSecondi) {
            function templateOreMinutiSecondi(stringNumeroSecondi) {
                try {
                    var numeroSecondi=parseInt(stringNumeroSecondi);                    
                    if (isNaN(numeroSecondi)){
                        throw new Error("errorMessage NaN");
                    }
                    if (numeroSecondi === 1)
                        return '1 secondo';
                    if (numeroSecondi < 60)
                        return numeroSecondi + ' secondi';
                    if (numeroSecondi === 60)
                        return '1 minuto';
                    var resto60 = numeroSecondi % 60;
                    if (numeroSecondi < 120)
                        return '1 minuto ' + templateOreMinutiSecondi(resto60);
                    if (numeroSecondi < 3600) {
                        var quoziente60 = (numeroSecondi - resto60) / 60;
                        return quoziente60 + ' minuti ' + ((resto60 === 0) ? '' : templateOreMinutiSecondi(resto60));
                    }
                    if (numeroSecondi === 3600)
                        return '1 ora';
                    var resto3600 = numeroSecondi % 3600;
                    var quoziente3600 = (numeroSecondi - resto3600) / 3600;
                    if (numeroSecondi < 7200)
                        return '1 ora ' + templateOreMinutiSecondi(resto3600);
                    return quoziente3600 + ' ore ' + ((resto3600 === 0) ? '' : templateOreMinutiSecondi(resto3600));
                } catch (e) {
                    return undefined;
                }
            }
            return templateOreMinutiSecondi(numeroSecondi);
        }
    },
    oggettoGenerico: {
        singoloOggetto: function (oggetto, funzioneTemplate) {
            var risultatoHtml = '';
            risultatoHtml += funzioneTemplate(oggetto);
            return risultatoHtml;
        },
        arrayOggetti: function (arrayOggetti, funzioneTemplate, stringaArrayVuoto) {
            var risultatoHtml = '';
            if (arrayOggetti.length === 0) {
                risultatoHtml = stringaArrayVuoto;
            } else {
                for (var i = 0; i < arrayOggetti.length; i++) {
                    risultatoHtml += funzioneTemplate(arrayOggetti[i]);
                }
            }
            return risultatoHtml;
        }
    },
    accessiOperatore: {
        elenco: {
            perElencoInDettaglioOrdineDiProduzione: function (elencoAccessiOperatore) {
                function templateAccessoOperatore(accessoOperatore) {
                    var risultatoHtml = '';
                    /*risultatoHtml += '<div class="col-lg-1"><h4>ingresso: </h4></div><div class="col-lg-3"><h4>' + accessoOperatore.timestampIngresso;
                     risultatoHtml += '</h4></div><div class="col-lg-1"><h4>uscita: </h4></div><div class="col-lg-7"><h4>' + template.stringheParticolari.segnapostoSeUndefined(accessoOperatore.timestampUscita, '---');
                     risultatoHtml += '</h4></div>';*/
                    risultatoHtml += '<tr><td><h4>' + accessoOperatore.timestampIngresso;
                    risultatoHtml += '</td><td><h4>' + template.stringheParticolari.segnapostoSeUndefined(accessoOperatore.timestampUscita, '---');
                    if (accessoOperatore.terminale === undefined) {
                        accessoOperatore.terminale = {codice: '---', indirizzoIp: '---'};
                    }
                    risultatoHtml += '</td><td><h4>' + accessoOperatore.terminale.indirizzoIp + ' (' + accessoOperatore.terminale.codice + ')</h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoAccessiOperatore, templateAccessoOperatore, '<tr><td colspan="2"><h4>nessun accesso operatore trovato</h4></td></tr>');
            },
            perElencoInSupervisioneProduzione: function (elencoAccessiOperatore) {
                function templateAccessoOperatore(accessoOperatore) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr><td><h4>' + accessoOperatore.operatore.nome + ' ' + accessoOperatore.operatore.cognome;
                    risultatoHtml += '</h4></td><td><h4>' + accessoOperatore.timestampIngresso;
                    risultatoHtml += '</h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoAccessiOperatore, templateAccessoOperatore, '<tr><td colspan="2"><h4>nessun accesso operatore trovato</h4></td></tr>');
            }
        }
    },
    matricola: {
        perElenco: function (matricola) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + matricola.codice;
            risultatoHtml += '</h4></td><td><h4>' + matricola.ordineDiProduzione.codice;
            risultatoHtml += '</h4></td><td><h4>' + matricola.ordineDiProduzione.modello.codice;
            risultatoHtml += '</h4></td><td><h4>' + matricola.ordineDiProduzione.modello.descrizione;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + matricola.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (matricola) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + matricola.codice;
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>ordine di produzione:</h4>';
            risultatoHtml += '</div><div class="col-lg-2 col-lg-offset-1"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + matricola.ordineDiProduzione.codice;
            risultatoHtml += '</h4></div><div class="col-lg-2 col-lg-offset-1"><h4>ambiente AS400: </h4></div><div class="col-lg-9"><h4>' + matricola.ordineDiProduzione.ambienteAS400;
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>modello:</h4>';
            risultatoHtml += '</div><div class="col-lg-2 col-lg-offset-1"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + matricola.ordineDiProduzione.modello.codice;
            risultatoHtml += '</h4></div><div class="col-lg-2 col-lg-offset-1"><h4>descrizione: </h4></div><div class="col-lg-9"><h4>' + matricola.ordineDiProduzione.modello.descrizione;
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoMatricole) {
                return template.oggettoGenerico.arrayOggetti(elencoMatricole, template.matricola.perElenco, '<tr><td colspan="5"><h4>nessuna matricola trovata</h4></td></tr>');
            },
            perElencoInDettaglioOrdineDiProduzione: function (elencoMatricole) {
                function templateMatricola(matricola) {
                    var risultatoHtml = '';
                    /*risultatoHtml += '<div class="col-lg-2"><h4>codice: </h4></div><div class="col-lg-2"><h4>' + matricola.codice;
                     risultatoHtml += '</h4></div><div class="col-lg-8"><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + matricola.codice + '">vai a dettaglio</a></h4></div>';*/
                    risultatoHtml += '<tr><td><h4>' + matricola.codice;
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + matricola.codice + '">vai a dettaglio</a></h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoMatricole, templateMatricola, '<tr><td colspan="2"><h4>nessuna matricola trovata</h4></td></tr>');
            }
        }
    },
    modello: {
        perElenco: function (modello) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + modello.codice;
            risultatoHtml += '</h4></td><td><h4>' + modello.descrizione;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + modello.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        perElencoSelectFormOrdineDiProduzione: function (modello) {
            var risultatoHtml = '';
            risultatoHtml += '<option value="' + modello.codice;
            risultatoHtml += '">' + modello.codice + ' - ' + modello.descrizione;
            risultatoHtml += '</option>';
            return risultatoHtml;
        },
        dettaglio: function (modello) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + modello.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>descrizione: </h4></div><div class="col-lg-9"><h4>' + modello.descrizione;
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>annotazioni di ufficio tecnico: </h4></div><div class="col-lg-12"><h4>' + template.stringheParticolari.segnapostoSeUndefined(modello.annotazioniUfficioTecnico);
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>istruzioni di lavorazione: </h4></div><div class="col-lg-12"><h4>' + template.stringheParticolari.segnapostoSeUndefined(modello.istruzioniLavorazione);
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoModelli) {
                return template.oggettoGenerico.arrayOggetti(elencoModelli, template.modello.perElenco, '<h4>nessun modello trovato</h4>');
            },
            perSelect: function (elencoModelli) {
                return template.oggettoGenerico.arrayOggetti(elencoModelli, template.modello.perElencoSelectFormOrdineDiProduzione, '<h4>nessun modello trovato</h4>');
            }
        }
    },
    operatore: {
        perElenco: function (operatore) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + operatore.codice;
            risultatoHtml += '</h4></td><td><h4>' + operatore.nome;
            risultatoHtml += '</h4></td><td><h4>' + operatore.cognome;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + operatore.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (operatore) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + operatore.codice;
            risultatoHtml += '</div><div class="col-lg-3"><h4>nome: </h4></div><div class="col-lg-9"><h4>' + operatore.nome;
            risultatoHtml += '</div><div class="col-lg-3"><h4>cognome: </h4></div><div class="col-lg-9"><h4>' + operatore.cognome;
            risultatoHtml += '</div><div class="col-lg-3"><h4>codice tessera: </h4></div><div class="col-lg-9"><h4>' + operatore.codiceTessera;
            risultatoHtml += '</div><div class="col-lg-3"><h4>codice badge: </h4></div><div class="col-lg-9"><h4>' + operatore.codiceBadge;
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoOperatori) {
                return template.oggettoGenerico.arrayOggetti(elencoOperatori, template.operatore.perElenco, '<h4>nessun operatore trovato</h4>');
            }
        }
    },
    ordineDiProduzione: {
        perElenco: function (ordineDiProduzione) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + ordineDiProduzione.codice;
            risultatoHtml += '</h4></td><td><h4>' + ordineDiProduzione.ambienteAS400;
            risultatoHtml += '</h4></td><td><h4>' + ordineDiProduzione.modello.codice;
            risultatoHtml += ' - ' + ordineDiProduzione.modello.descrizione;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + ordineDiProduzione.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (ordineDiProduzione) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + ordineDiProduzione.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>ambiente AS400: </h4></div><div class="col-lg-9"><h4>' + ordineDiProduzione.ambienteAS400;
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>modello:</h4>';
            risultatoHtml += '</div><div class="col-lg-2 col-lg-offset-1"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + ordineDiProduzione.modello.codice;
            risultatoHtml += '</h4></div><div class="col-lg-2 col-lg-offset-1"><h4>descrizione: </h4></div><div class="col-lg-9"><h4>' + ordineDiProduzione.modello.descrizione;
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoOrdiniDiProduzione) {
                return template.oggettoGenerico.arrayOggetti(elencoOrdiniDiProduzione, template.ordineDiProduzione.perElenco, '<h4>nessun ordine di produzione trovato</h4>');
            },
            perElencoInDettaglioInDettaglioModello: function (elencoOrdiniDiProduzione) {
                function templateOrdineDiProduzione(ordineDiProduzione) {
                    var risultatoHtml = '';
                    /*risultatoHtml += '<div class="col-lg-2"><h4>codice: </h4></div><div class="col-lg-2"><h4>' + ordineDiProduzione.codice;
                     risultatoHtml += '</h4></div><div class="col-lg-8"><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + ordineDiProduzione.codice + '">vai a dettaglio</a></h4></div>';*/
                    risultatoHtml += '<tr><td><h4>' + ordineDiProduzione.codice;
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + ordineDiProduzione.codice + '">vai a dettaglio</a></h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoOrdiniDiProduzione, templateOrdineDiProduzione, '<tr><td colspan="2"><h4>nessun ordine di produzione trovato</h4></td></tr>');
            }
        }
    },
    postazione: {
        perElenco: function (postazione) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + postazione.codice;
            risultatoHtml += '</h4></td><td><h4>' + postazione.nome;
            risultatoHtml += '</h4></td><td><h4>' + postazione.centroDiLavoroAS400;
            risultatoHtml += '</h4></td><td><h4>' + postazione.terminale.indirizzoIp;
            risultatoHtml += ' (' + postazione.terminale.codice;
            risultatoHtml += ')</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + postazione.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (postazione) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + postazione.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome: </h4></div><div class="col-lg-9"><h4>' + postazione.nome;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>centro di lavoro AS400: </h4></div><div class="col-lg-9"><h4>' + postazione.centroDiLavoroAS400;
            risultatoHtml += '</h4></div><div class="col-lg-12"><h4>terminale:</h4>';
            risultatoHtml += '</div><div class="col-lg-2 col-lg-offset-1"><h4>indirizzo IP: </h4></div><div class="col-lg-9"><h4>' + postazione.terminale.indirizzoIp;
            risultatoHtml += '</h4></div><div class="col-lg-2 col-lg-offset-1"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + postazione.terminale.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>tipo di inserimento codice: </h4></div><div class="col-lg-9"><h4>' + template.postazione.campoTipoInserimentoCodiceUserFriendly(postazione.tipoInserimentoCodice);
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>autorizzata alla chiusura di matricole: </h4></div><div class="col-lg-9"><h4>' + template.postazione.autorizzataChiusuraMatricole(postazione.autorizzataChiusuraMatricole);
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoPostazioni) {
                return template.oggettoGenerico.arrayOggetti(elencoPostazioni, template.postazione.perElenco, '<h4>nessuna postazione trovata</h4>');
            },
            perElencoInDettaglioTerminale: function (elencoPostazioni) {
                function templatePostazione(postazione) {
                    var risultatoHtml = '';
                    /*risultatoHtml += '<div class="col-lg-3"><h4>codice: ' + postazione.codice;
                     risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome: ' + postazione.nome;
                     risultatoHtml += '</h4></div><div class="col-lg-3"><h4>centroDiLavoroAS400: ' + postazione.centroDiLavoroAS400;
                     risultatoHtml += '</h4></div><div class="col-lg-3"><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + postazione.codice + '">vai a dettaglio</a></h4></div>';*/
                    risultatoHtml += '<tr><td><h4>' + postazione.codice;
                    risultatoHtml += '</h4></td><td><h4>nome: ' + postazione.nome;
                    risultatoHtml += '</h4></td><td><h4>centroDiLavoroAS400: ' + postazione.centroDiLavoroAS400;
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + postazione.codice + '">vai a dettaglio</a></h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoPostazioni, templatePostazione, '<tr><td colspan="4"><h4>nessuna postazione trovata</h4></td></tr>');
            }

        },
        campoTipoInserimentoCodiceUserFriendly: function (valoreCampo) {
            switch (valoreCampo) {
                case 'matricola':
                    return 'matricola';
                case 'ordine_di_produzione':
                    return 'ordine di produzione';
                default :
                    return 'tipo inserimento codice non previsto';
            }
        },
        autorizzataChiusuraMatricole: function (valoreCampo) {
            switch (valoreCampo) {
                case 'true':
                    return 'si';
                case 'false':
                    return 'no';
                default :
                    return 'non impostato';
            }
        }
    },
    tempiDiLavorazione: {
        elenco: {
            perElencoInDettaglioMatricola: function (elencoTempiDiLavorazione) {
                function templateTempoDiLavorazione(tempoDiLavorazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr><td><h4>' + tempoDiLavorazione.timestampOrarioInizio;
                    risultatoHtml += '</h4></td><td><h4>' + template.stringheParticolari.segnapostoSeUndefined(tempoDiLavorazione.timestampOrarioFine);
                    risultatoHtml += '</h4></td><td><h4>';
                    risultatoHtml += tempoDiLavorazione.operatore.nome + ' ' + tempoDiLavorazione.operatore.cognome + ' (' + tempoDiLavorazione.operatore.codice + ')';
                    risultatoHtml += '</h4></td><td><h4>' + tempoDiLavorazione.tipo;
                    risultatoHtml += '</h4></td><td><h4>' + tempoDiLavorazione.lavorazioneSuMatricola.codice;
                    risultatoHtml += '</h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoTempiDiLavorazione, templateTempoDiLavorazione, '<tr><td colspan="5"><h4>nessun tempo di lavorazione trovato</h4></td></tr>');
            },
            perElencoInDettaglioOrdineDiProduzione: function (elencoTempiDiLavorazione) {
                function templateTempoDiLavorazione(tempoDiLavorazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr><td><h4>' + tempoDiLavorazione.matricola.codice;
                    risultatoHtml += '</h4></td><td><h4>' + tempoDiLavorazione.codice;
                    risultatoHtml += '</h4></td><td><h4>' + tempoDiLavorazione.timestampOrarioInizio;
                    risultatoHtml += '</h4></td><td><h4>' + template.stringheParticolari.segnapostoSeUndefined(tempoDiLavorazione.timestampOrarioFine);
                    risultatoHtml += '</h4></td><td><h4>';
                    risultatoHtml += tempoDiLavorazione.operatore.nome + ' ' + tempoDiLavorazione.operatore.cognome + ' (' + tempoDiLavorazione.operatore.codice + ')';
                    risultatoHtml += '</h4></td></tr>';
                    return risultatoHtml;
                }
                var arrayOggetti = elencoTempiDiLavorazione;
                var risultatoHtml = '';
                if (arrayOggetti.length === 0) {
                    risultatoHtml = '<tr><td colspan="5"><h4>nessun tempo di lavorazione trovato</h4></td></tr>';
                } else {
                    var codiceMatricolaGruppoAttuale = arrayOggetti[0].matricola.codice;
                    for (var i = 0; i < arrayOggetti.length; i++) {
                        if (arrayOggetti[i].matricola.codice !== codiceMatricolaGruppoAttuale) {
                            risultatoHtml += '<tr><th colspan="5" class="riga-tabella-separatore"></th></tr>';
                            codiceMatricolaGruppoAttuale = arrayOggetti[i].matricola.codice;
                        }
                        risultatoHtml += templateTempoDiLavorazione(arrayOggetti[i]);

                    }
                }
                return risultatoHtml;
            }
        }
    },
    terminale: {
        perElenco: function (terminale) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + terminale.codice;
            risultatoHtml += '</h4></td><td><h4>' + terminale.indirizzoIp;
            risultatoHtml += '</h4></td><td><h4>' + template.stringheParticolari.segnapostoSeUndefined(terminale.nomeComputer);
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + terminale.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        perElencoSelectFormPostazione: function (terminale) {
            var risultatoHtml = '';
            risultatoHtml += '<option value="' + terminale.codice;
            risultatoHtml += '">' + terminale.codice + ' - ' + terminale.indirizzoIp;
            risultatoHtml += '</option>';
            return risultatoHtml;
        },
        dettaglio: function (terminale) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + terminale.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>indirizzo IP: </h4></div><div class="col-lg-9"><h4>' + terminale.indirizzoIp;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome computer: </h4></div><div class="col-lg-9"><h4>' + template.stringheParticolari.segnapostoSeUndefined(terminale.nomeComputer);
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>note: </h4></div><div class="col-lg-9"><h4>' + template.stringheParticolari.segnapostoSeUndefined(terminale.note);
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoTerminali) {
                return template.oggettoGenerico.arrayOggetti(elencoTerminali, template.terminale.perElenco, '<tr><td colspan="4"><h4>nessun terminale trovato</h4></td></tr>');
            },
            perSelect: function (elencoTerminali) {
                return template.oggettoGenerico.arrayOggetti(elencoTerminali, template.terminale.perElencoSelectFormPostazione, '<option>---</option>');
            },
            perElencoInDettaglioTerminale: function (elencoPostazioni) {
                function templatePostazione(postazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<div class="col-lg-3"><h4>codice: ' + postazione.codice;
                    risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome: ' + postazione.nome;
                    risultatoHtml += '</h4></div><div class="col-lg-3"><h4>centroDiLavoroAS400: ' + postazione.centroDiLavoroAS400;
                    risultatoHtml += '</h4></div><div class="col-lg-3"><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + postazione.codice + '">vai a dettaglio</a></h4></div>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoPostazioni, templatePostazione, '<h4>nessuna postazione trovata</h4>');
            }
        }
    },
    lavorazione: {
        perElenco: function (lavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + lavorazione.codice;
            risultatoHtml += '</h4></td><td><h4>' + lavorazione.nome;
            risultatoHtml += '</h4></td><td><h4>' + lavorazione.tempoMedioInSecondi;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + lavorazione.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (lavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + lavorazione.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome: </h4></div><div class="col-lg-9"><h4>' + lavorazione.nome;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>tempo medio in secondi: </h4></div><div class="col-lg-9"><h4>' + lavorazione.tempoMedioInSecondi;
            var funzioneDiLavorazione = (lavorazione.funzioneDiLavorazione === undefined) ? {} : lavorazione.funzioneDiLavorazione;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>codice funzione di lavorazione: </h4></div><div class="col-lg-9"><h4>' + template.stringheParticolari.segnapostoSeUndefined(funzioneDiLavorazione.codice);
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        perElencoSelect: function (lavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<option value="' + lavorazione.codice;
            risultatoHtml += '">' + lavorazione.codice + ' - ' + lavorazione.nome;
            risultatoHtml += '</option>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoLavorazioni) {
                return template.oggettoGenerico.arrayOggetti(elencoLavorazioni, template.lavorazione.perElenco, '<h4>nessuna lavorazione trovata</h4>');
            },
            perElencoInDettaglioModello: function (elencoLavorazioni) {
                function templateLavorazione(lavorazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr><td><h4>' + lavorazione.codice;
                    risultatoHtml += '</h4></td><td><h4>' + lavorazione.nome;
                    risultatoHtml += '</h4></td><td><h4>' + template.orari.oreMinutiSecondi(lavorazione.tempoMedioInSecondi);
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + lavorazione.codice + '">vai a dettaglio</a></h4></td>';
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-cancella-associazione-modello-lavorazione" data-codice="' + lavorazione.codiceAssociazione + '">elimina</a></h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoLavorazioni, templateLavorazione, '<tr><td colspan="5"><h4>nessuna lavorazione trovata</h4></td></tr>');
            },
            perElencoInDettaglioMatricola: function (elencoLavorazioni) {
                function templateLavorazione(lavorazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr';
                    if (lavorazione.tempoPrevistoRispettato !== undefined) {
                        risultatoHtml += ' class="tempo-rispettato-' + lavorazione.tempoPrevistoRispettato + '"';
                    }
                    risultatoHtml += '><td><h4>' + lavorazione.codice;
                    risultatoHtml += '</h4></td><td><h4>' + lavorazione.codiceAssociazione;
                    risultatoHtml += '</h4></td><td><h4>' + lavorazione.nome;
                    risultatoHtml += '</h4></td><td><h4>' + template.orari.oreMinutiSecondi(lavorazione.tempoMedioInSecondi);
                    risultatoHtml += '</h4></td><td><h4>' + template.statoAvanzamentoLavorazione.stringa(lavorazione.statoDiAvanzamento);
                    risultatoHtml += '</h4></td><td><h4>' + template.stringheParticolari.segnapostoSeUndefined(template.orari.oreMinutiSecondi(lavorazione.tempoTrascorsoInSecondi));
                    risultatoHtml += '</h4></td><td><h4>' + template.stringheParticolari.segnapostoDaBoolean(lavorazione.tempoPrevistoRispettato, 'SI', 'NO');
                    risultatoHtml += '</h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoLavorazioni, templateLavorazione, '<tr><td colspan="5"><h4>nessuna lavorazione trovata</h4></td></tr>');
            },
            perSelect: function (elencoLavorazioni) {
                return template.oggettoGenerico.arrayOggetti(elencoLavorazioni, template.lavorazione.perElencoSelect, '<option>---</option>');
            }
        }
    },
    funzioneDiLavorazione: {
        perElenco: function (funzioneDiLavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<tr><td><h4>' + funzioneDiLavorazione.codice;
            risultatoHtml += '</h4></td><td><h4>' + funzioneDiLavorazione.nome;
            risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + funzioneDiLavorazione.codice + '">vai a dettaglio</a></h4></td></tr>';
            return risultatoHtml;
        },
        dettaglio: function (funzioneDiLavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<div class="col-lg-3"><h4>codice: </h4></div><div class="col-lg-9"><h4>' + funzioneDiLavorazione.codice;
            risultatoHtml += '</h4></div><div class="col-lg-3"><h4>nome: </h4></div><div class="col-lg-9"><h4>' + funzioneDiLavorazione.nome;
            risultatoHtml += '</h4></div>';
            return risultatoHtml;
        },
        perElencoSelect: function (funzioneDiLavorazione) {
            var risultatoHtml = '';
            risultatoHtml += '<option value="' + funzioneDiLavorazione.codice;
            risultatoHtml += '">' + funzioneDiLavorazione.codice + ' - ' + funzioneDiLavorazione.nome;
            risultatoHtml += '</option>';
            return risultatoHtml;
        },
        elenco: {
            perElenco: function (elencoFunzioniDiLavorazione) {
                return template.oggettoGenerico.arrayOggetti(elencoFunzioniDiLavorazione, template.funzioneDiLavorazione.perElenco, '<h4>nessuna funzione di lavorazione trovata</h4>');
            },
            perElencoInDettaglioPostazione: function (elencoFunzioniDiLavorazione) {
                function templateFunzioneDiLavorazione(funzioneDiLavorazione) {
                    var risultatoHtml = '';
                    risultatoHtml += '<tr><td><h4>' + funzioneDiLavorazione.codice;
                    risultatoHtml += '</h4></td><td><h4>' + funzioneDiLavorazione.nome;
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-vai-a-dettaglio" data-codice="' + funzioneDiLavorazione.codice + '">vai a dettaglio</a></h4></td>';
                    risultatoHtml += '</h4></td><td><h4><a href="#" class="link-cancella-associazione-postazione-funzione-di-lavorazione" data-codice="' + funzioneDiLavorazione.codiceAssociazione + '">elimina</a></h4></td></tr>';
                    return risultatoHtml;
                }
                return template.oggettoGenerico.arrayOggetti(elencoFunzioniDiLavorazione, templateFunzioneDiLavorazione, '<h4>nessuna funzione di lavorazione abilitata su questa postazione</h4>');
            },
            perSelect: function (elencoFunzioniDiLavorazione) {
                return template.oggettoGenerico.arrayOggetti(elencoFunzioniDiLavorazione, template.funzioneDiLavorazione.perElencoSelect, '<option>---</option>');
            }
        }
    },
    statoAvanzamentoLavorazione: {
        stringa: function (statoAvanzamento) {
            switch (statoAvanzamento) {
                case 'non_iniziata':
                    return 'non iniziata';
                case 'in_corso':
                    return 'in corso';
                case 'sospesa':
                    return 'sospesa';
                case 'terminata':
                    return 'terminata';
                default :
                    return statoAvanzamento;
            }
        }
    }
};