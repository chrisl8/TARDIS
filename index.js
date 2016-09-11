'use strict';
/*
 * Connect button between GROUND and numbered pin.
 * No ressistor is required when using 'isPullup: tue'
 * because the Arduino has a built in 'pull-up' function.
 */

// http://johnny-five.io/examples/button-pullup/
// The `isPullup` button option enables the pullup
// resistor on the pin and automatically sets the
// `invert` option to true

// In this circuit configuration, the LED would always
// be on without the pullup resistor enabled

// For more info on pullup resistors, see:
// http://arduino.cc/en/Tutorial/InputPullupSerial
// http://arduino.cc/en/Tutorial/DigitalPins
// https://learn.sparkfun.com/tutorials/pull-up-resistors

/* All sounds from:
 http://www.maddmansrealm.com/drwho/tardis/sounds/sounds.htm
 */

const exec = require('child_process').exec;
const tardisFolder = process.env.HOME + '/.tardis/sounds/';

var five = require("johnny-five"),
  button, led;

five.Board().on("ready", function() {

  button = new five.Button({
    pin: 2,
    isPullup: true
  });

  led = new five.Led(13);

  button.on("down", function(value) {
    led.on();
    let sound = tardisFolder + 'pilottakeoff.wav'
    exec('/usr/bin/mplayer -quiet ' + sound + ' > /dev/null 2>&1');
  });

  button.on("up", function() {
    led.off();
  });

});
