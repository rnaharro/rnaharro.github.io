var githubUser = 'alterebro';
var githubAPI = {
	repos : 'https://api.github.com/users/' + githubUser + '/repos?sort=pushed',
	user : 'https://api.github.com/users/' + githubUser
}

var data = {
	user : githubUser,
	repos : null,
	user_languages : {},
	stars : 0,
	forks : 0,
	watching : 0
};

var app = new Vue({

	el : '#app',
	data: data,

	created: function () {
        this.getUserData();
		this.getReposData();
	},

	filters : {
		filterdate : function(str) {
			var _d = new Date(str);
			var  d = {
				d : ("0" + _d.getUTCDate()).slice (-2),
				m : ("0" + _d.getUTCMonth()).slice (-2),
				y : _d.getUTCFullYear(),
				hh : ("0" + _d.getUTCHours()).slice (-2),
				mm : ("0" + _d.getUTCMinutes()).slice (-2)
			};
			return (d.d + '.' + d.m + '.' + d.y + ' @' + d.hh + ':' + d.mm);
		},

        autolinks : function(str) {
            var output = str.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ');
            return output;
        }
	},

	methods : {

		getLanguages : function(index, url) {

			data.repos[index].main_language = data.repos[index].language;

			atomic.get(url).success(function (d, x) {
				var res = d;
				var repo_langs = [];
				for ( var i in res ) {
					repo_langs.push(i);
					if ( i in data.user_languages ) {
						Vue.set(data.user_languages, i, (data.user_languages[i] + res[i]));
					} else {
						Vue.set(data.user_languages, i, res[i]);
					}
				}
				data.repos[index].language = repo_langs.join(', ');

			})
			.error(function () {})
			.always(function () {});
		},

		getReposData : function() {

			var self = this;

			atomic.get(githubAPI.repos).success(function (d, x) {
				var reposData = d;
				data.repos = reposData;
				for (var i=0; i<reposData.length; i++) {
					data.stars += reposData[i].stargazers_count;
					data.forks += reposData[i].forks_count;
					data.watching += reposData[i].watchers_count;

					self.getLanguages(i, reposData[i].languages_url);
				}
			})
			.error(function () {})
			.always(function () {});
		},

        getUserData : function() {
            atomic.get(githubAPI.user).success(function(d, x) {
                console.log( d );
            });
        }

	}
});
