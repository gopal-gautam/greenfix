window.utils = {
    loadTemplate: function(views, callback) {
        var deferreds = [];
        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            }
        });
        $.when.apply(null, deferreds).done(callback);
    },
    displayValidationErrors: function(messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },
    displayCustomErrors: function(messages) {
        this.showAlert('', messages, 'alert-warning');
    },
    removeCustomErrors: function(messages) {
        this.hideAlert();
    },
    addValidationError: function(field, message) {
        var controlGroup = $('#' + field).parent().parent();
        $('#' + field).addClass('is-invalid');
        $('.invalid-feedback', controlGroup).html(message);
    },
    removeValidationError: function(field) {
        var controlGroup = $('#' + field).parent().parent();
        $('#' + field).removeClass('is-invalid');
        $('.invalid-feedback', controlGroup).html('');
    },
    addValidationErrorlvl2: function(field, message) {
        var controlGroup = $('#' + field).parent().parent().parent();
        $('#' + field).addClass('is-invalid');
        this.displayCustomErrors(message);
        $('.invalid-feedback', controlGroup).html('');
    },
    removeValidationErrorlvl2: function(field) {
        var controlGroup = $('#' + field).parent().parent().parent();
        $('#' + field).removeClass('is-invalid');
        this.hideAlert();
        $('.invalid-feedback', controlGroup).html('');
    },
    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show(1000);
    },
    hideAlert: function() {
        $('.alert').hide(1000);
    }
};