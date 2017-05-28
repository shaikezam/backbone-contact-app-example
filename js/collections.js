let CEOCollection = Backbone.Collection.extend({
    model: ManagerCardModel,
    comparator: function(ceo) {
        return ceo.get('name');
    }
});

let ManagersCollection = Backbone.Collection.extend({
    model: ManagerCardModel,
    comparator: function(manager) {
        return manager.get('name');
    }
});


let RegularEmployeesCollection = Backbone.Collection.extend({
    model: ManagerCardModel,
    comparator: function(regularEmployee) {
        return regularEmployee.get('name');
    }
});