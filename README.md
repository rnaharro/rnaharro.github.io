# GUPG : Github User Page Generator ([alterebro.github.io](http://alterebro.github.io))

#### JavaScript generator built with Vue.js that creates a dynamic web document based on the existing data and repositories of a given GitHub user.

**Live demo : [http://alterebro.github.io](http://alterebro.github.io)**, you can also see how it looks with your user data or any other user by adding a querystring to the URL ( *?username* ).
For example, in order to see the **octocat** user generated page, the URL will be the following : **[http://alterebro.github.io/?octocat](http://alterebro.github.io/?octocat)**


## Create your own

1. Clone the GUPG git repository `git clone git://github.com/alterebro/alterebro.github.io.git` or download it : [https://github.com/alterebro/alterebro.github.io/zipball/master](https://github.com/alterebro/alterebro.github.io/zipball/master)

2. Open the file located at `frontend/scripts/app.js` and modify the `settings` variable with your data:

	```javascript
	var settings = {
		// Your GitHub username
	    github_user : 'alterebro',

		// title + description and the URL where you are going to publish your own GUPG.
	    metadata : {
	        title : 'GitHub personal user site generator',
	        description : 'GitHub personal user site generator using the GitHub public API and Vue.js : alterebro.github.io',
	        url : 'http://alterebro.github.io'
	    }
	}
	```
3. Push or upload it and done!

---

## Credits

##### Libraries used :

- **[Vue.js](https://vuejs.org/)** Reactive Components for Modern Web Interfaces by: [Evan You](http://evanyou.me/)
- **[atomic.js](https://github.com/toddmotto/atomic)** Ajax/XHR module with chained success/error callbacks and JSON parsing by: [Todd Motto](https://toddmotto.com/)
- **[Font Awesome](https://fortawesome.github.io/Font-Awesome/)** The iconic font and CSS toolkit by: [Dave Gandy](https://twitter.com/davegandy)
- **[cache.js](https://github.com/benschwarz/cache.js)** localStorage with timed expiry by: [Ben Schwarz](http://germanforblack.com/)


## License

The MIT License (MIT)

Copyright (c) 2016 Jorge Moreno ([@alterebro](https://twitter.com/alterebro))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
