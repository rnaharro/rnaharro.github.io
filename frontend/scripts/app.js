
var settings = {
    github_user : 'alterebro',
    metadata : {
        title : 'GitHub personal user site generator',
        description : 'GitHub personal user site generator using the GitHub public API and Vue.js : alterebro.github.io',
        url : 'http://alterebro.github.io'
    }
}

var githubAPI = {
	repos : 'https://api.github.com/users/' + settings.github_user + '/repos?sort=pushed',
	user : 'https://api.github.com/users/' + settings.github_user
}

var data = {
	user : settings.github_user,
    metadata : settings.metadata,
    user_data : {},
	repos : null,
	user_languages : {},
    user_languages_total : 0,
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
        },
        langpercent : function(val) {
            var out = (val / this.user_languages_total)*100;
            return out.toFixed(1);
        }
	},

	methods : {

        // ---------------------
        // Get and add languages from each repository Endpoint
        setLanguages : function(langData, index) {

            data.repos[index].main_language = data.repos[index].language;

            var res = langData;
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

            var lang_total = 0;
            for ( var j in data.user_languages ) {
                lang_total += data.user_languages[j];
            }
            data.user_languages_total = lang_total;

        },
		getLanguages : function(index, url) {

            var self = this;
            var cache_key = (settings.github_user+'_repo_'+index).toLowerCase();
            var cache = Cache.get(cache_key);
            if ( !!cache ) {

                self.setLanguages(cache, index);

            } else {

                var langData = {};
                atomic.get(url).success(function (d, x) {
                    langData = d;
                    Cache.set(cache_key, langData);
                })
    			.error(function () {})
    			.always(function () {
                    self.setLanguages(langData, index);
                });
            }
		},

        // ---------------------
        // Repos Data
        setReposData : function(reposData) {

            if (reposData.length == 0) {
                console.log('error');
            }

            data.repos = reposData;
            for (var i=0; i<reposData.length; i++) {
                data.stars += reposData[i].stargazers_count;
                data.forks += reposData[i].forks_count;
                data.watching += reposData[i].watchers_count;

                this.getLanguages(i, reposData[i].languages_url);
            }
        },
		getReposData : function() {

			var self = this;
            var cache_key = settings.github_user+'_repos'.toLowerCase();
            var cache = Cache.get(cache_key);
            if ( !!cache ) {

                self.setReposData(cache);

            } else {

                var reposData = [];
                atomic.get(githubAPI.repos).success(function (d, x) {
    				reposData = d;
                    Cache.set(cache_key, reposData);
    			})
    			.error(function () {})
    			.always(function () {
                    self.setReposData(reposData);
                });
            }
		},

        // ---------------------
        // User Data
        setUserData : function(userData) {
            data.user_data = userData;
        },
        getUserData : function() {

            var self = this;
            var cache_key = settings.github_user+'_user'.toLowerCase();
            var cache = Cache.get(cache_key);
            if ( !!cache ) {

                self.setUserData(cache);

            } else {

                var userData = {};
                atomic.get(githubAPI.user).success(function(d, x) {
                    userData = d;
                    Cache.set(cache_key, userData);
                })
                .error(function () {})
    			.always(function () {
                    self.setUserData(userData);
                });
            }
        }

	}
});
