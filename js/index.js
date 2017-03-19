/* VUE.JS logic */
var vm = new Vue({
  el: '#main-container',
  data: {
    images: [],
    query: '',
  },
  methods: {    /* callFlickrPublic API */
    callapi: function (query) {
      var reqURL = "https://api.flickr.com/services/feeds/photos_public.gne";
      var options = {
        params: {
          format: 'json',
          tags: this.query
        }
      };

      this.$http.jsonp(reqURL, options);
    }

  }
});

/* the flickr default wrapped callback function */
function jsonFlickrFeed(response) {
  vm.$data.images = response.items;
}


/* add a custom directive called v-img */
Vue.directive('img', {
  inserted: function (el, binding) {
    lazyload(el, binding);
  },   /* inserted: called when the bound element has been inserted into its parent node */
  update: function (el, binding) {
    lazyload(el, binding); /*update: called after the containing component has updated, but possibly before its children have updated. */
  }
});


/* image preloading to improve efficiency */
function lazyload(el, binding) {
  var img = new Image();   
  img.src = binding.value; 

  img.onload = function() {
    el.src = binding.value;   /* insert images into main container */
  };
}