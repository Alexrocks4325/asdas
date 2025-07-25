
// Global State
const state = {
  view: 'splash',
  coachName: '',
  teamChoice: '',
  team: [],
  coins: 100,
  level: 1,
  xp: 0,
  packs: [],
  auctions: [],
  sets: [],
  profile: {},
  transactions: [],
  tutorialComplete: false,
  soundOn: true,
  volume: 0.5,
  dailyRewardClaimed: false
};

const app = document.getElementById('app');

function renderView() {
  app.innerHTML = '';
  switch (state.view) {
    case 'splash': return renderSplash();
    case 'intro': return renderIntro();
    case 'mainMenu': return renderMainMenu();
    case 'team': return renderTeam();
    case 'gameplay': return renderGameplay();
    case 'store': return renderStore();
    case 'packs': return renderPacks();
    case 'auction': return renderAuction();
    case 'sets': return renderSets();
    case 'profile': return renderProfile();
    case 'settings': return renderSettings();
    default: app.innerHTML = '<p>Invalid View</p>';
  }
}

function renderSplash() {
  const splash = document.createElement('div');
  splash.innerHTML = `
    <h1>NHL Mobile Game</h1>
    <button onclick="startTutorial()">Start</button>
  `;
  app.appendChild(splash);
}

function startTutorial() {
  state.view = 'intro';
  state.team.push(...generateStarterPack());
  state.coins += 100;
  state.tutorialComplete = true;
  renderView();
}

function generateStarterPack() {
  return [
    { name: 'Starter Player 1', position: 'Offense', overall: 65 },
    { name: 'Starter Player 2', position: 'Defense', overall: 63 },
    { name: 'Starter Player 3', position: 'Offense', overall: 64 }
  ];
}

function renderIntro() {
  const intro = document.createElement('div');
  intro.innerHTML = `
    <h2>Welcome Coach!</h2>
    <input placeholder="Enter your Coach Name" oninput="state.coachName=this.value" />
    <button onclick="state.view='mainMenu'; renderView()">Continue</button>
  `;
  app.appendChild(intro);
}

function renderMainMenu() {
  const menu = document.createElement('div');
  menu.innerHTML = `
    <div class="top-bar">Coins: ${state.coins}</div>
    <h2>Main Menu</h2>
    <button onclick="state.view='team'; renderView()">My Team</button>
    <button onclick="state.view='store'; renderView()">Store</button>
    <button onclick="state.view='packs'; renderView()">Packs</button>
    <button onclick="state.view='auction'; renderView()">Auction House</button>
    <button onclick="state.view='sets'; renderView()">Sets</button>
    <button onclick="state.view='profile'; renderView()">Profile</button>
    <button onclick="state.view='settings'; renderView()">Settings</button>
  `;
  app.appendChild(menu);
}

function renderStore() {
  const store = document.createElement('div');
  store.innerHTML = `
    <h2>Store</h2>
    <p>Buy Coins or Packs</p>
    <button onclick="buyPack('bronze')">Buy Bronze Pack (500 coins)</button>
    <button onclick="buyPack('silver')">Buy Silver Pack (2,500 coins)</button>
    <button onclick="buyPack('gold')">Buy Gold Pack (5,000 coins)</button>
    <button onclick="state.view='mainMenu'; renderView()">Back</button>
  `;
  app.appendChild(store);
}

function buyPack(type) {
  const cost = { bronze: 500, silver: 2500, gold: 5000 }[type];
  if (state.coins >= cost) {
    state.coins -= cost;
    state.packs.push({ type });
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Pack Purchased!`);
  } else {
    alert('Not enough coins!');
  }
  renderView();
}

function renderPacks() {
  const packsDiv = document.createElement('div');
  packsDiv.innerHTML = `<h2>My Packs</h2>`;
  state.packs.forEach((pack, index) => {
    const btn = document.createElement('button');
    btn.textContent = `Open ${pack.type} Pack`;
    btn.onclick = () => openPack(index);
    packsDiv.appendChild(btn);
  });
  packsDiv.innerHTML += '<button onclick="state.view='mainMenu'; renderView()">Back</button>';
  app.appendChild(packsDiv);
}

function openPack(index) {
  const pulled = generatePackPlayers(state.packs[index].type);
  state.team.push(...pulled);
  state.packs.splice(index, 1);
  alert(`You pulled: ${pulled.map(p => p.name).join(', ')}`);
  renderView();
}

function generatePackPlayers(type) {
  const base = { bronze: 60, silver: 70, gold: 80 }[type];
  return [
    { name: `Player ${Math.floor(Math.random() * 1000)}`, position: 'Offense', overall: base + Math.floor(Math.random() * 5) },
    { name: `Player ${Math.floor(Math.random() * 1000)}`, position: 'Defense', overall: base + Math.floor(Math.random() * 5) }
  ];
}

function renderTeam() {
  const teamDiv = document.createElement('div');
  teamDiv.innerHTML = `<h2>My Team</h2>`;
  state.team.forEach(player => {
    teamDiv.innerHTML += `<p>${player.name} - ${player.position} - OVR ${player.overall}</p>`;
  });
  teamDiv.innerHTML += '<button onclick="state.view='mainMenu'; renderView()">Back</button>';
  app.appendChild(teamDiv);
}

function renderAuction() {
  app.innerHTML = '<h2>Auction House (coming soon)</h2><button onclick="state.view='mainMenu'; renderView()">Back</button>';
}

function renderSets() {
  app.innerHTML = '<h2>Sets (coming soon)</h2><button onclick="state.view='mainMenu'; renderView()">Back</button>';
}

function renderProfile() {
  app.innerHTML = `<h2>Profile</h2><p>Coach: ${state.coachName}</p><p>Level: ${state.level}</p><p>XP: ${state.xp}</p><button onclick="state.view='mainMenu'; renderView()">Back</button>`;
}

function renderSettings() {
  app.innerHTML = '<h2>Settings (coming soon)</h2><button onclick="state.view='mainMenu'; renderView()">Back</button>';
}

renderView();
