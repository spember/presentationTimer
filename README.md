PresentationTimer
==========

Adds a small timer to the lower-left hand corner of your screen (alterable with css, of course).

I've been making presentations in HTML lately, as opposed to using your typical PowerPoint or Keynote. Wanting a fun way to time myself, I made this little toy script. 

Not much to it, really. 

## Usage

Easy. Include the .js and .css file in your page, and call: 

		presentationTimer.init(); 

It requires no additional JS libraries (e.g. jquery, prototype or zepto). 

The timer will count up, and once the time is within a certain limit (default 10 minutes, with a two minute warning), the script text should change to red (adds a class called 'outta-time'). These defaults can be changed by passing an options object to the init method, like so:

		presentationTimer.init({limit:1200, warningRange:300});

Note that those times are in seconds (so 20 minute limit with a 5 minute warning).

Clicking on the timer will reset it back to 0.


