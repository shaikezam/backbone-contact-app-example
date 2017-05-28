    let CEOCardView = Backbone.View.extend({
        className: 'contact-card',
        initialize: function() {
            this.rendered = true;
            _.bindAll(this, "render");
            this.model.bind('change', this.render);
        },
        template: function() {
            return '<span>Position: <%= position %></span><br><span>Name: <%= name %></span><br><span>ID: <%= id %></span><br>';
        },
        render: function() {
            this.attachData();
            this.attachPhoto();
            this.appendCard();
            return this;
        },
        events: {
            'click': 'showDetails'
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
            var oTemplate = _.template(this.template());
            this.$el.html(oTemplate(this.model.toJSON()));
        },
        attachPhoto: function() {
            this.$el.prepend('<img class="contact-img" src=' + this.model.get('photo') + ' />')
        },
        appendCard() {
            this.$el.appendTo('#ceo-contact-card');
        },
        showDetails: function() {
            $('#updated-employee-id').val(this.model.get('id'));
            $('#updated-employee-name').val(this.model.get('name'));
            $('#updated-employee-position').val(this.model.get('position'));
            $('#update-employee-modal').modal('show');
            $('#submit-update-employee').on('click', function(oEvent) {
                let updatedName = $('#updated-employee-name').val();
                this.updateEmployee(updatedName, oEvent);
            }.bind(this));
        },
        updateEmployee: function(updatedName, oEvent) {
            $('#submit-update-employee').off('click');
            this.model.set({'name': updatedName});
        }
    });

    let ManagerCardView = CEOCardView.extend({
        template: function() {
            return CEOCardView.prototype.template.apply(this, arguments) + '<span>Manager ID: <%= managerID %></span>';
        },
        appendCard() {
            this.$el.appendTo('#manager-contact-cards');
        }
    });

    let EmployeeCardView = ManagerCardView.extend({
        appendCard() {
            this.$el.appendTo('#regular-contact-cards');
        }
    });