window.ErrorMessageModel = Backbone.Model.extend({
    defaults: {
        message: 'Some error occurred, please try again'
    }
});

window.ErrorMessageView = Backbone.View.extend({
    el: '#error-messages',
    render: function() {
        this.$el.addClass('alert alert-danger');
        this.$el.html(this.model.get('message'));
        return this;
    }
});

window.UpdateEmployeeModel = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        position: ''
    }
});

window.UpdateEmployeeView = Backbone.View.extend({
    el: '#update-employee-modal',
    render: function() {
        $('#updated-employee-id').val(this.model.get('id'));
        $('#updated-employee-name').val(this.model.get('name'));
        $('#updated-employee-postion').val(this.model.get('position'));
        $('#update-employee-modal').modal('show');
        return this;
    },
    events: {
        'click #submit-update-employee': 'submit'
    },
    submit: function() {
        
    }
});