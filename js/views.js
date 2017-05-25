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
            this.$el.prepend('<img class="contact-img" src=' + this.model.get('photo') + ' />')
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
            this.$el.prepend('<img class="contact-img" src=' + this.model.get('photo') + ' />');
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
            this.$el.prepend('<img class="contact-img" src=' + this.model.get('photo') + ' />');
        },
        appendCard() {
            this.$el.appendTo('#regular-contact-cards');
        }
    });