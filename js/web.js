$(window).on('load', (() => {
    $.get("./static/data.json", (data) => {
        begin(data);
    }).fail((data) => {
        console.log(data);
        error(data.status + ' ' + data.statusText);
    });

}));

function begin(data) {

    let CEOCardModel = Backbone.Model.extend({
        defaults: {
            id: '',
            name: '',
            photo: './assets/contact.svg',
            position: 'CEO'
        }
    });

    let ManagerCardModel = CEOCardModel.extend({
        defaults: {
            managerID: '',
            position: 'Manager'
        }
    });
    let EmployeeCardModel = CEOCardModel.extend({
        defaults: {
            managerID: '',
            position: 'Employee'
        }
    });
    _.defaults(ManagerCardModel.prototype.defaults, CEOCardModel.prototype.defaults);
    _.defaults(EmployeeCardModel.prototype.defaults, CEOCardModel.prototype.defaults);

    let CEOCardView = Backbone.View.extend({
        className: 'contact-card',
        initialize: function() {
            this.rendered = true;
        },
        render: function() {
            this.attachData();
            this.attachPhoto();
            this.appendCard();
            return this;
        },
        showHideView: function(bFlag) {
            if (bFlag) {
                if (!this.rendered) {
                    this.$el.show();
                    this.rendered = true;
                }
            } else {
                if (this.rendered) {
                    this.$el.hide();
                    this.rendered = false;
                }
            }
        },
        attachData: function() {
            this.$el.prepend('<span>' + 'Employee Position: ' + this.model.get('position') + '</span>');
            this.$el.prepend('<span>' + 'Employee Name: ' + this.model.get('name') + '</span><br>');
            this.$el.prepend('<span>' + 'Employee ID: ' + this.model.get('id') + '</span><br>');
        },
        attachPhoto: function() {
            this.$el.prepend('<img class="ceo-contact-img" src=' + this.model.get('photo') + ' />')
        },
        appendCard() {
            this.$el.appendTo('#ceo-contact-card');
        }
    });

    let ManagerCardView = CEOCardView.extend({
        className: 'contact-card',
        initialize: function() {
            CEOCardView.prototype.initialize.apply(this);
        },
        render: function() {
            this.attachData();
            this.attachPhoto();
            this.appendCard();
            return this;
        },
        showHideView: function(bFlag) {
            CEOCardView.prototype.showHideView.call(this, bFlag);
        },
        attachData: function() {
            this.$el.prepend('<br><span>' + 'Manager ID: ' + this.model.get('managerID') + '</span>');
            CEOCardView.prototype.attachData.apply(this);
        },
        attachPhoto: function() {
            this.$el.prepend('<img class="manager-contact-img" src=' + this.model.get('photo') + ' />');
        },
        appendCard() {
            this.$el.appendTo('#manager-contact-cards');
        }
    });

    let EmployeeCardView = CEOCardView.extend({
        className: 'contact-card',
        initialize: function() {
            CEOCardView.prototype.initialize.apply(this);
        },
        render: function() {
            this.attachData();
            this.attachPhoto();
            this.appendCard();
            return this;
        },
        showHideView: function(bFlag) {
            CEOCardView.prototype.showHideView.call(this, bFlag);
        },
        attachData: function() {
            this.$el.prepend('<br><span>' + 'Manager ID: ' + this.model.get('managerID') + '</span>');
            CEOCardView.prototype.attachData.apply(this);
        },
        attachPhoto: function() {
            this.$el.prepend('<img class="manager-contact-img" src=' + this.model.get('photo') + ' />');
        },
        appendCard() {
            this.$el.appendTo('#regular-contact-cards');
        }
    });
    var aContacts = []
    for (var key in data) {
        if (key == 'CEO') {
            let x = new CEOCardView({
                model: new CEOCardModel({
                    id: data['CEO'].id,
                    name: data['CEO'].name,
                    photo: data['CEO'].photo
                })
            }).render();
            aContacts.push(x)
        } else if (key == 'managers') {
            _.each(data['managers'], function(manager) {
                let x = new ManagerCardView({
                    model: new ManagerCardModel({
                        id: manager.id,
                        name: manager.name,
                        managerID: manager.managerID,
                    })
                }).render();
                aContacts.push(x)
            });
        } else {
            _.each(data['regularEmployees'], function(regularEmployee) {
                let x = new EmployeeCardView({
                    model: new EmployeeCardModel({
                        id: regularEmployee.id,
                        name: regularEmployee.name,
                        managerID: regularEmployee.managerID,
                    })
                }).render();
                aContacts.push(x)
            });
        }
    }

    $('#search-employees').on('input', function(oEvent) {
        let sValue = $(event.target).val();
        _.each(aContacts, function(contact) {
            var name = contact.model.get('name');
            if (name.indexOf(sValue) === -1) {
                contact.showHideView(false);
            } else {
                contact.showHideView(true);
            }
        });
    });

};

function error(message) {
    new window.ErrorMessageView({
        model: new window.ErrorMessageModel({
            message: message
        })
    }).render();
}