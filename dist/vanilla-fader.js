"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jshint esversion:6 */
var VanillaFader = function VanillaFader() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, VanillaFader);

  // constants
  this.defaultFadeTime = 250;
  this.modes = ['display', 'visibility'];
  this.intervalTime = 20;
  /**
   * @param {{waitTime: number, fadeTime: number, mode: string, display: string}} options options object for fade:
   * options.waitTime: time in ms to wait before executing;
   * options.fadeTime: time in ms for the fadeIn/fadeOut effects;
   * options.mode: type of fade-out; 'display' or 'visibility';
   * options.display: display the target should have; 'block', 'flex', etc;
   */

  this.setOptions = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // defaults
    _this.waitTime = null;
    _this.fadeTime = _this.defaultFadeTime;
    _this.mode = 'display';
    _this.display = 'block';

    if (options.waitTime) {
      _this.waitTime = typeof options.waitTime === 'number' ? options.waitTime : null;
    }

    if (options.fadeTime) {
      _this.fadeTime = typeof options.fadeTime === 'number' ? options.fadeTime : _this.defaultFadeTime;
    }

    if (options.mode) {
      _this.mode = _this.modes.includes(options.mode) ? options.mode : 'display';
    }

    if (options.display) {
      _this.display = typeof options.display === 'string' ? options.display : 'block';
    }
  };
  /**
   * @param {any} fadeOutTarget element to fade out, or its id
   * @param {function} callback function executed when fade is finished
   * @param {object} options options for fade configuration
   */


  this.fadeOut = function (fadeOutTarget) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    // set options
    if (options) {
      _this.setOptions(options);
    } // check callback


    if (typeof callback !== 'function') {
      callback = function callback() {};
    } // check target


    if (typeof fadeOutTarget === 'string') {
      fadeOutTarget = document.getElementById(fadeOutTarget);
    }

    var isVisible = _this.mode === 'visibility' ? function (element) {
      return element.style.visibility !== "hidden";
    } : function (element) {
      return element.style.display !== "none";
    };
    var makeInvisible = _this.mode === 'visibility' ? function (element) {
      element.style.visibility = "hidden";
    } : function (element) {
      element.style.display = "none";
    };

    if (fadeOutTarget) {
      if (isVisible(fadeOutTarget)) {
        if (_this.waitTime) {
          setTimeout(function () {
            _this.waitTime = null;

            _this.fadeOut(fadeOutTarget, callback);
          }, _this.waitTime);
        } else {
          var opacityInterval = _this.intervalTime / _this.fadeTime;
          fadeOutTarget.style.opacity = 1;
          var fadeOutEffect = setInterval(function () {
            if (fadeOutTarget.style.opacity > 0) {
              // fade out a little bit
              fadeOutTarget.style.opacity -= opacityInterval;
            } else {
              clearInterval(fadeOutEffect);
              makeInvisible(fadeOutTarget);
              callback();
            }
          }, _this.intervalTime);
        }
      } else {
        callback(); // setTimeout(callback, options.fadeTime);
      }
    } else {
      console.log('fadeOut error: no such element exists.');
    }
  };
  /**
   * @param {any} fadeInTarget element to fade in, or its id
   * @param {function} callback function executed when fade is finished
   * @param {object} options options for fade configuration
   */


  this.fadeIn = function (fadeInTarget) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    // set options
    if (options) {
      _this.setOptions(options);
    } // check callback


    if (typeof callback !== 'function') {
      callback = function callback() {};
    } // check target


    if (typeof fadeInTarget === 'string') {
      fadeInTarget = document.getElementById(fadeInTarget);
    } // option values


    var isVisible = _this.mode === 'visibility' ? function (element) {
      return element.style.visibility !== "hidden";
    } : function (element) {
      return element.style.display !== "none";
    };
    var makeVisible = _this.mode === 'visibility' ? function (element) {
      element.style.visibility = "visible";
    } : function (element) {
      element.style.display = _this.display;
    };

    if (fadeInTarget) {
      if (!isVisible(fadeInTarget)) {
        if (_this.waitTime) {
          setTimeout(function () {
            _this.waitTime = false;

            _this.fadeIn(fadeInTarget, callback);
          }, _this.waitTime);
        } else {
          if (fadeInTarget) {
            var opacityInterval = _this.intervalTime / _this.fadeTime;
            fadeInTarget.style.opacity = 0;
            makeVisible(fadeInTarget);
            var fadeInEffect = setInterval(function () {
              if (fadeInTarget.style.opacity < 1) {
                fadeInTarget.style.opacity = parseFloat(fadeInTarget.style.opacity) + parseFloat(opacityInterval);
              } else {
                clearInterval(fadeInEffect);
                callback();
              }
            }, _this.intervalTime);
          }
        }
      } else {
        callback(); // setTimeout(callback, options.fadeTime);
      }
    } else {
      console.log('fadeIn error: no such element exists: ');
    }
  };
  /**
   * @param {any} fadeOutTarget element to fade out, or its id
   * @param {any} fadeInTarget element to fade in, or its id
   * @param {function} callback function executed when fade is finished
   * @param {object} options options for fade configuration
   */


  this.fadeReplace = function (fadeOutTarget, fadeInTarget) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    // set options
    if (options) {
      _this.setOptions(options);
    }

    if (_this.waitTime) {
      setTimeout(function () {
        _this.waitTime = null;

        _this.fadeReplace(fadeOutTarget, fadeInTarget, callback);
      }, _this.waitTime);
    } else {
      _this.fadeOut(fadeOutTarget, function () {
        _this.fadeIn(fadeInTarget, callback);
      });
    }
  }; // set options


  this.setOptions(options);
};

function createFader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new VanillaFader(options);
}

function vFadeOut(fadeOutTarget) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var vFader = new VanillaFader(options);
  vFader.fadeOut(fadeOutTarget, callback); // // alt version:
  // var vFader = new VanillaFader();
  // vFader.fadeOut(fadeOutTarget, callback, options);
}

function vFadeIn(fadeInTarget) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var vFader = new VanillaFader(options);
  vFader.fadeIn(fadeInTarget, callback); // // alt version:
  // var vFader = new VanillaFader();
  // vFader.fadeIn(fadeInTarget, callback, options);
}

function vFadeReplace(fadeOutTarget, fadeInTarget) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var vFader = new VanillaFader(options);
  vFader.fadeReplace(fadeOutTarget, fadeInTarget, callback); // // alt version:
  // var vFader = new VanillaFader();
  // vFader.fadeReplace(fadeOutTarget, fadeInTarget, callback, options);
}