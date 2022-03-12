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

    // checks time now vs time of block & applies correct colors
    if (moment().isAfter(time)) {
        $(schedule).addClass("past");
    } else if (moment().isBefore(time)) {
        $(schedule).addClass("future");
    } else {
        $(schedule).addClass("present");
    }
}

var loadTasks = function() {
    timeBlocks.each(function() {
        var hrID = $(this).attr("id");
        var task = localStorage.getItem(hrID);

        if (task) {
            $("#" + hrID).find(".col-10").val(task);
        }
    })
}

// handle save button clicks
$(".saveBtn").click(function() {
    // get parent id attribute
    var hrID = $(this).closest(".time-block").attr("id");
    
    // get task text
    var task = $("#"+hrID).find(".col-10").val();
    saveTask(hrID, task);
})

// save functionality
var saveTask = function(hour, text) {
    localStorage.setItem(hour, text);
}

// run auditTime every 5 minutes
setInterval(function() {
    timeBlocks.each(function(index, el) {
        auditTime(el);
    })
}, (1000 * 60 * 5));

// checks time to apply colors on initial page load
timeBlocks.each(function(index, el) {
    auditTime(el);
})

// loads any tasks on inital page load / reload
loadTasks();