window.ErrorMessageModel = Backbone.Model.extend({
    default: {
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