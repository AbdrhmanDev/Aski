// var xhr = new XMLHttpRequest();
// xhr.open("GET", "./Data.json", true);
// var users = [];
// var questions = [];
// var userLocal;
// const numberOfQuestions = document.getElementById("numberOfQuestions");
// xhr.onreadystatechange = () => {
//   if (xhr.readyState == 4 && xhr.status == 200) {
//     data = JSON.parse(xhr.responseText);
//     // console.log(data);
//     console.log("++++++++");
//     console.log(data.users);
//     userLocal = localStorage.setItem("users", data.users);

//     // processGlobalData(data);

//     console.log("ON READY");
//   }
//   console.log("dddddd");
//   function processGlobalData(data) {
//     // Example: Iterate through users
//     data.users.forEach((user) => {
//       users.push(user);
//     });
//     data.questions.forEach((q) => {
//       questions.push(q);
//     });
//   }
//   console.log(questions.length);
//   console.log(users);
//   numberOfQuestions.innerText = questions.length;
// };
// xhr.send();

// console.log(userLocal);
const xhr = new XMLHttpRequest();

xhr.open("GET", "./Data.json", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const jsonData = JSON.parse(xhr.responseText);

    // Check if data is already in localStorage
    if (!localStorage.getItem("appData")) {
      localStorage.setItem("appData", JSON.stringify(jsonData));
      console.log("Data loaded into localStorage:", jsonData);
    } else {
      console.log("Data already exists in localStorage.");
    }
  }
};

xhr.send();

// Function to retrieve data from localStorage and parse it as JSON
function getDataFromLocalStorage() {
  const data = localStorage.getItem("appData");
  if (data) {
    return JSON.parse(data);
  } else {
    console.error("No data found in localStorage.");
    return null;
  }
}

// Usage
const data = getDataFromLocalStorage();
console.log("Retrieved data:", data);

// Function to load data from localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem("appData"));
  if (data && data.users && data.questions) {
    return {
      users: data.users,
      questions: data.questions,
    };
  } else {
    console.error("No users or questions found in localStorage.");
    return { users: [], questions: [] };
  }
}

// Function to find the username of the user who posted the question
function getUsername(userId, users) {
  const user = users.find((user) => user.id === userId);
  return user ? user.username : "Unknown";
}

// Function to show questions
function showQuestions(questions, users) {
  const container = document.getElementById("question-box");
  container.innerHTML = "";

  questions.forEach((question) => {
    const username = getUsername(question.userId, users); // Get username of the user who posted the question
    document.getElementById("numberOfQuestions").innerText = questions.length;
    const questionElement = document.createElement("div");
    questionElement.classList.add("question-content");
    questionElement.id = "question-content";
    const tagsHtml = question.tags
      ? question.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
      : "";

    console.log(question.tags);
    questionElement.innerHTML =
      // `
      //     <h2>${question.title}</h2>
      //     <p>${question.content}</p>
      //     <p><strong>Likes:</strong> ${question.likes}</p>
      //     <p><strong>Saved:</strong> ${question.saved ? "Yes" : "No"}</p>
      //     <p><strong>Date Posted:</strong> ${question.datePosted}</p>
      //     <div class="tags">
      //       <strong>Tags:</strong> <span>${tags}</span>
      //     </div>
      //     <p><strong>Posted by:</strong> ${username}</p>
      //      <p><strong>answes by:</strong> ${question.answers.length}</p>
      //   `;
      `   <div class="vote-answers">
              <p><span>${question.likes}</span> Votes</p>
              <p><span>${question.answers.length}</span> Answers</p>
            </div>
            <div class="question-items">
              <h1>${question.title}</h1>
              <p>
              ${question.content}
              </p>
              <div class="tags-and-user-data">
                <div class="tags">${tagsHtml}</div>
                <div class="question-user-data">
                  <i class="fa-solid fa-user"></i><span>${username}</span>
                  <i class="fa-regular fa-clock"></i> <span>${question.datePosted}</span>
                </div>
              </div>
            </div>
          </div>`;
    container.appendChild(questionElement);
  });
}

// Function to display the data
function displayData() {
  const data = loadData();
  showQuestions(data.questions, data.users);
}

displayData();
