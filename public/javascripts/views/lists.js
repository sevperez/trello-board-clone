// BACKBONE - VIEWS - lists.js

var ListsView = Backbone.View.extend({
  el: "#lists",
  
  handleNewList: function(model, collection) {
    // if an AddNewListView exists, remove it from the DOM
    if (this.addNewListView) {
      this.addNewListView.remove();
    }
    
    // add the new ListView and title subview
    var view = new ListView({ model: model });
    this.$el.append(view.render().el);
    var subview = new ListTitleView({ model: model });
    subview.render();
    
    // re-add an AddNewListView
    this.addNewListView = new AddNewListView();
    
    // add view's ul.cardList item to dragula to enable drag/drop of cards
    App.drake.containers.push(view.$(".cardList")[0]);
    
    // trigger new cardSet and cardSet view
    App.trigger("addCardSet", model.id);
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.handleNewList);
  },
  
  initialize: function() {
    this.bindEvents();
    
    // add to dragula to enable list drag/drop
    App.drake.containers.push(this.el);
  },
});
