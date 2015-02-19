(function(){

// -------------
// Post Model
// -------------
var Post = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    title: '',
    body: ''
  }
});

// -------------
// Posts Collection
// -------------
var PostsCollection = Backbone.Collection.extend({
  model: Post,

  url: "https://api.parse.com/1/classes/Post",

});

// -------------
// Post Input View
// -------------
var PostInputView = Backbone.View.extend({
  tagName: 'form',
  template: _.template($('[data-template-name=post-create]').text()),

  events: {
    'click .js-submit': 'submit'
  },

  submit: function(e) {
    e.preventDefault();
    var title = $('input').val();
    var body = $('textarea').val();
    console.log(title, body);

    this.collection.create({title: title, body: body });

    title = $('input').val('');
    body = $('textarea').val('');

  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  }

});


// -------------
// Router / Application State
// -------------

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },

  initialize: function(){
    this.postsCollection = new PostsCollection();
    this.postView = new PostInputView({collection: this.postsCollection});
  },

  index: function(){
    $('.app-container').append(this.postView.el);
    this.postView.render();
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
