// ================= LOGIN =================

function login() {

  let user = document.getElementById("username")?.value;
  let pass = document.getElementById("password")?.value;

  if (user === "" || pass === "") {
    alert("Please enter username and password");
    return;
  }

  alert("Login Successful!");
  window.location.href = "dashboard.html";
}


// ================= SUBJECTS =================

let subjects = [];

function addSubject() {

  let input = document.getElementById("subjectInput").value;

  if (input === "") {
    alert("Enter subject name");
    return;
  }

  subjects.push(input);
  displaySubjects();

  document.getElementById("subjectInput").value = "";
}

function displaySubjects() {

  let list = "";

  for (let i = 0; i < subjects.length; i++) {
    list += "<p>" + subjects[i] + "</p>";
  }

  document.getElementById("subjectList").innerHTML = list;
}


// ================= PLANNER =================

function generatePlan() {

  let days = document.getElementById("days").value;
  let subjectsInput = document.getElementById("subjects").value;

  if (days === "" || subjectsInput === "") {
    alert("Please fill all fields");
    return;
  }

  let subjectList = subjectsInput.split(",");
  let output = "";

  for (let i = 1; i <= days; i++) {

    let subject = subjectList[i % subjectList.length];

    output += "<p>Day " + i + " → Study " + subject.trim() + "</p>";
  }

  document.getElementById("output").innerHTML = output;
}


// ================= PROFILE =================

function saveProfile() {

  let name = document.getElementById("name").value;
  let studentClass = document.getElementById("class").value;
  let goal = document.getElementById("goal").value;
  let hours = document.getElementById("hours").value;

  if (name === "" || studentClass === "" || goal === "" || hours === "") {
    alert("Please fill all fields");
    return;
  }

  let output =
    "<p>Name: " + name + "</p>" +
    "<p>Class: " + studentClass + "</p>" +
    "<p>Goal: " + goal + "</p>" +
    "<p>Study Hours: " + hours + "</p>";

  document.getElementById("profileOutput").innerHTML = output;
}


// ================= PROGRESS =================

function calculateProgress() {

  let completed = document.getElementById("completed").value;
  let total = document.getElementById("total").value;

  if (completed === "" || total === "" || total == 0) {
    alert("Enter valid values");
    return;
  }

  let percent = (completed / total) * 100;

  let output =
    "<p>Completed: " + completed + "</p>" +
    "<p>Total: " + total + "</p>" +
    "<p>Progress: " + percent.toFixed(2) + "%</p>";

  document.getElementById("progressOutput").innerHTML = output;
}


// ================= SETTINGS =================

function savePreferences() {

  let hours = document.getElementById("studyHours").value;
  let time = document.getElementById("studyTime").value;
  let breakTime = document.getElementById("breakTime").value;

  if (hours === "" || breakTime === "") {
    alert("Please fill all fields");
    return;
  }

  alert(
    "Preferences Saved!\n" +
    "Study Hours: " + hours + "\n" +
    "Preferred Time: " + time + "\n" +
    "Break: " + breakTime + " mins"
  );
}

function changePassword() {

  let pass = document.getElementById("newPass").value;

  if (pass === "") {
    alert("Enter new password");
    return;
  }

  alert("Password changed successfully!");
}

function logout() {

  alert("Logged out!");
  window.location.href = "index.html";
}

function resetProgress() {

  alert("Progress reset!");
}

function deleteData() {

  let confirmDelete = confirm("Are you sure you want to delete all data?");

  if (confirmDelete) {
    alert("All data deleted!");
  }
}

// ================= CHAT =================

let chatData = JSON.parse(localStorage.getItem("chat")) || [];

function loadChat() {

  let chatBox = document.getElementById("chatBox");

  if (!chatBox) return;

  chatBox.innerHTML = "";

  chatData.forEach(msg => {

    let div = document.createElement("div");
    div.className = "chat-message " + msg.type;
    div.innerText = msg.text;

    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {

  let input = document.getElementById("userInput");

  if (input.value === "") return;

  // User message
  let userMsg = {
    text: input.value,
    type: "user"
  };

  chatData.push(userMsg);

  // Fake AI reply
  let botMsg = {
    text: "AI: I will help you with: " + input.value,
    type: "bot"
  };

  chatData.push(botMsg);

  localStorage.setItem("chat", JSON.stringify(chatData));

  input.value = "";

  loadChat();
}

// Load chat on page open
window.onload = loadChat;
