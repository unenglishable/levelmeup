JavascriptCaveats
=================

No Block Scope
--------------

*  Javascript uses functional scope instead of block scope.  There are a couple of solutions...

 *  In order to preserve variable value of a dynamic input variable to a callback, use a wrapper function.

 *  forEach also has the correct scope on it since it is a function.


JSONObject is probably different from JSON
------------------------------------------

*  JSON.parse(string) does not return a JSONObject

 *  Therefore, the returned object does not have a .keys() method or a
    .forEach()

 *  The "correct" syntax for iteration is:

~~~javascript
var properties = JSON.parse(string);

for (var property in properties) {
  ...
}
~~~
