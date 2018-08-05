window.InvolvedpartiesView = Backbone.View.extend({

    initialize: function(options) {
        this.render();
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip(); 
             $('[data-toggle="popover"]').popover();
            var table = $('#triggersDataTable').DataTable({
                "processing": true,
                "pageLength": 7,
                "columnDefs": [
                    {
                        "targets": [0],
                        "data": "_id.$oid",
                        "defaultContent": "",
                        "visible": false,
                        "searchable": false
                    },{
                        "targets": [1],
                        "data": "TriggerTypeName",
                                render: function(data, type, row) {
                                    return'<button class=\"btn btn-outline-info btn-sm\" id=\"showTriggerDetails\"><img width=\"20\" heighr=\"20\" src=\"img/map.png\" style=\"display: block;\"></i></button>&nbsp;Location';
                                },
                        "defaultContent": "",
                        "width": '25%', 
                    },{
                        "targets": [2],
                        "data": "Description",
                        "defaultContent": "",
                        "width": '30%', 
                    },{
                        "targets": [3],
                        "data": "TriggerDeviceId",
                        "defaultContent": "",
                        "width": '25%', 
                    },{
                        "targets": [4],
                        "data": "",
                        "defaultContent": '<img width=\"13\" heighr=\"13\" src=\"img/status-red.png\" style=\"display: block;\"> ',
                        "width": '3%', 
                        "searchable": false
                    },{
                        "targets": [5],
                        "data": "",
                        "defaultContent": '<button class=\"btn btn-outline-primary btn-sm\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" id=\"editTrigger\"><i class=\"fa fa-pencil-square\"></i></button>',
                        "width": '3%',
                        "searchable": false
                    }],
                    "ajax": {
                            "url": "apis/triggerslist",
                            "type": "POST",
                            "data": function(d) {
                                 d["partyid"] = options.page;
                             },
                            "dataSrc": function(json) {
                                return json.data;
                            }
                        }

            });
            $('#triggersDataTable tbody').on( 'click', 'tr', function () {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            });

        });
    },
    render: function() {
        $(this.el).html(this.template($.extend(this.model.toJSON())));
        return this;
    },
    events: {
        "click #btnAddClub": "addNewhazardinfo",
        "click #btnInvolvedParySideBar": "edithazardinfo",
        "click #btnAddTriggers": "addNewTrigges",
        "click #btnCloseTriggerView": "closeTriggerView",
        "click #btnAddUpdateTriggers": "saveTrigger",
        "click #triggersDataTable tbody": "tableSelected",

        "click #editTrigger": "editTrigger",
        "click #deleteTrigger": "deleteTrigger",
        "click #showTriggerDetails": "ShowTriggerDetails",
        
    },
    addNewhazardinfo: function() {
        var profileList = new getprofilelist();
        profileList.fetch({type: 'GET',success: function(){
            var statsData = new Stats();
            statsData.set('Operationtype','ADD');
            $(".addEdithazardinfoView",this.el).html(new AddedithazardinfoView({model: statsData, profileList: profileList.toJSON(), Operationtype: 'ADD'}).el);
        }});
        $('.addEdithazardinfoView').show(1000);
    },
    edithazardinfo: function() {

        var profileList = new getprofilelist();
         var self = this;
        profileList.fetch({type: 'GET',success: function(){
            if(self.model.toJSON().data.involvedParty._id.$oid.length > 0 ){
                self.model.set('Operationtype','EDIT');
                $(".addEdithazardinfoView",self.el).html(new AddedithazardinfoView({model:  self.model, profileList: profileList.toJSON(), Operationtype: 'EDIT'}).el);
            }
        }});
        $('.addEdithazardinfoView').show(1000);
    },
    addNewTrigges: function() {
        $('.addEditTriggersView').show(1000);
    },
    closeTriggerView: function() {
        $('.addEditTriggersView').hide(1000);
    },
    saveTrigger: function() {
        //save data and close if success
        $('.addEditTriggersView').hide(1000);
        this.reloadDate();
    },
    tableSelected: function (event) {
        var table = $('#triggersDataTable').DataTable()
        var data = table.rows('.selected').data();
        if(data.length > 0){
            console.log("ID: " + data[0][0] + " Name: " + data[0][1] + " Type: " + data[0][2]);    
        }
        
    },
    editTrigger: function() {
        var table = $('#triggersDataTable').DataTable()
        var data = table.rows('.selected').data();
        console.log("ID: " + data[0][0] + " Name: " + data[0][1] + " Type: " + data[0][2]);
    },
    deleteTrigger: function() {
        var table = $('#triggersDataTable').DataTable()
        var data = table.rows('.selected').data();
        console.log("ID: " + data[0][0] + " Name: " + data[0][1] + " Type: " + data[0][2]);
        table.row('.selected').remove().draw( false );
    },
    reloadDate: function() {
        $('#triggersDataTable').DataTable().ajax.reload();
    },
    ShowTriggerDetails: function(event) {
        var table = $('#triggersDataTable').DataTable()
        var data = table.rows('.selected').data();
        if(data.length >0 && data[0].TriggerDeviceId){
            $('#QRCodeView').modal('show');
            $("#detailDisplay").html("");
            document.getElementById("triggertitle").innerHTML =  "<i class=\"fa fa-map-marker\"></i>&nbsp;" + this.model.toJSON().data.involvedParty.Name +" " + " location";
                    $("#detailDisplay").html("<div class=\"row\">\
                    <div class=\"col-12 mx-auto\">\
                        <div class=\"text-center\">\
                            <div id=\"detailDisplay\" title=\"Jainbishal Eos Development\"><canvas width=\"640\" height=\"640\" style=\"display: none;\"></canvas><img width=\"640\" src=\"img/map.png\" style=\"display: block;\"></div>\
                        </div>\
                    </div>\
                </div>\
                    ");
            return;
           
        }
    }
});