# packaged angular-fixed-header-table

The package allows to fix a header and the first column of a table when data are overflow.
# Usage

Add `ngFixedHeaderTable` as a dependency for your app:

```javascript
define(['angular-fixed-header-table'], function () {
    "use strict";
    var module = angular.module('app.main', ['ngFixedHeaderTable']);
    return module;
});
```

Use `fixed-header-table` attribute with table:

HTML:
```
<table id="tableId" fixed-header-table fixed="both" divheight="100%" divwidth="100%" headercolor="#f7f7f7">
```

HAML:
```
%table{"id"=>"tableId", "fixed-header-table"=>"", "fixed"=>"both", "divWidth"=>"100%", "divHeight"=>"100%", "headerColor"=>"#f7f7f7"}
```
# Attribute
```
id: Required.
fixed-header-table: Required.
fixed (Optional): The attribute tells to fix the first row or column or both. The value can be 'both/col/row'. Default is 'both'.
divWidth (Optional): Adjusted div width. Default is '100%'.
divHeight (Optional): Adjusted div height. Default is '100%'.
headerColor (Optional): Header color. Default is '#f7f7f7'
```