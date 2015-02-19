(function(){

// -------------
// Person Model
// -------------
var Person = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  }
});

// -------------
// Persons Collection
// -------------
var PersonsCollection = Backbone.Collection.extend({
  model: Person,

  url: "https://api.parse.com/1/classes/Person",

});

// -------------
// Person Input View
// -------------
var PersonInputView = Backbone.View.extend ({
  tagName: 'form',
  template: _.template($('[data-template-name=person-create]').text()),

  events: {
    'click .js-submit': 'submit'
  },

  submit: function(e) {
    e.preventDefault();
    var firstName = $('#js-first-name').val();
    var lastName = $('#js-last-name').val();
    var phoneNumber = $('#js-number').val();
    var address = $('#js-address').val();

    this.collection.create({firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, address: address});

    firstName = $('#js-first-name').val('');
    lastName = $('#js-last-name').val('');
    phoneNumber = $('#js-number').val('');
    address = $('#js-address').val('');

  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  }

});


// -------------
// App Router
// -------------
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function(){
    this.personsCollection = new PersonsCollection();
    this.personView = new PersonInputView({collection: this.personsCollection});
  },

  index: function(){
    $('.app-container').append(this.personView.el);
    this.personView.render();
  }
});


// -------------
// Configuration
// -------------
$.ajaxSetup({
  headers: {
    "X-Parse-Application-Id": "DWZfmr6z4XGRp3lQcqQ4VSMjNQun7hm6C7NgEsK0",
    "X-Parse-REST-API-Key": "72jLn2YMaEQXP9dhpvIKRxii2SkkqgaNEOOLw4yq"
  }
});

// -------------
// Glue code
// -------------
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
});

})();
