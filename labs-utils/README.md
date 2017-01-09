# packaged labs-utils

The package defines common functions of Access Labs as AngularJS service.
# Usage

Add `labsUtils` as a dependency for your app:

```javascript
define(['labs-utils'], function () {
    "use strict";
    var module = angular.module('app.main', ['labsUtils']);
    return module;
});
```
Add `labsUtils` to the scope of your controller:
```
module.controller('mainCtrl', function ($scope) {
        $scope.labsUtils = labsUtils;
    }
);
```

