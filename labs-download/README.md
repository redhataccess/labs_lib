# packaged labs-download

Download with pure AngularJS.
# Usage

Add `ngDownload` as a dependency for your app:

```javascript
define(['labs-download'], function () {
    "use strict";
    var module = angular.module('app.main', ['ngDownload']);
    return module;
});
```
Before triggering download element on page, send data to it in your controller:
```javascript
$timeout(function(){
    $scope.$emit('download-ready', 'data');
});
```
Use `filedownload` attribute with directives a on the page:

HTML:
```
<a filedownload filename="test.sh">download</a>
```

HAML:
```
%a{"filedownload"=>"", "filename"=>"test.sh"} download
```
