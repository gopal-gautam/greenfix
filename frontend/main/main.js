if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
};
$.ajaxSetup({
    statusCode: {
        403: function() {
            window.location.replace('#!logout');
        }
    }
});
Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "chkredirect",
        "!register/:pagename": "register",
        "!logout": "logout",
        "!involvedparty/:involvedparty": "involvedParty",
        "!involvedparty/": "involvedParty",
        "!involvedparty": "involvedParty",
        "*path": "notFound"
    },
    initialize: function() {
        eos.getBlock(1, (error, result) => {
            console.log(error);
            console.log(result.timestamp);
        });
        this.headerView = new HeaderView();
        $('.maincontent').html(this.headerView.el);
    },
    notFound: function(path) {
        $("#content").html("<h1 style='color: #700915;''>Page Not Found 404!<h1>")
    },
    logout: function() {
        Account.logout();
    },
    chkredirect: function() {
        if(this.checkUserLoggedIn()== true){
            window.location.replace('./#!involvedparty/5b0108d4c2c35e04a8a1857b');
        }
    },
    register: function(pagename) {
        if (Account.isLoggedIn()) {
            this.chkredirect();
        } else {
            $("#content").html(new RegisterView({
                model: new loginModel(),
                page: pagename
            }).el);
        }
    },
    involvedParty: function(involvedparty) {
        if (this.checkUserLoggedIn()== true) {
            involvedparty = (involvedparty)?involvedparty:"";
            var statsData = new Stats();
            var pdata = new FormData();
            pdata.append('partyid', involvedparty);
            statsData.fetch({dataType:"json", data: pdata, processData: false, cache: false,
            contentType: false, type: 'POST',success: function(){
                $("#content").html(new InvolvedpartiesView({
                    model: statsData,
                    page: involvedparty
                }).el);
                if(involvedparty.length == 0){
                    Backbone.trigger('showChangeClubList');
                }
            }});
        }
    },
    checkUserLoggedIn: function() {
        if (Account.isLoggedIn()) {
            return true;
        } else {
            app.navigate('!register/:login', true);
            return false;
        }
    }
});
utils.loadTemplate(['RegisterView', 'InvolvedpartiesView', 'AddedithazardinfoView', 'HeaderView'], function() {
    Account.init();
    app = new AppRouter();
    if (Account.isLoggedIn()) {
        Account.onAutoLogin();
        Backbone.history.start();
    } else {
        Account.onAutoLogout();
        Backbone.history.start();
    }
});