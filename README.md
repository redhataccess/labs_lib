# packaged labs_lib

Directives and services for Labs apps in the Labs space for rapid iteration.
# Usage

# Rails app
Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/labs_lib/lib-loader.js"></script>
```

# NodeJS app
Add labs_lib files to your Gruntfile.js so that they can be loaded.

```
'<%= yeoman.client %>/bower_components/labs_lib/**/*.js',
'!<%= yeoman.client %>/bower_components/labs_lib/lib-loader.js'

'{.tmp,<%= yeoman.client %>}/bower_components/labs_lib/**/*.js',
'!{.tmp,<%= yeoman.client %>}/bower_components/labs_lib/lib-loader.js'
```

# Module Usage

Refer to README of each folder for usage of each module.

