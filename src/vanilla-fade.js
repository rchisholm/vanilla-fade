/* jshint esversion:6 */

class VanillaFader {

    constructor(options = {}) {
        // constants
        this.defaultFadeTime = 250;
        this.xDirections = ['left', 'right', 'random'];
        this.yDirections = ['up', 'down', 'random'];
        this.zDirections = ['in', 'out', 'random'];
        this.modes = ['display', 'visibility'];
        this.intervalTime = 20;

        /**
         * @param {{waitTime: number, fadeTime: number, mode: string, directionX: string, directionY: string, directionZ: string, display: any}} options options object for fade:
         * options.waitTime: time in ms to wait before executing;
         * options.fadeTime: time in ms for the fadeIn/fadeOut effects;
         * options.mode: type of fade-out; 'display' or 'visibility';
         * options.directionX: x direction for the fading out element to fly away if position:aboslute; 'left', 'right', 'random';
         * options.directionY: y direction for the fading out element to fly away if position:aboslute; 'up', 'down', 'random';
         * options.directionZ: direction for the fading element to zoom if position:absolute; 'in', 'out', 'random';
         * options.display: display the target should have; 'block', 'flex', etc;
         */
        this.setOptions = (options = {}) => {
            this.waitTime = typeof options.waitTime === 'number' ? options.waitTime : null;
            this.fadeTime = typeof options.fadeTime === 'number' ? options.fadeTime : this.defaultFadeTime;
            this.mode = this.modes.includes(options.mode) ? options.mode : 'display';
            this.directionX = this.xDirections.includes(options.directionX) ? options.directionX : null;
            this.directionY = this.yDirections.includes(options.directionY) ? options.directionY : null;
            this.directionZ = this.zDirections.includes(options.directionZ) ? options.directionZ : null;
            this.display = typeof options.display === 'string' ? options.display : 'block';
            return this;
        };

        /**
         * @param {any} fadeOutTarget element to fade out, or its id
         * @param {function} callback function executed when fade is finished
         * @param {object} options options for fade configuration
         */
        this.fadeOut = (fadeOutTarget, callback = () => {}, options = null) => {

            // set options
            if (options) {
                this.setOptions(options);
            }

            // check callback
            if (typeof callback !== 'function') {
                callback = () => {};
            }

            // check target
            if (typeof fadeOutTarget === 'string') {
                fadeOutTarget = document.getElementById(fadeOutTarget);
            }

            var isVisible = this.mode === 'visibility' ? (element) => {
                return element.style.visibility !== "hidden";
            } : (element) => {
                return element.style.display !== "none";
            };
            var makeInvisible = this.mode === 'visibility' ? (element) => {
                element.style.visibility = "hidden";
            } : (element) => {
                element.style.display = "none";
            };

            if (fadeOutTarget) {
                if (isVisible(fadeOutTarget)) {
                    // set zoom/direction
                    if (this.directionX) {
                        if (this.directionX === 'random') {
                            this.directionX = ['right', 'left', null][Math.floor(Math.random() * 3)];
                        }
                        var xInterval;
                        switch (this.directionX) {
                            case 'right':
                                xInterval = 1;
                                break;
                            case 'left':
                                xInterval = -1;
                                break;
                        }
                    }
                    if (this.directionY) {
                        if (this.directionY === 'random') {
                            this.directionY = ['up', 'down', null][Math.floor(Math.random() * 3)];
                        }
                        var yInterval;
                        switch (this.directionY) {
                            case 'up':
                                yInterval = -1;
                                break;
                            case 'down':
                                yInterval = 1;
                                break;
                        }
                    }
                    if (this.directionZ) {
                        if (this.directionZ === 'random') {
                            this.directionZ = ['in', 'out', null][Math.floor(Math.random() * 3)];
                        }
                        var zInterval;
                        switch (this.directionZ) {
                            case 'in':
                                zInterval = 0.005;
                                break;
                            case 'out':
                                zInterval = -0.005;
                                break;
                        }
                    }
                    if (this.waitTime) {
                        setTimeout(() => {
                            this.waitTime = false;
                            vFadeOut(fadeOutTarget, callback);
                        }, this.waitTime);
                    } else {
                        var opacityInterval = this.intervalTime / this.fadeTime;
                        fadeOutTarget.style.opacity = 1;
                        var fadeOutEffect = setInterval(() => {
                            if (fadeOutTarget.style.opacity > 0) {
                                // fade out a little bit
                                fadeOutTarget.style.opacity -= opacityInterval;
                                // move a little bit in directions
                                if (this.directionX) {
                                    fadeOutTarget.style.left = (parseFloat(fadeOutTarget.style.left.replace('px', '')) + xInterval) + "px";
                                }
                                if (this.directionY) {
                                    fadeOutTarget.style.top = (parseFloat(fadeOutTarget.style.top.replace('px', '')) + yInterval) + "px";
                                }
                                if (this.directionZ) {
                                    if (!fadeOutTarget.style.transform) {
                                        fadeOutTarget.style.transform = 'scale(1)';
                                    }
                                    fadeOutTarget.style.transform = 'scale(' + (parseFloat(fadeOutTarget.style.transform.replace('scale(', '').replace(')', '')) + zInterval) + ')';
                                }
                            } else {
                                clearInterval(fadeOutEffect);
                                makeInvisible(fadeOutTarget);
                                fadeOutTarget.style.top = 0;
                                fadeOutTarget.style.left = 0;
                                fadeOutTarget.style.transform = 'scale(1)';
                                callback();
                            }
                        }, this.intervalTime);
                    }
                } else {
                    callback();
                    // setTimeout(callback, options.fadeTime);
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
        this.fadeIn = (fadeInTarget, callback = () => {}, options = null) => {

            // set options
            if (options) {
                this.setOptions(options);
            }

            // check callback
            if (typeof callback !== 'function') {
                callback = () => {};
            }

            // check target
            if (typeof fadeInTarget === 'string') {
                fadeInTarget = document.getElementById(fadeInTarget);
            }

            // option values
            var isVisible = this.mode === 'visibility' ? (element) => {
                return element.style.visibility !== "hidden";
            } : (element) => {
                return element.style.display !== "none";
            };
            var makeVisible = this.mode === 'visibility' ? (element) => {
                element.style.visibility = "visible";
            } : (element) => {
                element.style.display = this.display;
            };

            if (fadeInTarget) {
                if (!isVisible(fadeInTarget)) {
                    if (this.waitTime) {
                        setTimeout(() => {
                            this.waitTime = false;
                            vFadeIn(fadeInTarget, callback);
                        }, this.waitTime);
                    } else {
                        if (fadeInTarget) {
                            var opacityInterval = this.intervalTime / this.fadeTime;
                            fadeInTarget.style.opacity = 0;
                            makeVisible(fadeInTarget);
                            var fadeInEffect = setInterval(() => {
                                if (fadeInTarget.style.opacity < 1) {
                                    fadeInTarget.style.opacity = parseFloat(fadeInTarget.style.opacity) + parseFloat(opacityInterval);
                                } else {
                                    clearInterval(fadeInEffect);
                                    callback();
                                }
                            }, this.intervalTime);
                        }
                    }
                } else {
                    callback();
                    // setTimeout(callback, options.fadeTime);
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
        this.fadeReplace = (fadeOutTarget, fadeInTarget, callback = () => {}, options = null) => {
            // set options
            if (options) {
                this.setOptions(options);
            }

            if (this.waitTime) {
                setTimeout(() => {
                    this.waitTime = false;
                    vFadeReplace(fadeOutTarget, fadeInTarget, callback);
                }, this.waitTime);
            } else {
                vFadeOut(fadeOutTarget, () => {
                    vFadeIn(fadeInTarget, callback);
                });
            }
        };

        // set options
        this.setOptions(options);
    }
}


function vFadeOut(fadeOutTarget, callback = () => {}, options = {}) {
    var vFader = new VanillaFader(options);
    vFader.fadeOut(fadeOutTarget, callback);

    // // alt version:
    // var vFader = new VanillaFader();
    // vFader.fadeOut(fadeOutTarget, callback, options);
}

function vFadeIn(fadeInTarget, callback = () => {}, options = {}) {
    var vFader = new VanillaFader(options);
    vFader.fadeIn(fadeInTarget, callback);

    // // alt version:
    // var vFader = new VanillaFader();
    // vFader.fadeIn(fadeInTarget, callback, options);
}

function vFadeReplace(fadeOutTarget, fadeInTarget, callback = () => {}, options = {}) {
    var vFader = new VanillaFader(options);
    vFader.fadeReplace(fadeOutTarget, fadeInTarget, callback);

    // // alt version:
    // var vFader = new VanillaFader();
    // vFader.fadeReplace(fadeOutTarget, fadeInTarget, callback, options);
}