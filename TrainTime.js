
  // Initialize Firebase
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqfpgrouFXTogJjDkTNcdmhhy2Ru4lFjI",
    authDomain: "train-schedule-9275f.firebaseapp.com",
    databaseURL: "https://train-schedule-9275f.firebaseio.com",
    projectId: "train-schedule-9275f",
    storageBucket: "train-schedule-9275f.appspot.com",
    messagingSenderId: "1064106387058"
  };


  firebase.initializeApp(config);

var trainData = firebase.database();


$("#Submit").on("click", function(){

var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var firstTrain = $("#First-train-input").val().trim();
var frequency=  $("#frequency-input").val().trim();


var newTrain = {

name: trainName,
destination: destination,
firstTrain: firstTrain,
frequency: frequency
};

trainData.ref().push(newTrain);

alert("Train successfully added");



$("#train-name-input").val("");
$("#destination-input").val("");
$("#First-train-input").val("");
$("#frequency-input").val("");

return false;


});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

var tName = childSnapshot.val().name;
var tDestination = childSnapshot.val().destination;
var tFrequency = childSnapshot.val().frequency;
var tFirstTrain = childSnapshot.val().firstTrain;



var timeArr = tFirstTrain.split(":");
var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
var maxMoment = moment.max(moment(), trainTime);
var tMinutes;
var tArrival;


if (maxMoment === trainTime) {
 
 tArrival = traintime.format("hh:mm A");
 tMinutes = trainTime.diff(moment(), "minutes");
} else {


var differenceTimes = moment().diff(trainTime, "minutes");
var tRemainder = differenceTimes % tFrequency;
tMinutes = tFrequency - tRemainder;




tArrival = moment().add(tMinutes, "m").format("hh: mm A");
}


$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td></td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td><tr>");

});
