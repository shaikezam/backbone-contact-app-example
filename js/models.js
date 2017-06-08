let CEOCardModel = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        photo: './assets/contact.svg',
        position: 'CEO',
        email: ''
    },
    initialize: function() {
        this.on("invalid", function(model, error) {
            let errorView = new window.ErrorMessageView({
                model: new window.ErrorMessageModel({
                    message: "Error while update " + model.get('name') + ": " + error
                })
            }).render();
            window.errorViews.push(errorView);
        });
    },
    validate: function(attrs) {
        if (!attrs.email) {
            return "Please enter employee email address!"
        }
        if (!attrs.name) {
            return "Please enter employee name!"
        }
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