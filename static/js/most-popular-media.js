(function(doc, global) {

  global.MostPopularMedia = {
    getToken: function() {
      var token = global.localStorage.getItem('token');
      var hash = global.location.hash;

      if (hash) {
        token = hash.split('access_token=')[1];
        global.localStorage.setItem('token', token);
      }

      return token;
    },

    requestAPI: function() {
      var token = this.getToken();
      var url = [
                  'https://api.instagram.com/v1/users/self/media/recent/',
                  '?access_token={ACCESS_TOKEN}&callback=MostPopularMedia.updateHTML'
                ].join('');
      url = url.replace('{ACCESS_TOKEN}', token);

      var script = doc.createElement('script');
      script.src =  url;
      doc.getElementsByTagName('head')[0].appendChild(script);
    },

    getMostPopular: function(obj) {
      var mostPopular = obj.data[0];
      console.log(obj);

      obj.data.forEach(function(item) {
        if (mostPopular.likes.count < item.likes.count) {
          mostPopular=  item;
        }
      });

      return mostPopular;
    },

    updateHTML: function(data) {
      var el = {};
      el.main = doc.getElementById('main');
      el.link = el.main.querySelector('a');
      el.img = el.main.querySelector('img');
      el.likes = el.main.querySelector('.likes > span');
      el.h1 = el.main.querySelector('h1');

      var mostPopular = this.getMostPopular(data);

      el.img.src = mostPopular.images.standard_resolution.url;
      el.img.alt = mostPopular.caption ? mostPopular.caption.text : '';
      el.link.href = mostPopular.link;
      el.likes.innerText = mostPopular.likes.count;
      el.h1.innerText = mostPopular.user.username;
    }
  };

}(document, window));
