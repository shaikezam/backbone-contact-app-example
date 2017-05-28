$(window).on('load', (() => {
    $.get("./static/data.json", (data) => {
        $('#about-dialog').modal('show');
        begin(data);
    }).fail((data) => {
        error(data.status + ' ' + data.statusText);
    });

}));

function begin(data) {

    let ceoCollection = new CEOCollection();
    let managerCollection = new ManagersCollection();
    let regularEmployeesCollection = new RegularEmployeesCollection();

    let aContacts = [];
    let x;

    _.each(data['CEO'], function(ceo) {
        ceoCollection.add(new CEOCardModel({
            id: ceo.id,
            name: ceo.name,
            photo: ceo.photo,
            email: ceo.email
        }));
    });
    ceoCollection.each(function(ceoModel) {
        x = new CEOCardView({
            model: ceoModel
        }).render();
        aContacts.push(x);
    });
    _.each(data['managers'], function(manager) {
        managerCollection.add(new ManagerCardModel({
            id: manager.id,
            name: manager.name,
            managerID: manager.managerID,
            photo: manager.photo,
            email: manager.email
        }));
    });
    managerCollection.each(function(managerModel) {
        x = new ManagerCardView({
            model: managerModel
        }).render();
        aContacts.push(x);
    });
    _.each(data['regularEmployees'], function(regularEmployee) {
        regularEmployeesCollection.add(new EmployeeCardModel({
            id: regularEmployee.id,
            name: regularEmployee.name,
            managerID: regularEmployee.managerID,
            photo: regularEmployee.photo,
            email: regularEmployee.email
        }));
    });
    regularEmployeesCollection.each(function(regularEmployeeModel) {
        x = new EmployeeCardView({
            model: regularEmployeeModel
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

    $('#new-employee-button').click(function(oEvent) {
        $('#new-employee-anchor').click()
        let newEmployeeName = $('#new-employee-name').val();
        $('#new-employee-name').val("");
        let newEmployeePostion = $('#new-employee-postion').val();
        $('#new-employee-postion').val("Employee");
        let newEmployeeEmail = $('#new-employee-email').val();
        $('#new-employee-email').val("");
        if (!(newEmployeeName && newEmployeePostion)) {
            errorHandling.renderError(errorHandling.allFields);
            return;
        } else {
            //errorHandling.removeErrors();
        }
        let newEmployee = {
            name: newEmployeeName,
            id: aContacts.length + 1,
            managerID: 'TBD',
            email: newEmployeeEmail
        };
        let x;
        switch (newEmployeePostion) {
            case 'CEO':
                data['CEO'].push(newEmployee);
                ceoCollection.add(new CEOCardModel({
                    id: newEmployee.id,
                    name: newEmployee.name,
                    email: newEmployeeEmail
                }));
                x = new CEOCardView({
                    model: ceoCollection.at(ceoCollection.length - 1)
                });
                break;
            case 'Manager':
                data['managers'].push(newEmployee)
                managerCollection.add(new ManagerCardModel({
                    id: newEmployee.id,
                    name: newEmployee.name,
                    managerID: newEmployee.managerID,
                    photo: newEmployee.photo,
                    email: newEmployee
                }));
                x = new ManagerCardView({
                    model: managerCollection.at(managerCollection.length - 1)
                });
                break;
            case 'Employee':
                regularEmployeesCollection.add(new EmployeeCardModel({
                    id: newEmployee.id,
                    name: newEmployee.name,
                    managerID: newEmployee.managerID,
                    photo: newEmployee.photo,
                    email: newEmployee
                }));
                x = new EmployeeCardView({
                    model: regularEmployeesCollection.at(regularEmployeesCollection.length - 1)
                });
                break;
        }
        x.render();
        aContacts.push(x);
    });

};

var errorHandling = {
    aErrors: [],
    allFields: "Please fill all fields",
    renderError: function(message) {
        this.aErrors.push(new window.ErrorMessageView({
            model: new window.ErrorMessageModel({
                message: message
            })
        }).render());
    },
    removeErrors: function() {
        this.aErrors[0].remove();
    }
};