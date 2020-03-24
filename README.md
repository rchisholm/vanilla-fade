# VanillaFader

VanillaFader is a library for fade-in and fade-out using vanilla JavaScript, requiring no third-party libraries.

## Usage

To use VanillaFader, first, embed the script in HTML:
```html
<script type='text/javascript' src='vanilla-fader.js'></script>
```
Then, optionally, define custom options:
```javascript
var options = {
    waitTime: 0,
    fadeTime: 500,
    mode: 'display',
    display: 'flex'
};
```
Then, call the fade functions:
```javascript
// using an element's id with default options
vFadeOut('element-id-1');

// using the element itself with default options
vFadeIn(document.getElementById('element-id-1'));

// adding a callback with default options
vFadeReplace('element-id-2', 'element-id-3', function(){
    console.log('fade complete');
});

// using the custom options with no callback
vFadeOut(element, null, options)
```
Or, instead, create a `VanillFader` with `createFader` and call the class methods:
```javascript
var fader = createFader(options);

fader.fadeOut('element-id-1');
fader.fadeIn(document.getElementById('element-id-1'));
fader.fadeReplace('element-id-2', 'element-id-3', function(){
    console.log('fade complete');
});
```
The first method (`vFadeIn`, `vFadeOut`, `vFadeReplace`) is best for calling just a few times, or with a variety of options; if you are calling the methods many times, all using the same options, use the second method (`fader.fadeOut`, `fader.fadeIn`, `fader.fadeReplace`).

## Features

### Options
`options` is an optional parameter. If omitted, default values are used.
| Option | Type | Description | Default |
| --- | --- | --- | --- |
| waitTime | number | time in ms to wait before executing | 0 |
| fadeTime | number | time in ms for the fade effect to complete | 250 |
| mode | string | type of fade-out; 'display' or 'visibility' | 'display' |
| display | string | if mode = 'display', display the target should have; 'block', 'flex', etc. | 'block' |

#### Sample of all options
```javascript
var options = {
    waitTime: 500,
    fadeTime: 1000,
    mode: 'display',
    display: 'flex'
};
```

### Fade Targets
Targets for fade effects can be declared via the element's id or the element itself.
```javascript
fader.fadeOut('element-id-1');
```
```javascript
fader.fadeOut(document.getElementById('element-id-1'));
```

### Callbacks
Fade functions can optionally be passed a callback argument to execute after the fade effect is complete.
```javascript
fader.fadeOut('element-id', function() { console.log('callback has been called.'); });
```

### Hidden Elements
Elements that are faded out by these methods become 'faded-out'; the way in which it is 'faded-out' depends on the option `options.mode`. If `options.mode` is set to `visibility`, the faded-out element gains the style `visibility: hidden`. If `options.mode` is set to `display` (the default value), faded-out elements gain the style `display: none`. If a fade method is called on an element, the process depends upon whether the element is already 'faded-out', which is determined by `options.mode`.

## Functions

### Class Methods
Class methods can be called from a `VanillaFader` instance, and use the options passed into the `VanillaFader` object when it is created.

#### fadeOut
After the wait time, fade the target element out, then optionally execute a callback. If element is already faded-out, the callback is called after the wait time.
```javascript
VanillaFader.fadeOut: (fadeOutTarget: any, callback?: Function, skipWait?: boolean) => void
```
```javascript
fader.fadeOut(
    'element-id-1', 
    function() { 
        console.log('fadeOut complete.'); 
    }
);
```

#### fadeIn
After the wait time, fade the target element in, then optionally execute a callback. If element is already faded-in, the callback is called after the wait time.
```javascript
VanillaFader.fadeIn: (fadeInTarget: any, callback?: Function, skipWait?: boolean) => void
```
```javascript
fader.fadeIn(
    'element-id-1', 
    function() { 
        console.log('fadeIn complete.'); 
    }
);
```

#### fadeReplace
After the wait time, fade the first target element out, then fade the second target element in, then optionally execute a callback. If first element is already faded-out, just fade the second element in and then call the callback. If the second element is already faded-in, just fade the first element in, then call the callback. If the first element is already faded-out, and the second element is already faded-in, the callback is called after the wait time.
```javascript
VanillaFader.fadeReplace: (fadeOutTarget: any, fadeInTarget: any, callback?: Function) => void
```
```javascript
fader.fadeReplace(
    'element-id-1', 
    'element-id-2', 
    function() { 
        console.log('fadeReplace complete.'); 
    }
);
```

### Standalone Functions
Standalone functions can be called without a `VanillaFader` instance, and they are passed their own options when they are called.

#### vFadeOut
Calls `VanillaFader.fadeOut` with custom options.
```javascript
function vFadeOut(fadeOutTarget: any, callback?: () => void, options?: {}): void
```
```javascript
vFadeOut(
    'element-id-1', 
    function() { 
        console.log('fadeOut complete.'); 
    },
    {
        waitTime: 100,
        mode: 'visibility'
    }
);
```

#### vFadeIn
Calls `VanillaFader.fadeIn` with custom options.
```javascript
function vFadeIn(fadeInTarget: any, callback?: () => void, options?: {}): void
```
```javascript
vFadeIn(
    'element-id-1', 
    function() { 
        console.log('fadeIn complete.'); 
    },
    {
        fadeTime: 500,
        mode: 'display',
        display: 'inline-block'
    }
);
```

#### vFadeReplace
Calls `VanillaFader.fadeReplace` with custom options.
```javascript
function vFadeReplace(fadeOutTarget: any, fadeInTarget: any, callback?: () => void, options?: {}): void
```
```javascript
vFadeIn(
    'element-id-1',
    'element-id-2',
    function() { 
        console.log('fadeReplace complete.'); 
    },
    {
        waitTime: 100,
        fadeTime: 500
    }
);
```

## Properties
Properties can be accessed after the VanillaFader has been instantiated:

```javascript
console.log(fader.fadeTime);
// 250

console.log(fader);
// VanillaFader {...}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[ISC](https://choosealicense.com/licenses/isc/)
