const overlay = document.querySelector('#startOverlay');
const startButton = document.querySelector('#startBuildBtn');
const interactButton = document.querySelector('#interactBtn');

function stateReady() {
  return window.robotLabState && Array.isArray(window.robotLabState.world);
}

function activateStarter(event) {
  event?.preventDefault?.();
  const state = window.robotLabState;
  if (!state || state.starterActive) return;

  state.starterActive = true;
  state.player.x = -2.8;
  state.player.y = 1.65;
  state.player.z = 3.2;
  state.player.yaw = Math.PI;
  state.player.pitch = -0.28;
  state.touch.moveX = 0;
  state.touch.moveY = 0;
  state.touch.velocity = { x: 0, z: 0 };

  const starter = state.world.find((object) => object.id === 'al-sheet');
  if (starter) {
    starter.glow = 1;
    state.target = starter;
  }

  document.querySelector('#mission strong').textContent = 'Starter kit is directly ahead.';
  document.querySelector('#mission small').textContent = 'Aim at the highlighted aluminum sheet and tap INTERACT. MENU also opens direct reference parts.';
  document.querySelector('#lookPrompt').textContent = 'Starter kit ahead — tap INTERACT';
  overlay?.classList.add('hidden');
}

function wireStarter() {
  if (!stateReady()) {
    setTimeout(wireStarter, 30);
    return;
  }

  for (const name of ['pointerup', 'touchend', 'click']) {
    startButton?.addEventListener(name, activateStarter, { passive: false });
  }

  // If a first-time player taps INTERACT while not targeting anything, recover into
  // the starter workbench instead of leaving them at a dead-end prompt.
  interactButton?.addEventListener('click', (event) => {
    const state = window.robotLabState;
    if (!state?.starterActive && !state?.target && !state?.held) {
      event.preventDefault();
      event.stopImmediatePropagation();
      activateStarter(event);
    }
  }, true);
}

wireStarter();
