
    case 'profile': return renderProfile();
    case 'settings': return renderSettings();
    default: return renderSplash();
  }
}

// Splash Screen
function renderSplash() {
  const splash = document.createElement('div');
  splash.innerHTML = `<h1>NHL Ultimate</h1><button onclick="startIntro()">Tap to Start</button>`;
  app.appendChild(splash);
}

function startIntro() {
  state.view = 'intro';
  renderView();
}

// Tutorial / Intro
function renderIntro() {
  const intro = document.createElement('div');
  intro.innerHTML = `
    <h2>Welcome Coach!</h2>
    <p>Enter your coach name:</p>
    <input id="coachName" />
    <p>Select your favorite NHL team:</p>
    <select id="teamChoice">${getNHLTeams()}</select>
    <button onclick="saveIntro()">Continue</button>
  `;
  app.appendChild(intro);
}

function getNHLTeams() {
  const teams = ["Bruins","Maple Leafs","Canadiens","Rangers","Red Wings","Blackhawks","Penguins","Lightning","Avalanche","Oilers","Flames","Senators","Capitals","Sharks","Ducks","Kings","Panthers","Kraken","Blues","Golden Knights","Mammoth","Canucks","Kings","Stars","Islanders","Jets","Sabres"];
  return teams.map(t => `<option value='${t}'>${t}</option>`).join('');
}

function saveIntro() {
  const name = document.getElementById('coachName').value;
  const team = document.getElementById('teamChoice').value;
  if (!name || !team) return alert('Please fill out all fields');
  state.coachName = name;
  state.teamChoice = team;
  state.tutorialComplete = true;
  state.view = 'mainMenu';
  renderView();
}

// Main Menu
function renderMainMenu() {
  const menu = document.createElement('div');
  menu.innerHTML = `
    <h2>Welcome, Coach ${state.coachName}</h2>
    <p>Coins: ${state.coins}</p>
    <button onclick="switchView('gameplay')">Play Match</button>
    <button onclick="switchView('team')">My Team</button>
    <button onclick="switchView('packs')">Packs</button>
    <button onclick="switchView('auction')">Auction House</button>
    <button onclick="switchView('sets')">Sets</button>
    <button onclick="switchView('store')">Store</button>
    <button onclick="switchView('profile')">Profile</button>
    <button onclick="switchView('settings')">Settings</button>
  `;
  app.appendChild(menu);
}

function switchView(view) {
  state.view = view;
  renderView();
}
