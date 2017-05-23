$(window).on('load', (() => {
    $.get("./static/data.json", (data) => {
        begin(data);
    }).fail((data) => {
        console.log(data);
        error(data.status + ' ' + data.statusText);
    });
}));

function begin(data) {
    let ContactCardModel = Backbone.Model.extend({
        defaults: {
            message: "Hello World"
        }
    });
    let ContactCardView = Backbone.View.extend({
        el: '#contact-cards',
        render: function() {
            this.$el.html(this.model.get('message'));
            return this;
        }
    });
    new ContactCardView({
        model: new ContactCardModel({})
    }).render();
};

function error(message) {
    new window.ErrorMessageView({
        model: new window.ErrorMessageModel({
            message: message
        })
    }).render();
}