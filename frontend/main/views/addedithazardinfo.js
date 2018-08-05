window.AddedithazardinfoView = Backbone.View.extend({

    initialize: function(options) {
        this.render();
    },
    render: function() {
        var statsData = new Stats();
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "change": "change",
        "change #optionPlanType" : "optionPlanTypeSelected",
        "click #btnClosehazardinfoView": "closehazardinfoView",
        "click #btnAddUpdatehazardinfo": "savehazardinfo"
    },
    change: function(event) {
        utils.hideAlert();
        var target = event.target;
        if(target.id=="btnUploadClubIcon"){
            var parts = target.files[0].name.split('.');
            var ext= parts[parts.length - 1];
            this.pictureFile = target.files[0];
            var reader = new FileReader();
            var self = this;
            reader.onloadend = function () {
                $('#LogoImage').attr('src', reader.result);
                var imageDAta = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
                var change = self.model.get("data");
                change.involvedParty["LogoImage"] = imageDAta;
                self.model.set("data", change);
            };
            reader.readAsDataURL(this.pictureFile);
            return;
        }
        var change = this.model.get("data");
        change.involvedParty[target.name] = target.value;
        this.model.set("data", change);
    },
    closehazardinfoView: function() {
        $('.addEdithazardinfoView').hide(1000);
    },
    savehazardinfo: function() {
        utils.hideAlert();
        var self = this;
        this.model.save(null,{
            url:'apis/addupdateinvolvedparty',
            dataType:"json",
            success: function (responseData) {
                if (responseData.toJSON().success == true) {
                    utils.showAlert("Successfully ","Created New club ","alert-success"); 
                    setTimeout(function () { 
                          utils.hideAlert();
                          $('.addEdithazardinfoView').hide(1000);
                          window.location.reload();
                    }, 1000);
                } else {
                    utils.displayCustomErrors(responseData.toJSON().message);
                } 
            },
            error: function (responseData) {
                utils.showAlert('Warning!', 'Error processing your request', 'alert-warning');
            }
        });
        
    },
    optionPlanTypeSelected: function(event) {
        var target = event.target;
        console.log(target.value);
    }
});