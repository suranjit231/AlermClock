let alermList = document.querySelector(".Alerm-List");
let alermId = 0;
let alermListArry = [];
let alarmInterval;

document.addEventListener("DOMContentLoaded", function() {
    const hourSelect = document.getElementById("hour");
    const minuteSelect = document.getElementById("minutes");
    const secondSelect = document.getElementById("seconds");

    // Populate hours (1-12)
    for (let i = 0; i <= 12; i++) {
        let option = document.createElement("option");
        let paddedValue = i < 10 ? "0" + i : i;
        option.text = paddedValue;
        option.value = paddedValue;
        hourSelect.add(option);
    }

    // Populate minutes and seconds (00-59)
    for (let i = 0; i < 60; i++) {
        let paddedValue = i < 10 ? "0" + i : i;
        addOption(minuteSelect, paddedValue);
        addOption(secondSelect, paddedValue);
    }

    // Event listener for Set Time button
    document.getElementById("setTimeBtn").addEventListener("click", function() {
        let hour = hourSelect.value;
        let minute = minuteSelect.value;
        let second = secondSelect.value;
        let timePeriod = document.getElementById("timePeriod").value;
        if(hour<1&&minute==0&&second==0){
            alert("Please select a valid time ");
            return ;
        }
        alermId++;
        showAlermList(alermId, hour, minute, second, timePeriod);
    });
});

// Function to add options to select element
function addOption(selectElement, value) {
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    selectElement.add(option);
}

// Function to display all alarms
function showAlermList(id, hour, minute, second, timePeriod) {
    let findAlermIndex = alermListArry.findIndex(alerm => alerm.id === id);
    if (findAlermIndex === -1) {
        alermListArry.push({
            id: id,
            hour: hour,
            minute: minute,
            second: second,
            timePeriod: timePeriod,
        });
    }

    disPlayAlermList(alermListArry);
}

// Function to display alarms on UI
function disPlayAlermList(alermListArry) {
    alermList.innerHTML = ""; // Clear previous content
    alermListArry.forEach(alerm => {
        let alermDiv = document.createElement("div");
        alermDiv.classList.add("Alerm-Time");
        alermDiv.innerHTML = `
            <span id=time${alerm.id}>${alerm.hour}:${alerm.minute}:${alerm.second} : ${alerm.timePeriod}</span>
            <button class="DeleteBtn" onClick="deleteAlerm(${alerm.id})">x</button>`;
        if (alerm.hour) {
            alermList.appendChild(alermDiv);
            
        }
    });

   
}

// Function to update current time clock
function currentClock() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    
    // Determine whether it's AM or PM
    let timePeriod = (currentHour >= 12) ? "PM" : "AM";
    
    // Convert 24-hour format to 12-hour format
    currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
    currentHour = (currentHour == 0) ? 12 : currentHour;
    if(currentHour<10){
        currentHour = "0"+currentHour;
    }

    if(currentMinutes<10){
        currentMinutes ="0"+currentMinutes;
    }

    if(currentSeconds<10){
        currentSeconds = "0"+currentSeconds;
    }
    
    let clockDiv = document.getElementById("ShowTiming");
    clockDiv.innerHTML = `<span>${currentHour}:${currentMinutes}:${currentSeconds} : </span><span class="timePeriod">${timePeriod}</span>`;

    setAlerm(currentHour,currentMinutes,currentSeconds);
}

// Update the clock every second
setInterval(() => {
    currentClock();
}, 1000);

// Initial call to display the clock
currentClock();


function setAlerm(currentHour, currentMinutes, currentSeconds) {
    currentHour = Number(currentHour);
    currentMinutes = Number(currentMinutes);
    currentSeconds = Number(currentSeconds);

    alermListArry.forEach(alerm => {
        let hour = alerm.hour;
        let minute = alerm.minute;
        let seconds = alerm.second;

        if (currentHour == hour && currentMinutes == minute && currentSeconds == seconds) {
            playSound();
            alert("Alerm Message");
            // Set an interval to continuously check if the alarm is deleted
            alarmInterval = setInterval(() => {
                let findAlermIndex = alermListArry.findIndex(a => a.id === alerm.id);
                if (findAlermIndex === -1) {
                    
                    clearInterval(alarmInterval); // stop the sound when it is deleted 
                } else {
                    playSound(); // sound will be playing continuously unless deleted
                }
            }, 1000);
        }
    });
}


function playSound() {
      const audio = new Audio("https://files.codingninjas.in/tom-3-28542.mp3"); // Replace 'path/to/' with the actual path
      audio.play();
  }


// Function to delete an alarm from the array
function deleteAlerm(alermId) {
    let findRemoveIndex = alermListArry.findIndex(alerm => alerm.id == alermId);
    alermListArry.splice(findRemoveIndex, 1);
    showAlermList(alermListArry);
}

