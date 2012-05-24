/*
    This small little toy script adds a little timer to your page. Useful for tracking your personal time, say while
    giving a presentation (assuming said presentation is in HTML as opposed to something like PowerPoint (ugh)

    Thus the name.

    Be sure to include the separate css file in your page, as well
 */
var presentationTimer = new function () {

    this.el;
    this.timeSlots;
    this.startTime = undefined;

    this.options = {
        limit: 600,
        warningRange: 120
    };


    // Creates the markup for the timer. Not much to it
    this.generateMarkup = function () {
        this.el = document.createElement("div");
        this.el.id = "presentationTimer";
        this.el.innerHTML = "<span>00</span>:<span>00</span>:<span>00</span>";
        this.timeSlots = this.el.getElementsByTagName("span");
        document.body.appendChild(this.el);
    };

    // binds all events on our element
    this.bindEvents = function () {
        var self = this;
        self.el.onclick = function () {
            self.reset.call(self);
        }
    };

    // formats time and adds a padding 0 if the value is less than 10
    this.getFormattedTime = function (val, divisor, mod) {
        var temp = Math.floor(val/divisor) % mod;
        if (temp < 10) {
            return "0"+temp.toString();
        }
        return temp.toString();

    };

    //quick check to see if a class name has been added to our base el
    this.hasClass = function(name) {
        return this.el.className.indexOf(name) > -1;
    };

    this.reset = function () {
        var self  = this;
        this.startTime = new Date();
        this.el.classList.remove("outta-time");
        this.setSeconds(0);
        this.setMinutes(0);
        this.setHours(0);
    };

    this.updateTimeDisplay = function () {
        var self = this,
            // convert to seconds from millis
            current = Math.floor(Math.abs(new Date() - this.startTime) / 1000);

        if (self.options.limit && (self.options.limit - current) < self.options.warningRange && !self.hasClass("outta-time")) {
            self.el.classList.add("outta-time");
        }
        this.setSeconds(current);
        this.setMinutes(current);
        this.setHours(current);

        self.timeout = setTimeout(function () {
            self.updateTimeDisplay.call(self);
        }, 1000);

    };

    this.setSeconds = function (target) {
        this.timeSlots[2].innerHTML = this.getFormattedTime(target, 1, 60);
    };

    this.setMinutes = function (target) {
        this.timeSlots[1].innerHTML = this.getFormattedTime(target, 60, 60);
    };

    this.setHours = function (target) {
        this.timeSlots[0].innerHTML = this.getFormattedTime(target, 3600, 24);
    };

    this.init = function (options) {
        var self = this;
        this.generateMarkup();
        this.bindEvents();
        self.startTime = new Date();

        for (var attr in options) {
            this.options[attr] = options[attr];
        }


        self.timeout = setTimeout(function () {
            self.updateTimeDisplay.call(self);
        }, 1000);

    };
};