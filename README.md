# VanillaFade

VanillaFade is a library for fade-in and fade-out using vanilla JavaScript, requiring no third-party libraries.

## Usage

To use VanillaFade, first, embed the script in HTML:
```html
<script type='text/javascript' src='vanilla-fade.js'></script>
```
Then, simply call the functions on the elements you want to fade in and out.
```html
<script>
    // using the id
    vFadeIn('element-1');

    // using the element itself
    var element2 = document.getElementById('element-2');
    vFadeOut(element2);

    // adding a callback
    var notify = function() { console.log('fade complete.'); };
    vFadeReplace('element-3', 'element-4', notify);
    vFadeOut('element-4', notify);

</script>
```

## Methods

### vFadeOut
`vFadeOut` fades out the `fadeOutTarget`, decreasing opacity until the element is gone.

#### Parameters
| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| fadeOutTarget | string \| element | element to fade out, or its id (required) | N/A |
| callback | function | function executed when fade is finished | () => {} |
| options | object | options object for fade configuration | null |

#### Options
`options` is an optional parameter; its members configure the fade-out:
| Option | Type | Description | Default |
| --- | --- | --- | --- |
| waitTime | number | if defined, time in ms to wait before executing | false |
| fadeTime | number | time in ms for the fade effect to complete | 250 |
| mode | string | type of fade-out; 'display' or 'visibility' | 'display' |
| directionX | string | x direction for the fading out element to fly away if position:aboslute; 'left', 'right', 'random', or null | null |
| directionY | string | y direction for the fading out element to fly away if position:aboslute; 'up', 'down', 'random', or null | null |
| zoom | string | direction for the fading out element to zoom if position:aboslute; 'in', 'out', 'random', or null | null |


#### Sample of all parameters and options
```javascript
var options = {
    waitTime: 1000,
    fadeTime: 1000,
    mode: 'visibility',
    directionX: 'left',
    directionY: 'up',
    zoom: 'in'
};

vFadeOut(
    'div-1', 
    function() { console.log('fade complete'); },
    options
);
```

### vFadeIn
`vFadeIn` fades in the `fadeInTarget`, increasing opacity until the element is fully opaque.

#### Parameters
| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| fadeInTarget | string \| element | element to fade in, or its id (required) | N/A |
| callback | function | function executed when fade is finished | () => {} |
| options | object | options object for fade configuration | null |

#### Options
`options` is an optional parameter; its members configure the fade-in:
| Option | Type | Description | Default |
| --- | --- | --- | --- |
| waitTime | number | if defined, time in ms to wait before executing | false |
| fadeTime | number | time in ms for the fade effect to complete | 250 |
| mode | string | type of fade-in; 'display' or 'visibility' | 'display' |
| display | string | if mode = 'display', display the target should have; 'block', 'flex', etc. | 'block' |


#### Sample of all parameters and options
```javascript
var options = {
    waitTime: 1000,
    fadeTime: 1000,
    mode: 'display',
    display: 'flex'
};

vFadeIn(
    'div-2', 
    function() { console.log('fade complete'); },
    options
);
```

### vFadeReplace
`vFadeReplace` fades out the `fadeOutTarget`, then, once the fade is complete, fades in the `fadeInTarget`

#### Parameters
| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| fadeOutTarget | string \| element | element to fade out, or its id (required) | N/A |
| fadeInTarget | string \| element | element to fade in, or its id (required) | N/A |
| callback | function | function executed when fade is finished | () => {} |
| options | object | options object for fade configuration | null |

#### Options
`options` is an optional parameter; its members configure the fade-in and fade-out:
| Option | Type | Description | Default |
| --- | --- | --- | --- |
| waitTime | number | if defined, time in ms to wait before executing | false |
| fadeTime | number | time in ms for the fade effect to complete | 250 |
| mode | string | type of fade-in; 'display' or 'visibility' | 'display' |
| directionX | string | x direction for the fading out element to fly away if position:aboslute; 'left', 'right', 'random', or null | null |
| directionY | string | y direction for the fading out element to fly away if position:aboslute; 'up', 'down', 'random', or null | null |
| zoom | string | direction for the fading out element to zoom if position:aboslute; 'in', 'out', 'random', or null | null |
| display | string | if mode = 'display', display the fading out target should have; 'block', 'flex', etc. | 'block' |


#### Sample of all parameters and options
```javascript
var options = {
    waitTime: 1000,
    fadeTime: 1000,
    mode: 'display',
    directionX: 'left',
    directionY: 'up',
    zoom: 'in'
    display: 'inline-block'
};

vFadeReplace(
    'div-1',
    'div-2', 
    function() { console.log('fade complete'); },
    options
);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[ISC](https://choosealicense.com/licenses/isc/)
