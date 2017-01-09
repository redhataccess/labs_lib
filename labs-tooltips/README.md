# packaged labs-tooltips

Popover tooltips.
# Usage

Add `ngToolTips` as a dependency for your app:

```javascript
define(['labs-tooltips'], function () {
    "use strict";
    var module = angular.module('app.main', ['ngToolTips']);
    return module;
});
```
Use `tooltip` directives on your page:

HTML:
```
<tooltip class="fa fa-question-circle ng-scope" id="yourId" ng-mouseenter="style={cursor:'pointer'};manualShowPopover('yourId');" ng-mouseleave="style={cursor:'auto'};manualHidePopover('yourId');" ng-style="style" popover-placement="top" popover-title="" popover-trigger="show" popover="yourContent" style="cursor: auto;"></tooltip>
```

HAML:
```
%tooltip.fa.fa-question-circle{"id"=>"yourId","ng-style"=>"style","ng-mouseenter"=>"style={cursor:'pointer'};manualShowPopover('yourId');","ng-mouseleave"=>"style={cursor:'auto'};manualHidePopover('yourId');","popover"=>"yourContent","popover-title"=>"","popover-trigger"=>"show","popover-placement"=>"top"}
```
