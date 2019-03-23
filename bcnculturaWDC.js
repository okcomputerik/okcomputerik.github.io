(function () {

    // Create the connector object
    $(document).ready(function () {
    
        var myConnector = tableau.makeConnector();

// Define the schema
    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "Any",
        dataType: tableau.dataTypeEnum.date
    }, {
        id: "Categoria",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Indicador",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Valor",
        dataType: tableau.dataTypeEnum.string
    },];

    var tableSchema = {
        id: "dadesdeciutatfeed",
        alias: "Dades de ciutat - Observatori de Dades Culturals de Barcelona",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

// Download the data
myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://dades.eicub.net/api/1/dadesciutat-dadesglobals", function(resp) {
        var feat = resp,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "Any": feat[i].Any,
                "Categoria": feat[i].Categoria,
                "Indicador": feat[i].Indicador,
                "Valor": feat[i].Valor,
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);

// Create event listeners for when the user submits the form
        $("#submitButton").click(function () {
            tableau.connectionName = "BCN Cultura Feed";	// This will be the data source name in Tableau
            tableau.submit();	// This sends the connector object to Tableau
        });
    });
})();

