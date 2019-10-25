/**
 * Calibration blocks
 */
//% weight=48 color=#FF622E icon="\uf0ad" block="Calibrate"
//% groups="['Calibration', 'Setup']"
namespace calibrate {
    /**
     * Move the micro:car forwards for 5 seconds then measure and see how straight it goes
     * no input
     */
    //% weight=96
    //% block="forward calibrate"
    //% group="Calibration"
    export function forward() {
        BitKit.setMotormoduleSpeed(255, 255);
        basic.pause(8000); //8 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Rotate the micro:car for 5 seconds then measure how far it got
    * no input
    */
    //% weight=96
    //% block="rotation calibrate"
    //% group="Calibration"
    export function rotates() {
        BitKit.setMotormoduleSpeed(-255, 255);
        basic.pause(10000); //5 seconds
        BitKit.setMotormoduleSpeed(0, 0);
    }
}

/**
 * Grid Blocks
 */
//% weight=48 color=#E23405 icon="\uf009" block="Grid"
//% groups="['Setup', 'Grid']"
namespace grid {
    let rcal = 1;
    let fcal = 1;
    let flcal = 0;
    let frcal = 0;
    /**
    * Move the micro:car forwards for 5 seconds then measure and see how straight it goes
    * no input
    */
    //% weight=96
    //% block="forward one space"
    //% group="Grid"
    export function forward() {
        BitKit.setMotormoduleSpeed(255 - flcal, 255 - frcal);
        basic.pause(2000); //2 seconds???
        BitKit.setMotormoduleSpeed(0, 0);
    }
    /**
    * Turn Right
    * no input
    */
    //% weight=96
    //% block="turn right"
    //% group="Grid"
    export function turnright() {
        BitKit.setMotormoduleSpeed(255, -255);
        basic.pause(2000); //2 seconds???
        BitKit.setMotormoduleSpeed(0, 0);
    }
    /**
    * Turn Right
    * no input
    */
    //% weight=96
    //% block="turn left"
    //% group="Grid"
    export function turnleft() {
        BitKit.setMotormoduleSpeed(-255, 255);
        basic.pause(2000); //2 seconds???
        BitKit.setMotormoduleSpeed(0, 0);
    }

    /**
    * Red light on coral
    * mimic the colour of the ground under the bot.
    * eg. see red, show red, see blue, show blue
    */
    //% weight=96
    //% block="on coral show red"
    //% group="Grid"
    export function onAUVColour(handler: () => void) {
        let event = ColorEvent.R; //colour is red
        const eventId = driver.subscribeToEventSource(SensorType.Liner);
        control.onEvent(eventId, event, handler);
        //could try changing handler to show red? Neopixel, pin0 red??
    }

    /**
    * Calibration setup
    * two inputs
    */
    //% weight=96
    //% block="setup f:|%fcal r:|%rcal"
    //% group="Setup"
    export function setup(forwardinput: number, rotationinput: number) {
        rcal = rotationinput * 1; //dark magic
        if (forwardinput > 0) {
            flcal = forwardinput;
        }
        else if (forwardinput < 0) {
            frcal = -forwardinput;
        }
        else {
            //error please enter number
        }
    }
}
/**
 * Digger Blocks
 */
//% weight=48 color=#ffb612 icon="\uf0e7" block="Digger"
//% groups="['funfun']"
namespace digger {
    /**
    * Make explosion movement and sound
    * rattle motors, make noise on speaker, show pretty picture on face
    */
    //% weight=96
    //% block="EXPLODE"
    //% group="funfun"
    export function explode() {
        let strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)
        let timer = 5
        for (let index = 0; index <= timer; index++) {
            led.plot(2, 2)
            BitKit.setMotormoduleSpeed(-255, 255)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause((timer - index) * 40)
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            basic.pause((timer - index) * 40)
            basic.clearScreen()
            BitKit.setMotormoduleSpeed(255, -255)
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause((timer - index) * 40)
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause((timer - index) * 40)
        }
        BitKit.setMotormoduleSpeed(0, 0);
        music.playTone(988, 100);
    }
}

enum SensorType {
    //% block=Sound Sensor
    Sound = 6,
    //% block=Gesture Sensor
    Gesture = 0x0c,
    //% block=Knob
    Knob = 0x10,
    //% block=Color Line Follower
    Liner = 0x27

};

enum ColorEvent {
    //% block=black
    Black = 1,
    //% block=red
    R = 2,
    //% block=green
    G = 3,
    //% block=blue
    B = 4,
    //% block=others
    Other = 5
};

enum LinerEvent {
    //% block=middle
    Middle = 1,
    //% block=left
    Left = 3,
    //% block=leftmost
    Leftmost = 4,
    //% block=right
    Right = 5,
    //% block=rightmost
    Rightmost = 6,
    //% block=lost
    Lost = 2
};

enum MotorTpye {
    //% block=servo
    Servo = 0x24,
    //% block=wheel
    Wheel = 0x28
};

enum SpeedTpye {
    //% block=slow
    Slow = 120,
    //% block=medium
    Medium = 200,
    //% block=fast
    Fast = 255
};

enum DirectionTpye {
    //% block=forward
    Forward = 1,
    //% block=backward
    Backward = 2,
    //% block=left
    Left = 3,
    //% block=right
    Right = 4,
    //% block=clockwise
    Clockwise = 5,
    //% block=counter-clockwise
    Anticlockwise = 6
};

enum MotionTpye {
    //% block="random direction"
    Random = 0,
    //% block=automatically
    Auto = 1
};

