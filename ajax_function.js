var propertiesObjectStub = {
    mainSelector: 'selettorePrincipale',
    delegatedSelector: 'selettoreDelegato',
    selector: 'nomeDelSelettore',
    event: 'submit',
    method: 'post',
    url: 'urlDellaPost',
    jsonData: 'datiDaSpedire',
    objectConstructionFunction: 'funzione con cui viene costruito l\'oggetto da serializzare in json',
    noCommunicationCallbackFunction: 'funzione da eseguire se non è possibile stabilire la comunicazione con il server',
    errorCallbackFunction: 'funzione da eseguire in caso di risposta di errore dal server',
    successCallbackFunction: 'funzione da eseguire in caso di risposta di successo dal server',
    alwaysCallbackFunction: 'funzione da eseguire in ogni caso al termine dell\'interazione ajax'
};
var ajaxFunctions = {
    send: function (propertiesObject) {
        //smonto l'evento se già presente, evita le comunicazioni ajax multiple
        $(propertiesObject.mainSelector).off(propertiesObject.event, propertiesObject.delegatedSelector); 
        //costruisco l'evento
        $(propertiesObject.mainSelector).on(propertiesObject.event, propertiesObject.delegatedSelector, function (event) {
            event.preventDefault();
            $.ajax({
                type: propertiesObject.method,
                url: propertiesObject.url,
                data: {
                    jsonSerializedObject: JSON.stringify(propertiesObject.objectConstructionFunction(propertiesObject.selector)),
                    jsonSerializedObject2: (typeof propertiesObject.objectConstructionFunction2 === "function")?JSON.stringify(propertiesObject.objectConstructionFunction2(propertiesObject.selector)):'funzione2nondefinita'
                },
                dataType: 'json'
            }).done(function (data) {
                console.log('done data.code: ' + data.code);
                if (typeof propertiesObject.successCallbackFunction === "function") {
                    propertiesObject.successCallbackFunction(data);
                } else {
                    var successFunctionsMap = new Map(propertiesObject.successCallbackFunctionsArray); //creo la mappa da array 
                    successFunctionsMap.get(data.code)(data.parameters); //eseguo la funzione da get sulla mappa            
                }
            }).fail(function (jqXHR, textStatus, error) {
                console.log('fail');
                console.log('jqXHR: ['+jqXHR+']');
                console.log('textStatus: ['+textStatus+']');
                console.log('error: ['+error+']');
                //if (error === '') {
                //    console.log('error vuoto, server offline');
                //    alert('il server non risponde');
                //} else {
                try {
                    if (typeof propertiesObject.errorCallbackFunction === "function") {
                        propertiesObject.errorCallbackFunction(JSON.parse(jqXHR.responseText));
                    } else {
                        var errorFunctionsMap = new Map(propertiesObject.errorCallbackFunctionsArray); //creo la mappa da array 
                        errorFunctionsMap.get(JSON.parse(jqXHR.responseText).code)(JSON.parse(jqXHR.responseText).parameters); //eseguo la funzione da get sulla mappa            
                    }
                }catch (error){
                    console.log('**** errore non gestito in fail ajax');
                }                    
                //}
            }).always(function () {
                if (typeof propertiesObject.alwaysCallbackFunction === "function") {
                    propertiesObject.alwaysCallbackFunction();
                }
            });
        });
    },
    sendFormSubmit: function (propertiesObject) {
        propertiesObject.event = 'submit';
        propertiesObject.objectConstructionFunction = function () {
            return $(propertiesObject.selector).serializeJSON();
        };
        propertiesObject.jsonData = JSON.stringify();
        ajaxFunctions.send(propertiesObject);
    },
    getFormSubmit: function (propertiesObject) {
        propertiesObject.method = 'get';
        ajaxFunctions.sendFormSubmit(propertiesObject);
    },
    postFormSubmit: function (propertiesObject) {
        propertiesObject.method = 'post';
        ajaxFunctions.sendFormSubmit(propertiesObject);
    },
    sendLinkClick: function (propertiesObject) {
        propertiesObject.event = 'click';
        propertiesObject.jsonData = JSON.stringify(propertiesObject.objectConstructionFunction(propertiesObject.selector));
        console.log('###### propertiesObject.jsonData: ' + propertiesObject.jsonData);
        ajaxFunctions.send(propertiesObject);
    },
    getLinkClick: function (propertiesObject) {
        propertiesObject.method = 'get';
        ajaxFunctions.sendLinkClick(propertiesObject);
    },
    postLinkClick: function (propertiesObject) {
        propertiesObject.method = 'post';
        ajaxFunctions.sendLinkClick(propertiesObject);
    }
};