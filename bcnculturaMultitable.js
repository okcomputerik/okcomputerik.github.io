(function() {
	// Create the connector object
	var myConnector = tableau.makeConnector();

	// Define the schema
	myConnector.getSchema = function(schemaCallback) {

		// Schema for large concerts halls
		var grans_auditoris_cols = [{
			id: "Equipament",
			alias: "Venue",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "Any",
			alias: "Date",
			dataType: tableau.dataTypeEnum.date
		}, {
			id: "Concerts",
			alias: "Concerts",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Aforament",
			alias: "Seats",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Entrades_Venudes",
			alias: "Tickets sold",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Espectadors",
			alias: "Attendance",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Codi_Districte",
			alias: "District code",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},  {
			id: "Nom_Districte",
			alias: "District name",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Codi_Barri",
			alias: "Neighborhood code",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Nom_Barri",
			alias: "Neighborhood name",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Titularitat",
			alias: "Ownership",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "TipusGeneral",
			alias: "Type",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "TipusEquipament",
			alias: "Venue type",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Ambit",
			alias: "Scope",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Latitud",
			alias: "Latitude",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.float
		},   {
			id: "Longitud",
			alias: "Longitude",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.float
		}];
	
		var gransAuditorisTable = {
			id: "Grans_auditoris",
			alias: "Data for Concert Halls",
			columns: grans_auditoris_cols
		};

		// Schema for small music venues data
		var sales_en_viu_cols = [{
			id: "Equipament",
			alias: "Venue",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "Any",
			alias: "Date",
			dataType: tableau.dataTypeEnum.date
		}, {
			id: "Concerts",
			alias: "Concerts",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Aforament",
			alias: "Seats",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Entrades_Venudes",
			alias: "Tickets sold",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Espectadors",
			alias: "Attendance",
			columnRole: "measure",
			dataType: tableau.dataTypeEnum.float
		},  {
			id: "Codi_Districte",
			alias: "District code",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},  {
			id: "Nom_Districte",
			alias: "District name",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Codi_Barri",
			alias: "Neighborhood code",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Nom_Barri",
			alias: "Neighborhood name",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Titularitat",
			alias: "Ownership",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "TipusGeneral",
			alias: "Type",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "TipusEquipament",
			alias: "Venue type",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Ambit",
			alias: "Scope",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.string
		},   {
			id: "Latitud",
			alias: "Latitude",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.float
		},   {
			id: "Longitud",
			alias: "Longitude",
			columnRole: "dimension",
			dataType: tableau.dataTypeEnum.float
		}];

		var salesEnViuTable = {
			id: "Sales_en_viu",
			alias: "Data for Music Venues",
			columns: sales_en_viu_cols
		};

		schemaCallback([gransAuditorisTable, salesEnViuTable]);
	};

	// Download the data
	myConnector.getData = function(table, doneCallback) {

 	       // Get data for large concert halls 
        	if (table.tableInfo.id == 'Grans_auditoris') {
			$.getJSON("http://dades.eicub.net/api/1/dades_grans_auditoris", function(resp) {
			        var feat = resp,
				tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Equipament": feat[i].Equipament,
						"Any": feat[i].Any,
						"Concerts": feat[i].Concerts,
						"Espectadors": feat[i].Espectadors,
						"Aforament": feat[i].Aforament,
						"Entrades_Venudes": feat[i].Entrades_Venudes,
						"Espectadors": feat[i].Espectadors,
						"Codi_Districte": feat[i].Codi_Districte,
						"Nom_Districte": feat[i].Nom_Districte,
						"Codi_Barri": feat[i].Codi_Barri,
						"Nom_Barri": feat[i].Nom_Barri,
						"Titularitat": feat[i].Titularitat,
						"TipusGeneral": feat[i].TipusGeneral,
						"TipusEquipament": feat[i].TipusEquipament,
						"Ambit": feat[i].Ambit,
						"Latitud": feat[i].Latitud,
						"Longitud": feat[i].Longitud,
					});
				}
				table.appendRows(tableData);
		                doneCallback();
			});
		}

		// Get data for mid and small music venues 
		if (table.tableInfo.id == "Sales_en_viu") {
			$.getJSON("http://dades.eicub.net/api/1/dades_musica_en_viu", function(resp) {
			        var feat = resp,
				tableData = [];
	
				// Iterate over the JSON object
				for (i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Equipament": feat[i].Equipament,
						"Any": feat[i].Any,
						"Concerts": feat[i].Concerts,
						"Espectadors": feat[i].Espectadors,
						"Aforament": feat[i].Aforament,
						"Entrades_Venudes": feat[i].Entrades_Venudes,
						"Espectadors": feat[i].Espectadors,
						"Codi_Districte": feat[i].Codi_Districte,
						"Nom_Districte": feat[i].Nom_Districte,
						"Codi_Barri": feat[i].Codi_Barri,
						"Nom_Barri": feat[i].Nom_Barri,
						"Titularitat": feat[i].Titularitat,
						"TipusGeneral": feat[i].TipusGeneral,
						"TipusEquipament": feat[i].TipusEquipament,
						"Ambit": feat[i].Ambit,
						"Latitud": feat[i].Latitud,
						"Longitud": feat[i].Longitud,
					});
				}
				table.appendRows(tableData);
				doneCallback();
			});
		}
	};

	// Check to see if the tableauVersionBootstrap is defined as a global object. If so, we are running in the Tableau desktop/server context. If not, we're running in the simulator
	tableau.registerConnector(myConnector);
	if (!!window.tableauVersionBootstrap) {
		window._tableau.triggerInitialization();
	}

	// Check to see if the tableauVersionBootstrap is defined as a global object. If not, we're running in the simulator code to load the script asynchronously
	if (!window.tableauVersionBootstrap) {
		var DOMContentLoaded_event = window.document.createEvent("Event")
		DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
		window.document.dispatchEvent(DOMContentLoaded_event)
	}

	// Create event listeners for when the user submits the form
	$(document).ready(function() {
		$('#submitButton').click(function() {
			tableau.connectionName = 'Barcelona Cultura - Música Feed'; // This will be the data source name in Tableau
			$.getJSON("http://dades.eicub.net/api/1/dades_grans_auditoris", function(resp) {
				tableau.connectionData = resp.length.toString();
				tableau.submit(); // This sends the connector object to Tableau
            		});
			$.getJSON("http://dades.eicub.net/api/1/dades_musica_en_viu", function(resp) {
				tableau.connectionData = resp.length.toString();
				tableau.submit(); // This sends the connector object to Tableau
            		});
        	});
    	});
})();
