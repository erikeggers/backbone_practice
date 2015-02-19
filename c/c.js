(function(){

window.App = window.App || {};

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
// Post Collection
// -------------
var PostsCollection = Backbone.Collection.extend({
  model: Post,

  url: "https://api.parse.com/1/classes/Post",

  parse: function(response){
    return response.results;
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
    // this.$el.empty();

    this.collection.each(function(post){
     var itemView = new PostItemView({model: post});
     itemView.render();
     self.$el.append(itemView.el);
    });

    return this;
  }

});

// -------------
// Post Item View
// -------------
var PostItemView = Backbone.View.extend ({
  tagName: 'li',
  className: 'post',
  template: _.template($('[data-template-name=blog-list-template]').text()),

  render: function(){
  this.$el.html(this.template(this.model.toJSON()));
  return this;
}
});


// -------------
// Post Detail View
// -------------
var PostDetailView = Backbone.View.extend({


});

// -------------
// App Router
// -------------
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'posts/:id': 'getPost',
  },

  initialize: function(){
    this.posts = new PostsCollection();
    this.postsList = new PostsListView({collection: this.posts});
  },

  index: function(){
    this.posts.fetch();
    this.postsList.render();
    console.log(this.postsList);

  },

  getPost: function(){

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
