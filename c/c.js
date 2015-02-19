(function() {

  'use strict';

  window.App = window.App || {};

// -------------
// Post Model
// -------------
var Post = Backbone.Model.extend({
  idAttribute: "objectId",

  defaults: function(attributes) {
    attributes = attributes || {};
    _.defaults(attributes, {
      title: '',
      body: '',
    });
    return attributes;
  }
});

// -------------
// Posts Collection
// -------------
var PostsCollection = Backbone.Collection.extend({
  model: Post,

  url: "https://api.parse.com/1/classes/Post",

  parse: function(response){
    return response.results;
  }

});

// -------------
// Post Item View
// -------------
var PostItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'post',
  template: _.template($('#blog-list-template').text()),

  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );
  }

});

// -------------
// Post List View
// -------------
var PostsListView = Backbone.View.extend({
  className: 'js-posts',
  el: '.posts-container',

  initialize: function(){
     this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var self = this;
    this.$el.empty();

    this.collection.each(function(post){
      var itemView = new PostItemView({model: post});
      itemView.render();
      self.$el.append(itemView.el);
    });
    return this;
  }
});

// -------------
// Post Detail View
// -------------
var PostDetailView = Backbone.View.extend({
  el: $('.js-post'),

  template: _.template($('#view-post-template').text()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});

// -------------
// Router
// -------------
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/:id': 'getPost',
  },

  initialize: function(){
    this.posts = new PostsCollection();
    this.postsList = new PostsListView({collection: this.posts});
    this.postDetailView = new PostDetailView();
  },

  index: function(){
    this.posts.fetch();
    this.postsList.render();
  },

  getPost: function(id){
    var self = this;
    this.posts.fetch().done(function (){
      self.postDetailView.model = self.posts.get(id);
      self.postDetailView.render();
      $('.posts-container').html(self.postDetailView.el);
    });
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

  $(document).ready(function(){
    App.router = new AppRouter();
    Backbone.history.start();
  });

})();
