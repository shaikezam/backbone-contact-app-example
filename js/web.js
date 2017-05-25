$(window).on('load', (() => {
    $.get("./static/data.json", (data) => {
        begin(data);
    }).fail((data) => {
        error(data.status + ' ' + data.statusText);
    });

}));

function begin(data) {

    let ceoCollection = new CEOCollection();
    let managerCollection = new ManagersCollection();
    let regularEmployeesCollection = new RegularEmployeesCollection();

    var aContacts = []
    _.each(data['CEO'], function(ceo) {
        ceoCollection.add(new CEOCardModel({
            id: ceo.id,
            name: ceo.name
        }));
        let x = new CEOCardView({
            model: ceoCollection.at(0)
        }).render();
        aContacts.push(x);
    })

    _.each(data['managers'], function(manager) {
        managerCollection.add(new ManagerCardModel({
            id: manager.id,
            name: manager.name,
            managerID: manager.managerID
        }));
        let x = new ManagerCardView({
            model: managerCollection.at(managerCollection.length - 1)
        }).render();
        aContacts.push(x);

    });
    _.each(data['regularEmployees'], function(regularEmployee) {
        regularEmployeesCollection.add(new EmployeeCardModel({
            id: regularEmployee.id,
            name: regularEmployee.name,
            managerID: regularEmployee.managerID
        }));
        let x = new EmployeeCardView({
            model: regularEmployeesCollection.at(regularEmployeesCollection.length - 1)
        }).render();
        aContacts.push(x);
    });

    $('#search-employees').on('input', function(oEvent) {
        let sValue = $(event.target).val().toLocaleLowerCase();
        _.each(aContacts, function(contact) {
            var name = contact.model.get('name').toLocaleLowerCase();
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