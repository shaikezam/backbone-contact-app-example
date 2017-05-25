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