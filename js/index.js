var vm = new Vue({
  el: '#main-container',
  data: {
    images: [],
    query: ''
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

      this.$http.jsonp(reqURL, options); /* sent http requet to flickr public api */  
    }
  },
  watch:{
    images: function (newVal, oldVal) {
    this.$nextTick(function () {
      //now, DOM will have been updated.
    })  
    }
  }

});


/* the flickr default wrapped callback function */
function jsonFlickrFeed(response) {
  if(response.items.length > 0){
    vm.$data.images = response.items;

  }
  else{
    vm.$data.images = null;
  }

}

/* add a custom directive called v-img */
Vue.directive('img', {
  inserted: function (el, binding) {
    lazyload(el, binding);
  },   /* inserted: called when bounded element has been inserted */
  update: function (el, binding) {
    lazyload(el, binding); /* update: called after images changed */
  }
});


/* image preloading to improve user experience */
function lazyload(el, binding) {
  var img = new Image();   
  img.src = binding.value;  /* update image source url */

  img.onload = function() {
    el.src = binding.value;   /* show photo after complete download */
  };
}

