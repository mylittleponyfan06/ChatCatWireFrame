// Dashboard script for index.html

// Login functions
function openLoginOverlay() {
  const loginOverlay = document.getElementById('loginOverlay');
  if (loginOverlay) loginOverlay.style.display = 'flex';
}

function closeLoginOverlay() {
  const loginOverlay = document.getElementById('loginOverlay');
  if (loginOverlay) loginOverlay.style.display = 'none';
}

function completeLogin(useSenior) {
  const prefersSenior = !!useSenior;
  const loginBtn = document.getElementById('loginBtn');
  const seniorToggle = document.getElementById('seniorToggle');
  const appRoot = document.getElementById('app');
  
  if (loginBtn) {
    loginBtn.textContent = 'Logged in';
    loginBtn.classList.add('pill');
  }
  if (seniorToggle) {
    seniorToggle.checked = prefersSenior;
  }
  if (appRoot) {
    appRoot.classList.toggle('senior', prefersSenior);
  }
  toast(prefersSenior ? 'Logged in with senior UI' : 'You are now logged in.');
  closeLoginOverlay();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const loginEmailInput = document.getElementById('loginEmail');
  const loginSeniorChoice = document.getElementById('loginSeniorChoice');
  const loginDismissBtn = document.getElementById('loginDismissBtn');

  if (loginBtn) {
    loginBtn.addEventListener('click', openLoginOverlay);
  }

  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', function() {
      completeLogin(loginSeniorChoice && loginSeniorChoice.checked);
    });
  }

  if (loginEmailInput) {
    loginEmailInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        completeLogin(loginSeniorChoice && loginSeniorChoice.checked);
      }
    });
  }

  if (loginDismissBtn) {
    loginDismissBtn.addEventListener('click', closeLoginOverlay);
  }
});
