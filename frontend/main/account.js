window.Account = {
    init: function() {
        var self = this;
    },
    set: function(key, str) {
        localStorage.setItem(key, str);
    },
    get: function(key) {
        return localStorage.getItem(key);
    },
    getName: function() {
        return this.get('accountfName') || '';
    },
    getlname: function() {
        return this.get('accountlName') || '';
    },
    getemail: function() {
        return this.get('accountemail') || '';
    },
    isLoggedIn: function() {
        return this.get('loggedIn') == '1';
    },
    login: function() {
        var name = $.trim($('#input_name').val());
        var pass = $.trim($('#input_pass').val());
        if (pass == '' || name == '') {
            if (name == '') {
                $('#input_name').parent().parent().addClass('is-invalid');
            }
            if (pass == '') {
                $('#input_pass').parent().parent().addClass('is-invalid');
            }
            return;
        }
        var self = this;
        self.onLoggedIn("name", "pass");
    },
    onLoggedIn: function(fname, lname, email) {
        this.set('accountfName', fname);
        this.set('accountlName', lname);
        this.set('accountemail', email);
        this.set('loggedIn', '1');
        $('#account_name').text(fname);
        window.location.replace('./#!involvedparty/5b0108d4c2c35e04a8a1857b');
        $('.nav-item').show();
    },
    onAutoLogin: function() {
        $('.nav-item').show();
    },
    onAutoLogout: function() {
        this.set('loggedIn', '0');
        this.set('accountfName', "");
        this.set('accountlName', "");
        this.set('accountemail', "");
        $('.nav-item').hide();
    },
    logout: function() {
        this.set('loggedIn', '0');
        $('.nav-item').hide();
        app.navigate('', true);
        window.location.reload();
    }
};