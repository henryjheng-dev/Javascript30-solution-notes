function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function clearPlayingState(e) {
  const key = document.querySelector(`div[data-code="${e.code}"]`);
  console.log(key);
  if (!key) return;
  key.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-code="${e.code}"]`);
  const key = document.querySelector(`div[data-code="${e.code}"]`);
  if (!audio || !key) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play().catch((err) => console.warn(`Audio play fail:`, err));
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('keyup', clearPlayingState);
