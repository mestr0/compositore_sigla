var interattivita = {
    popup: {
        avviso: function (oggettoProprieta) {
            var selettoreModal = 'div#modal-avviso';
            var selettorePulsante = 'button#pulsante-modal-avviso';
            if (oggettoProprieta.titolo === undefined) {
                oggettoProprieta.titolo = 'Titolo non specificato';
            }
            if (oggettoProprieta.testo === undefined) {
                oggettoProprieta.testo = 'Testo non specificato';
            }
            $(selettoreModal).find('.modal-title').html(oggettoProprieta.titolo);
            $(selettoreModal).find('.modal-body').html(oggettoProprieta.testo);
            $(selettorePulsante).trigger('click');
            $(selettoreModal).find('.modal-footer').find('button').focus();
            //setTimeout(function(){ $('button#pulsante-chiudi-modal-avviso').trigger('click'); }, 1500);
        },
        messaggioAvviso: function (messaggio) {
            console.log('interattivita.popup.messaggioAvviso called');
//            alert(messaggio);
//            return;
            interattivita.popup.avviso({titolo: 'Avviso', testo: messaggio});
        },
        errore: function (oggettoProprieta) {
            var selettoreModal = 'div#modal-errore';
            var selettorePulsante = 'button#pulsante-modal-errore';
            if (oggettoProprieta.titolo === undefined) {
                oggettoProprieta.titolo = 'Titolo non specificato';
            }
            if (oggettoProprieta.testo === undefined) {
                oggettoProprieta.testo = 'Testo non specificato';
            }
            $(selettoreModal).find('.modal-title').html(oggettoProprieta.titolo);
            $(selettoreModal).find('.modal-body').html(oggettoProprieta.testo);
            $(selettorePulsante).trigger('click');
        },
        messaggioErrore: function (messaggio) {
            console.log('interattivita.popup.messaggioErrore called');
//            alert(messaggio);
//            return;
            interattivita.popup.errore({titolo: 'Errore :(', testo: messaggio});
        },
        conferma: function (oggettoProprieta, funzione) {
            var selettoreModal = 'div#modal-conferma';
            var selettorePulsanteMostraModal = 'button#pulsante-modal-conferma';
            var selettorePulsanteDiConferma = 'button#pulsante-funzione-conferma';
            if (oggettoProprieta.titolo === undefined) {
                oggettoProprieta.titolo = 'Titolo non specificato';
            }
            if (oggettoProprieta.testo === undefined) {
                oggettoProprieta.testo = 'Testo non specificato';
            }
            $(selettoreModal).find('.modal-title').html(oggettoProprieta.titolo);
            $(selettoreModal).find('.modal-body').html(oggettoProprieta.testo);
            $(selettorePulsanteDiConferma).off('click'); //tolgo eventuali funzioni di conferma già assegnate al modal di conferma
            $(selettorePulsanteDiConferma).on("click", function () {
                funzione();
                $(selettoreModal).modal('toggle');
            });
            $(selettorePulsanteMostraModal).trigger('click');
        },
        messaggioConferma: function (messaggio, funzione) {
            console.log('interattivita.popup.messaggioConferma called');
//            alert(messaggio);
//            return;
            interattivita.popup.conferma({titolo: 'Conferma !?', testo: messaggio}, funzione);
        },
        contenutoAjax: function (oggettoProprieta) {
            var selettoreModal = 'div#modal-contenuto-ajax';
            var selettorePulsanteMostraModal = 'button#pulsante-modal-contenuto-ajax';
            if (oggettoProprieta.titolo === undefined) {
                oggettoProprieta.titolo = 'Titolo contenutoAjax non specificato';
            }
            $(selettoreModal).find('.modal-title').html(oggettoProprieta.titolo);
            $(selettoreModal).find('.modal-body').load(oggettoProprieta.url, function () {
                console.log("Load was performed from url "+oggettoProprieta.url);
            });
            $(selettorePulsanteMostraModal).trigger('click');
            //per chiudere il popup $('div#modal-contenuto-ajax').toggle();
        },
        chiudiPopupContenutoAjax: function(){
            $('div#modal-contenuto-ajax button.close').trigger('click');            
        }
    }
};