const loadLessons = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

let currentTab = "all";
const tabActive = ["bg-blue-700!", "text-white"];
const tabInactive = ["bg-transparent", "text-slate-700", "border-state-200"];

function switchTab(tab) {
  const tabs = ["all", "open", "closed"];

  for (const t of tabs) {
    const tabName = document.getElementById("tab-" + t);
    if (t === tab) {
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
    }
  }
  if (tab === "open") {
    loadAllOpenIssue();
  }
  if (tab === "closed") {
    loadAllClosedIssue();
  }
}
switchTab(currentTab);

const loadLevelWord = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadLevelWord(data));
};

const loadAllOpenIssue = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => allOpenIssue(json.data));
};

const allOpenIssue = (issues) => {
  const card = document.getElementById("card-container");
  const openIssues = issues.filter((issue) => issue.status === "open");
  console.log(openIssues);
  displayLesson(openIssues);
};
loadAllOpenIssue();

const loadAllClosedIssue = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => allClosedIssue(json.data));
};
const allClosedIssue = (issues) => {
  const card = document.getElementById("card-container");
  const closedIssues = issues.filter((issue) => issue.status === "closed");
  console.log(closedIssues);
  displayLesson(closedIssues);
};

const tagStyle = {
  high: "bg-[#FEECEC] text-[#EF4444]",
  medium: "bg-[#FFF6D1] text-[#F59E0B]",
  low: "bg-[#EEEFF2] text-[#9CA3AF]",
};

const displayLesson = (cards) => {
  // 1. get the container & empty
  const allCard = document.getElementById("card-container");
  allCard.innerHTML = "";

  const numberIssues = document.getElementById("numberIssues");
  numberIssues.innerHTML = `
      <h2 class="font-semibold text-xl">${cards.length} Issues</h2>
      <p class="text-[#64748B]">Track and manage your project issues</p>
  `;

  // 2. get into every lessons
  for (let card of cards) {
    console.log(card);
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <div onclick="loadModal('${card.id}')"> 
        <div class="space-y-4">
          <div class="flex justify-between">
         
            <img class="w-10" src="${card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
            <p class="font-medium ${tagStyle[card.priority]} text-center bg-[#FEECEC] w-20 p-2 rounded-lg">${card.priority.toUpperCase()}</p>
          </div>
          <div>
            <h2 class="font-semibold">Fix navigation menu on mobile devices</h2>
            <p class="text-[#64748B]">
              The navigation menu doesn't collapse properly on mobile devices...
            </p>
          </div>
          <div class="flex justify-between">
            <p class="flex items-center font-medium text-[#EF4444] text-center bg-[#FEECEC] w-20 p-2 rounded-lg"><img class="w-4" src="./assets/Vector.png" alt="" /><span class="">BUG</span></p>
            <p class="flex font-medium text-[#EF4444] text-center bg-[#FEECEC] w-40 p-2 rounded-lg"><img class="w-4" src="./assets/Vector (1).png" alt="" />
              <span>HELP WANTED</span>
            </p>
          </div>
          <hr class="text-[#E4E4E7]">
          <div>
            <p class="text-[#64748B] text-xs">#1 by john_doe</p>
            <p class="text-[#64748B] text-xs">1/15/2024</p>
          </div>
        </div>
        
      </div>
    `;
    // 4. append into container
    allCard.append(btnDiv);
  }
};
loadLessons();

const loadModal = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((json) => displayLessonDetails(json.data));
};

const displayLessonDetails = (data) => {
  console.log(data);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="space-y-5">
  <h2 class="text-2xl font-bold">${data.title}</h2> 
      <div class="flex items-center gap-2">
        <p class="font-medium bg-[#00A96E] p-2 rounded-lg">${data.status}</p>
        <p class="text-[#64748B]">${data}</p>
      </div>
      <div class="flex gap-2">
        <p class="flex items-center font-medium text-[#EF4444] text-center bg-[#FEECEC] w-20 p-2 rounded-lg"><img class="w-4" src="./assets/Vector.png" alt="" /><span class="">BUG</span></p>
        <p class="flex font-medium text-[#EF4444] text-center bg-[#FEECEC] w-40 p-2 rounded-lg"><img class="w-4" src="./assets/Vector (1).png" alt="" /><span>HELP WANTED</span>
      </div>
      <p class="text-[#64748B]">${data.description}.</p>
      <div class="flex gap-40 p-4 rounded-lg bg-[#F8FAFC]">
        <div class="">
          <p class="text-[#64748B]">Assignee:</p>
          <p class="font-semibold">${data.assignee}</p>
        </div>
        <div>
          <p class="text-[#64748B]">Priority:</p>
          <p class="font-medium text-[#FFFFFF] text-center bg-[#EF4444] w-20 p-2 rounded-lg">${data.priority}</p>
        </div>
      </div>
  </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
