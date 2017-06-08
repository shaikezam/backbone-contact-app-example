window.ErrorMessageModel = Backbone.Model.extend({
    defaults: {
        message: 'Some error occurred, please try again'
    }
});

window.ErrorMessageView = Backbone.View.extend({
    el: '#error-messages',
    events: {
        'remove': 'removeViewFromArray'
    },
    template: function() {
        return '<div class="alert alert-danger"><%= message %><a href="#" class="close" data-dismiss="alert" aria-label="close">x</a></div>';
    },
    render: function() {
        //this.$el.addClass('alert alert-danger');
        var oTemplate = _.template(this.template());
        this.$el.prepend(oTemplate(this.model.toJSON()));
        return this;
    },
    removeViewFromArray: function() {
        console.log("LoL");
    }
});

window.errorViews = []