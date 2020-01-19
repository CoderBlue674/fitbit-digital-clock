import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";


let myClock = document.getElementById("myClock");
let date = document.getElementById("date");
let steps = document.getElementById("steps");
let batteryPower = document.getElementById("batteryPower");
let heartrate = document.getElementById("heartrate");
let Amorpm = document.getElementById("Amorpm");


if (HeartRateSensor) {
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     heartrate.text = hrm.heartRate
   });
   hrm.start();
}


clock.granularity = 'seconds';

clock.ontick = function(evt) {
  let stepsValue = (userActivity.today.adjusted["steps"] || 0);
  let stepsString = stepsValue;
  steps.text = stepsString;
  batteryPower.text = Math.floor(battery.chargeLevel) + "%"
  date.text = (evt.date.getMonth()+1) + '/' + evt.date.getDate() + '/' + evt.date.getFullYear()
  let hours = ("0" + evt.date.getHours()).slice(-2)
  let amorpm = "0"
  if (hours > '0' && hours < 12) {
    hours%12
    amorpm = "AM"
  } else if (hours > 12) {
    hours = hours%12
    amorpm = "PM"
  }
  let minutes = ("0" + evt.date.getMinutes()).slice(-2)
  myClock.text = (hours + ":" + minutes)
  Amorpm.text = amorpm
};
};
