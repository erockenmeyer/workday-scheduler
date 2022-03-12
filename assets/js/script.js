// variables
var today = moment().format('dddd, MMMM Do, YYYY');
var rightNow = moment().format('h A');
var timeBlocks = $(".time-block");

// show current day at top of page
$('#currentDay').html(today);

// apply correct colors to schedule based on time of day
var auditTime = function(hourEl) {
    // get div & textareas
    var hour = $(hourEl).find("div").text().trim();
    var schedule = $(hourEl).find("textarea");

    $(schedule).removeClass("past present future");

    // change into moment object
    var time = moment(hour, 'h A');

    if (moment().isAfter(time)) {
        $(schedule).addClass("past");
    } else if (moment().isBefore(time)) {
        $(schedule).addClass("future");
    } else {
        $(schedule).addClass("present");
    }
}

// run auditTime every 5 minutes
setInterval(function() {
    timeBlocks.each(function(index, el) {
        auditTime(el);
    })
}, (1000 * 60 * 5));

