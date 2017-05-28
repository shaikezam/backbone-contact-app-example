    let CEOCardView = Backbone.View.extend({
        className: 'contact-card',
        initialize: function() {
            this.rendered = true;
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
            this.$el.prepend(oTemplate(this.model.toJSON()));
        },
        attachPhoto: function() {
            this.$el.prepend('<img class="contact-img" src=' + this.model.get('photo') + ' />')
        },
        appendCard() {
            this.$el.appendTo('#ceo-contact-card');
        }
    });

    let ManagerCardView = CEOCardView.extend({
        initialize: function() {
            CEOCardView.prototype.initialize.apply(this);
        },
        template: function() {
          return CEOCardView.prototype.template.apply(this, arguments) + '<span>Manager ID: <%= managerID %></span>';
        },
        render: function() {
            CEOCardView.prototype.render.apply(this, arguments);
            this.appendCard();
            return this;
        },
        showHideView: function(bFlag) {
            CEOCardView.prototype.showHideView.call(this, bFlag);
        },
        appendCard() {
            this.$el.appendTo('#manager-contact-cards');
        }
    });

    let EmployeeCardView = ManagerCardView.extend({
        initialize: function() {
            ManagerCardView.prototype.initialize.apply(this);
        },
        template: function() {
          return ManagerCardView.prototype.template.apply(this, arguments);
        },
        render: function() {
            ManagerCardView.prototype.render.apply(this, arguments);
            this.appendCard();
            return this;
        },
        showHideView: function(bFlag) {
            ManagerCardView.prototype.showHideView.call(this, bFlag);
        },
        appendCard() {
            this.$el.appendTo('#regular-contact-cards');
        }
    });