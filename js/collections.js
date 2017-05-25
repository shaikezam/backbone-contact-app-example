let CEOCollection = Backbone.Collection.extend([{
    model: ManagerCardModel,
    comparator: function(ceo) {
        return ceo.get('id');
    }
}]);

let ManagersCollection = Backbone.Collection.extend([{
    model: ManagerCardModel,
    comparator: function(manager) {
        return manager.get('id');
    }
}]);


let RegularEmployeesCollection = Backbone.Collection.extend([{
    model: ManagerCardModel,
    comparator: function(regularEmployee) {
        return regularEmployee.get('id');
    }
}]);