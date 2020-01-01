import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";


let myClock = document.getElementById("myClock");
let date = document.getElementById("date");
let steps = document.getElementById("steps");
let batteryPower = document.getElementById("batteryPower");
let heartrate = document.getElementById("heartrate")


if (HeartRateSensor) {
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     heartrate.text = "Heart Rate: " + hrm.heartRate
     if (hrm.heartRate < 90) {
       heartrate.text = heartrate.text + " (Step it up!)"
     } else {
       heartrate.text = heartrate.text + " (Nice Job!)"
     }
   });
   hrm.start();
}


clock.granularity = 'seconds';

clock.ontick = function(evt) {
  let stepsValue = (userActivity.today.adjusted["steps"] || 0);
  let stepsString = "Steps: " + stepsValue;
  steps.text = stepsString;
  batteryPower.text = "Battery: " + Math.floor(battery.chargeLevel) + "%"
  date.text = (evt.date.getMonth()+1) + '/' + evt.date.getDate() + '/' + evt.date.getFullYear()
  myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2) + ":" +
                      ("0" + evt.date.getSeconds()).slice(-2);
};
