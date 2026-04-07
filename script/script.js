const loadLessons = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

let currentTab = "all";
const tabActive = ["bg-navy", "border-navy"];
const tabInactive = ["bg-transparent", "text-slate-700", "border-state-200"];

function switchTab(tab) {
  console.log(tab);
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
}

const loadLevelWord = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/${id}`;
  console.log(url);
};

const displayLesson = (cards) => {
  // 1. get the container & empty
  const allCard = document.getElementById("card-container");
  allCard.innerHTML = "";
  // 2. get into every lessons
  for (let card of cards) {
    console.log(card);
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <div>
        <div class="w-[300] h-[330px] p-4  border-t-green-400 rounded-md shadow-sm">
        <div class="space-y-4">
          <div class="flex justify-between">
            <img class="w-10" src="./assets/Open-Status.png" alt="" />
            <p class="font-medium text-[#EF4444] text-center bg-[#FEECEC] w-20 p-2 rounded-lg">HIGH</p>
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
      </div>
    `;
    // 4. append into container
    allCard.append(btnDiv);
  }
};
loadLessons();
