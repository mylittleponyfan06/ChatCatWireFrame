// Shared data for all pages
const workspaces = [
  { name: 'demo-main', tags: 248, attachments: 48, messages: 1203, recentFiles: [
    { name: 'PHOTO-2025-12-11-12-19-08', type: 'JPG', date: '11/12/2025' },
    { name: 'VIDEO-2025-11-11-14-14-14', type: 'MP4', date: '11/11/2025' },
    { name: 'PHOTO-2025-07-28-14-06-28', type: 'JPG', date: '28/07/2025' }
  ]},
  { name: 'family-reunion', tags: 112, attachments: 24, messages: 456, recentFiles: [
    { name: 'family-photos-2025', type: 'ZIP', date: '15/12/2025' },
    { name: 'reunion-notes', type: 'DOC', date: '10/12/2025' }
  ]},
  { name: 'client-nyp', tags: 362, attachments: 89, messages: 2341, recentFiles: [
    { name: 'project-proposal-v3', type: 'PDF', date: '20/01/2026' },
    { name: 'wireframes-final', type: 'FIG', date: '18/01/2026' },
    { name: 'requirements', type: 'DOC', date: '15/01/2026' }
  ]},
  { name: 'uni-math', tags: 76, attachments: 12, messages: 234, recentFiles: [
    { name: 'assignment-solutions', type: 'PDF', date: '19/01/2026' },
    { name: 'lecture-notes', type: 'PDF', date: '17/01/2026' }
  ]},
];

const queue = [
  { file: 'WA-2026-01-zip', status: 'Processing - 68%' },
  { file: 'family-chat-2025.zip', status: 'Queued' },
  { file: 'project-nyp-phase2.zip', status: 'Imported - 2h ago' },
];

const emotions = [
  { who: 'Kai', tone: 'Worried - needs reassurance', msg: 'Not sure I can submit on time, the laptop crashed again.' },
  { who: 'Jasmine', tone: 'Relieved - optimistic', msg: 'The client approved the changes. Lets wrap the last tweaks.' },
  { who: 'Dad', tone: 'Confused - neutral', msg: 'Is this the right group for the reunion pictures?' },
  { who: 'Mom', tone: 'Warm - appreciative', msg: 'Thanks for sorting all the photos! They look great.' },
];

const recentUploads = [
  { name: 'Doloct', time: '1440 1440.500 - 145ks', status: 'completed' },
  { name: 'Doloct', time: '1440 1440.500 - 145ks', status: 'completed' },
  { name: 'Doloct', time: '1440 1440.500 - 145ks', status: 'completed' },
  { name: 'Doloct', time: '1440 1440.500 - 145ks', status: 'completed' },
  { name: 'Uploct', time: '1440 1440.500 - 145ks', status: 'processing' },
];

// Toast notification
function toast(message) {
  const toastContainer = document.getElementById('toastContainer');
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  if (toastContainer) {
    toastContainer.appendChild(node);
    requestAnimationFrame(function() { node.classList.add('show'); });
    setTimeout(function() { node.classList.remove('show'); }, 2400);
    setTimeout(function() { node.remove(); }, 2800);
  }
}

// Initialize sidebar and senior mode for all pages
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const seniorToggle = document.getElementById('seniorToggle');
  const appRoot = document.getElementById('app');

  // Restore collapsed state from localStorage
  const sidebar = document.querySelector('.sidebar');
  const app = document.querySelector('.app');
  const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  
  if (isCollapsed && sidebar && app) {
    sidebar.classList.add('collapsed');
    app.classList.add('sidebar-collapsed');
    if (sidebarToggle) {
      sidebarToggle.textContent = '▶';
    }
  }

  // Sidebar toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar');
      const app = document.querySelector('.app');
      if (sidebar && app) {
        sidebar.classList.toggle('collapsed');
        app.classList.toggle('sidebar-collapsed');
        const nowCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', nowCollapsed);
        if (nowCollapsed) {
          sidebarToggle.textContent = '▶';
        } else {
          sidebarToggle.textContent = '◀';
        }
      }
    });
  }

  // Navigation handling
  const navItems = document.querySelectorAll('.nav__item[data-href]');
  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const href = item.getAttribute('data-href');
      if (href) {
        location.href = href;
      }
    });
  });

  // Senior mode toggle
  if (seniorToggle) {
    seniorToggle.addEventListener('change', function(e) {
      if (appRoot) {
        appRoot.classList.toggle('senior', e.target.checked);
      }
    });
  }
});
