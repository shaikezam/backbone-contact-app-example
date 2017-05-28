let CEOCardModel = Backbone.Model.extend({
    defaults: {
        id: '',
        name: '',
        photo: './assets/contact.svg',
        position: 'CEO',
        email: ''
    },
    validate: function (attrs) {
        if (!attrs.email) {
            return "Please enter employee email address!"
        } if (!attrs.name) {
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