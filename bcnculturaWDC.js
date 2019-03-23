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
        id: "Ambit",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Titularitat",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Latitud",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "Longitud",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "TipusEquipament",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Equipament",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Districte",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "Concerts",
        dataType: tableau.dataTypeEnum.string
    },];

    var tableSchema = {
        id: "salesmusicaenviufeed",
        alias: "Concerts a sales de música en viu",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

// Download the data
myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://dades.eicub.net/api/1/dades_musica_en_viu", function(resp) {
        var feat = resp,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "Any": feat[i].any,
                "Ambit": feat[i].ambit,
                "Titularitat": feat[i].titularitat,
                "Latitud": feat[i].latitud,
                "Longitud": feat[i].longitud,
                "TipusEquipament": feat[i].tipusequipament,
                "Equipament": feat[i].equipament,
                "Districte": feat[i].districte,
                "Concerts": feat[i].concerts
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

