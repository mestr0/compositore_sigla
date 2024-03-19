var utils = {
    querystring: {
        getParametro: function (nomeParametro) {
            var splittedQueryString = location.search.split(nomeParametro + '=')[1];
            if (splittedQueryString === undefined)
                return undefined; //condizione di ritorno quando non trova il parametro nella querystring
            var n = splittedQueryString.indexOf('&');
            return (n === -1) ? splittedQueryString : splittedQueryString.substring(0, n);            
        }
    }
};