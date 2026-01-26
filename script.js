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

const contextual = [
  { title: 'Find: soccer practice photos', meta: '8 attachments - 12 Jul 2025 - AI tags: sports, kids', type: 'attachments', items: [
    { name: 'soccer-practice-01.jpg', size: '2.4 MB', date: '12 Jul 3:45 PM', sender: 'Kai' },
    { name: 'soccer-practice-02.jpg', size: '3.1 MB', date: '12 Jul 3:46 PM', sender: 'Kai' },
    { name: 'soccer-practice-03.jpg', size: '2.8 MB', date: '12 Jul 3:47 PM', sender: 'Kai' },
    { name: 'soccer-goal-highlight.mp4', size: '8.5 MB', date: '12 Jul 4:00 PM', sender: 'Mom' },
    { name: 'team-photo.jpg', size: '4.2 MB', date: '12 Jul 4:15 PM', sender: 'Coach' }
  ]},
  { title: 'Tone: frustrated message from Kai', meta: 'Detected tone: Frustrated - 1 message - 09 Jan 2026', type: 'messages', items: [
    { sender: 'Kai', text: 'I cannot believe the project deadline moved again. This is the third time!', time: '09 Jan 2:15 PM', tone: 'Frustrated' },
    { sender: 'Kai', text: 'How am I supposed to deliver quality work with these constant changes?', time: '09 Jan 2:16 PM', tone: 'Frustrated' }
  ]},
  { title: 'Ask: invoices sent last quarter', meta: '6 docs - 3 senders - Aug-Oct 2025', type: 'documents', items: [
    { name: 'Q3-Invoice-2025.pdf', size: '1.2 MB', date: '30 Oct 9:00 AM', sender: 'Finance' },
    { name: 'Invoice-Aug-2025.xlsx', size: '0.8 MB', date: '31 Aug 10:30 AM', sender: 'Accounting' },
    { name: 'Invoice-Sep-2025.xlsx', size: '0.9 MB', date: '30 Sep 2:00 PM', sender: 'Accounting' },
    { name: 'Invoice-Oct-2025.xlsx', size: '0.85 MB', date: '31 Oct 3:15 PM', sender: 'Accounting' }
  ]},
  { title: 'Search: mentions of assignment', meta: '24 hits - math, chem - Attachment count: 5', type: 'mixed', items: [
    { type: 'message', sender: 'Jasmine', text: 'Math assignment due Friday', time: '15 Jan 1:20 PM' },
    { type: 'message', sender: 'Kai', text: 'Can you review my chemistry assignment?', time: '15 Jan 3:45 PM' },
    { type: 'attachment', name: 'math-assignment-draft.pdf', size: '0.5 MB', date: '15 Jan 4:05 PM' },
    { type: 'message', sender: 'Jasmine', text: 'Sure, send it over', time: '15 Jan 4:00 PM' },
    { type: 'attachment', name: 'chem-lab-report.docx', size: '1.1 MB', date: '15 Jan 5:20 PM' }
  ]}
];

const emotions = [
  { who: 'Kai', tone: 'Worried - needs reassurance', msg: 'Not sure I can submit on time, the laptop crashed again.' },
  { who: 'Jasmine', tone: 'Relieved - optimistic', msg: 'The client approved the changes. Lets wrap the last tweaks.' },
  { who: 'Dad', tone: 'Confused - neutral', msg: 'Is this the right group for the reunion pictures?' },
  { who: 'Mom', tone: 'Warm - appreciative', msg: 'Thanks for sorting all the photos! They look great.' },
];

const chipsEl = document.getElementById('workspaceChips');
const queueEl = document.getElementById('queueList');
const contextualEl = document.getElementById('searchResults');
const emotionEl = document.getElementById('emotionList');
const sidebarToggle = document.getElementById('sidebarToggle');
const seniorToggle = document.getElementById('seniorToggle');
const appRoot = document.getElementById('app');
const toastContainer = document.getElementById('toastContainer');
const loginOverlay = document.getElementById('loginOverlay');
const loginEmailInput = document.getElementById('loginEmail');
const loginSeniorChoice = document.getElementById('loginSeniorChoice');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const loginDismissBtn = document.getElementById('loginDismissBtn');

// Page navigation
const navItems = document.querySelectorAll('.nav__item');
const pages = document.querySelectorAll('.page');
const seniorView = document.getElementById('seniorView');
const seniorFeatures = document.querySelectorAll('.senior-feature');

function showPage(pageName) {
  pages.forEach(function(p) { p.classList.remove('active'); });
  seniorView.classList.remove('active');
  
  const page = document.getElementById('page-' + pageName);
  if (page) {
    page.classList.add('active');
  }
  
  navItems.forEach(function(n) { n.classList.remove('active'); });
  const activeNav = document.querySelector('[data-page="' + pageName + '"]');
  if (activeNav) {
    activeNav.classList.add('active');
  }
}

function showSeniorView() {
  pages.forEach(function(p) { p.classList.remove('active'); });
  seniorView.classList.add('active');
  navItems.forEach(function(n) { n.classList.remove('active'); });
}

navItems.forEach(function(item) {
  item.addEventListener('click', function() {
    const pageName = item.getAttribute('data-page');
    showPage(pageName);
  });
});

seniorFeatures.forEach(function(feature) {
  feature.addEventListener('click', function() {
    const pageName = feature.getAttribute('data-page');
    if (pageName) {
      seniorView.classList.remove('active');
      showPage(pageName);
    }
  });
});

function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  toastContainer.appendChild(node);
  requestAnimationFrame(function() { node.classList.add('show'); });
  setTimeout(function() { node.classList.remove('show'); }, 2400);
  setTimeout(function() { node.remove(); }, 2800);
}

function renderWorkspacesList() {
  const listEl = document.getElementById('workspacesList');
  listEl.innerHTML = '';
  
  if (workspaces.length === 0) {
    listEl.innerHTML = '<p class="muted" style="padding: 20px; text-align: center;">No workspaces yet. Create one to get started.</p>';
    return;
  }
  
  workspaces.forEach(function(w, index) {
    const item = document.createElement('div');
    item.className = 'workspace-item';
    item.innerHTML = '<div class="workspace-item-info"><div><div class="workspace-item-name">' + w.name + '</div><div class="workspace-item-count">' + w.tags + ' tags</div></div></div><div class="workspace-item-actions"><button class="ghost" data-action="edit" data-index="' + index + '">Edit</button><button class="ghost" data-action="delete" data-index="' + index + '">Delete</button></div>';
    
    const infoSection = item.querySelector('.workspace-item-info');
    const editBtn = item.querySelector('[data-action="edit"]');
    const deleteBtn = item.querySelector('[data-action="delete"]');
    
    infoSection.addEventListener('click', function() {
      showWorkspaceDetail(index);
    });
    
    editBtn.addEventListener('click', function() {
      renameWorkspace(index);
    });
    
    deleteBtn.addEventListener('click', function() {
      deleteWorkspace(index);
    });
    
    listEl.appendChild(item);
  });
}

function renderQueue() {
  queueEl.innerHTML = '';
  queue.forEach(function(q) {
    const li = document.createElement('li');
    li.className = 'list__item';
    li.innerHTML = '<span>' + q.file + '</span><span class="muted">' + q.status + '</span>';
    queueEl.appendChild(li);
  });
}

function renderContextual() {
  contextualEl.innerHTML = '';
  contextual.forEach(function(c, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', index);
    card.innerHTML = '<p class="card__title">' + c.title + '</p><p class="card__meta">' + c.meta + '</p>';
    card.addEventListener('click', function() {
      showSearchDetail(index);
    });
    contextualEl.appendChild(card);
  });
  if (contextual.length > 0) {
    document.getElementById('searchResultsPanel').classList.add('active');
  }
}

function renderEmotions() {
  emotionEl.innerHTML = '';
  emotions.forEach(function(e) {
    const card = document.createElement('div');
    card.className = 'emotion__item';
    card.innerHTML = '<p class="emotion__title">' + e.who + '</p><p class="emotion__tone">' + e.tone + '</p><p class="muted">"' + e.msg + '"</p>';
    emotionEl.appendChild(card);
  });
}

const importBtn = document.getElementById('importBtn');
const contextualInput = document.getElementById('contextualInput');
const contextualSearchBtn = document.getElementById('contextualSearchBtn');
const advancedFiltersBtn = document.getElementById('advancedFiltersBtn');
const scanEmotionBtn = document.getElementById('scanEmotionBtn');
const emotionInput = document.getElementById('emotionInput');
const loginBtn = document.getElementById('loginBtn');
const createWorkspaceBtn = document.getElementById('createWorkspaceBtn');
const workspaceNameInput = document.getElementById('workspaceNameInput');

function openLoginOverlay() {
  if (loginOverlay) loginOverlay.style.display = 'flex';
}

function closeLoginOverlay() {
  if (loginOverlay) loginOverlay.style.display = 'none';
}

function completeLogin(useSenior) {
  const prefersSenior = !!useSenior;
  if (loginBtn) {
    loginBtn.textContent = 'Logged in';
    loginBtn.classList.add('pill');
  }
  if (seniorToggle) {
    seniorToggle.checked = prefersSenior;
  }
  appRoot.classList.toggle('senior', prefersSenior);
  addBackToSeniorButtons();
  updateBackButtons();
  if (prefersSenior) {
    showSeniorView();
  } else {
    showPage('dashboard');
  }
  toast(prefersSenior ? 'Logged in with senior UI' : 'You are now logged in.');
  closeLoginOverlay();
}

function createWorkspace() {
  const name = workspaceNameInput.value.trim();
  if (!name) {
    toast('Workspace name required.');
    return;
  }
  workspaces.push({ name: name, tags: 0, attachments: 0, messages: 0, recentFiles: [] });
  renderWorkspacesList();
  workspaceNameInput.value = '';
  toast('Workspace created: ' + name);
}

function renameWorkspace(index) {
  const newName = prompt('New workspace name:', workspaces[index].name);
  if (newName && newName.trim()) {
    workspaces[index].name = newName.trim();
    renderWorkspacesList();
    toast('Workspace renamed to ' + newName);
  }
}

function deleteWorkspace(index) {
  const confirmDelete = confirm('Delete workspace "' + workspaces[index].name + '"?');
  if (confirmDelete) {
    const deleted = workspaces.splice(index, 1);
    renderWorkspacesList();
    toast('Deleted: ' + deleted[0].name);
  }
}

createWorkspaceBtn.addEventListener('click', createWorkspace);
workspaceNameInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') createWorkspace();
});

// Import button
importBtn.addEventListener('click', function() {
  const fileName = 'whatsapp-import-' + Date.now().toString().slice(-4) + '.zip';
  queue.unshift({ file: fileName, status: 'Queued now' });
  renderQueue();
  toast('Import added to queue.');
});

// Contextual search
function runContextSearch() {
  const query = contextualInput.value.trim();
  if (!query) {
    toast('Type a search to see results.');
    return;
  }
  contextual.unshift({ title: 'Search: ' + query, meta: 'Semantic match - attachments + messages', type: 'mixed', items: [
    { type: 'message', sender: 'You', text: 'Searching for: ' + query, time: 'Just now' },
    { type: 'attachment', name: query + '-results.pdf', size: '0.8 MB', date: 'Just now' }
  ]});
  renderContextual();
  toast('Found results for "' + query + '"');
}

contextualSearchBtn.addEventListener('click', runContextSearch);
contextualInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') runContextSearch();
});

advancedFiltersBtn.addEventListener('click', function() {
  toast('Filters: tone + attachment type + date range');
});

// Search detail view
function showSearchDetail(index) {
  const result = contextual[index];
  if (!result) return;
  
  const detailPanel = document.getElementById('searchDetailPanel');
  const detailTitle = document.getElementById('detailTitle');
  const detailContent = document.getElementById('detailContent');
  
  detailTitle.textContent = result.title;
  
  let html = '';
  
  if (result.type === 'messages') {
    html = '<div class="message-list">';
    result.items.forEach(function(item) {
      html += '<div class="message-item"><div class="message-sender">' + item.sender + '</div><p class="message-text">' + item.text + '</p><div class="message-time">' + item.time + '</div></div>';
    });
    html += '</div>';
  } else if (result.type === 'attachments') {
    html = '<div class="attachment-list">';
    result.items.forEach(function(item) {
      const ext = item.name.split('.').pop().toUpperCase();
      html += '<div class="attachment-item"><div class="attachment-type-icon">' + ext + '</div><div class="attachment-info"><p class="attachment-title">' + item.name + '</p><div class="attachment-meta">' + item.sender + ' - ' + item.size + ' - ' + item.date + '</div></div></div>';
    });
    html += '</div>';
  } else if (result.type === 'documents') {
    html = '<div class="document-list">';
    result.items.forEach(function(item) {
      const ext = item.name.split('.').pop().toUpperCase();
      html += '<div class="document-item"><div class="document-icon">' + ext + '</div><div class="document-info"><p class="document-name">' + item.name + '</p><div class="document-meta">' + item.sender + ' - ' + item.size + ' - ' + item.date + '</div></div></div>';
    });
    html += '</div>';
  } else if (result.type === 'mixed') {
    html = '<div class="mixed-list">';
    result.items.forEach(function(item) {
      if (item.type === 'message') {
        html += '<div class="mixed-item item-message"><div class="message-sender">' + item.sender + '</div><p class="message-text">' + item.text + '</p><div class="message-time">' + item.time + '</div></div>';
      } else if (item.type === 'attachment') {
        const ext = item.name.split('.').pop().toUpperCase();
        html += '<div class="mixed-item"><div class="item-attachment"><div class="item-attachment-icon">' + ext + '</div><div class="item-attachment-info"><p class="item-attachment-name">' + item.name + '</p><div class="item-attachment-meta">' + item.size + ' - ' + item.date + '</div></div></div></div>';
      }
    });
    html += '</div>';
  }
  
  detailContent.innerHTML = html;
  detailPanel.style.display = 'block';
  document.getElementById('searchResultsPanel').style.display = 'none';
}

const backToResultsBtn = document.getElementById('backToResultsBtn');
backToResultsBtn.addEventListener('click', function() {
  document.getElementById('searchDetailPanel').style.display = 'none';
  document.getElementById('searchResultsPanel').style.display = 'block';
});

// Workspace detail view
function showWorkspaceDetail(index) {
  const workspace = workspaces[index];
  if (!workspace) return;
  
  const detailPanel = document.getElementById('workspaceDetailPanel');
  const detailTitle = document.getElementById('workspaceDetailTitle');
  const detailContent = document.getElementById('workspaceDetailContent');
  
  detailTitle.textContent = workspace.name;
  
  let html = '<div class="workspace-stat">';
  html += '<div class="stat-box"><div class="stat-label">Messages</div><p class="stat-value">' + workspace.messages + '</p></div>';
  html += '<div class="stat-box"><div class="stat-label">Attachments</div><p class="stat-value">' + workspace.attachments + '</p></div>';
  html += '<div class="stat-box"><div class="stat-label">Messages tagged</div><p class="stat-value">' + workspace.tags + '</p></div>';
  html += '</div>';
  
  html += '<div class="workspace-tags-section">';
  html += '<div class="workspace-tags-header">';
  html += '<h4>AI Generated Tags</h4>';
  html += '<button class="primary" data-generate-tags="' + index + '">Generate tags</button>';
  html += '</div>';
  html += '<div class="workspace-tags-list" id="tagsList-' + index + '">';
  
  if (workspace.generatedTags && workspace.generatedTags.length > 0) {
    workspace.generatedTags.forEach(function(tag) {
      html += '<div class="tag-chip"><span class="tag-label">' + tag.name + '</span><span class="tag-count">' + tag.count + '</span></div>';
    });
  } else {
    html += '<p class="muted" style="padding: 16px; text-align: center; font-size: 14px;">No tags generated yet. Click "Generate tags" to analyze messages.</p>';
  }
  
  html += '</div>';
  html += '</div>';
  
  if (workspace.recentFiles && workspace.recentFiles.length > 0) {
    html += '<div class="workspace-attachments"><h4>Recent files</h4>';
    workspace.recentFiles.forEach(function(file) {
      html += '<div class="attachment-sample"><div class="attachment-icon">' + file.type + '</div><div class="attachment-name"><p class="attachment-name-text">' + file.name + '</p><div class="attachment-date">' + file.date + '</div></div></div>';
    });
    html += '</div>';
  }
  
  detailContent.innerHTML = html;
  detailPanel.style.display = 'block';
  document.getElementById('workspacesList').parentElement.style.display = 'none';
  
  // Attach tag generation button handler
  const generateTagsBtn = detailContent.querySelector('[data-generate-tags]');
  if (generateTagsBtn) {
    generateTagsBtn.addEventListener('click', function() {
      generateWorkspaceTags(index);
    });
  }
}

function generateWorkspaceTags(workspaceIndex) {
  const workspace = workspaces[workspaceIndex];
  if (!workspace) return;
  
  // Simulate AI tag generation
  const sampleTags = [
    { name: 'Work', count: Math.floor(Math.random() * 100) + 20 },
    { name: 'Family', count: Math.floor(Math.random() * 80) + 10 },
    { name: 'Photos', count: Math.floor(Math.random() * 60) + 15 },
    { name: 'Important', count: Math.floor(Math.random() * 40) + 5 },
    { name: 'Urgent', count: Math.floor(Math.random() * 30) + 3 },
    { name: 'Meeting', count: Math.floor(Math.random() * 50) + 8 },
    { name: 'Project', count: Math.floor(Math.random() * 70) + 12 },
    { name: 'Social', count: Math.floor(Math.random() * 45) + 6 }
  ];
  
  workspace.generatedTags = sampleTags;
  workspace.tags = sampleTags.reduce(function(sum, tag) { return sum + tag.count; }, 0);
  
  toast('Generated ' + sampleTags.length + ' tags for "' + workspace.name + '"');
  
  // Re-render workspace detail to show new tags
  showWorkspaceDetail(workspaceIndex);
  renderWorkspacesList();
}

const backToWorkspacesBtn = document.getElementById('backToWorkspacesBtn');
backToWorkspacesBtn.addEventListener('click', function() {
  document.getElementById('workspaceDetailPanel').style.display = 'none';
  document.getElementById('workspacesList').parentElement.style.display = 'block';
});

// Emotion scan
scanEmotionBtn.addEventListener('click', function() {
  const sample = emotionInput.value.trim() || 'Sample message for emotion detection';
  if (!sample) {
    toast('Paste or type a message to scan.');
    return;
  }
  emotions.unshift({ who: 'AI Scan', tone: 'Detected: thoughtful - slightly stressed', msg: sample });
  renderEmotions();
  toast('Emotion scan completed');
});

// Login
if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    openLoginOverlay();
  });
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
  loginDismissBtn.addEventListener('click', function() {
    closeLoginOverlay();
    showPage('dashboard');
  });
}

// Senior mode toggle
seniorToggle.addEventListener('change', function(e) {
  if (e.target.checked) {
    appRoot.classList.add('senior');
    addBackToSeniorButtons();
    updateBackButtons();
    showSeniorView();
  } else {
    appRoot.classList.remove('senior');
    updateBackButtons();
    showPage('dashboard');
  }
});

// Senior mode exit button
const seniorExitBtn = document.getElementById('seniorExitBtn');
if (seniorExitBtn) {
  seniorExitBtn.addEventListener('click', function() {
    seniorToggle.checked = false;
    appRoot.classList.remove('senior');
    updateBackButtons();
    showPage('dashboard');
  });
}

// Sidebar collapse
sidebarToggle.addEventListener('click', function() {
  const sidebar = document.querySelector('.sidebar');
  const app = document.querySelector('.app');
  sidebar.classList.toggle('collapsed');
  
  if (sidebar.classList.contains('collapsed')) {
    app.style.gridTemplateColumns = '86px 1fr';
    sidebar.style.width = '86px';
    sidebarToggle.textContent = '▶';
  } else {
    app.style.gridTemplateColumns = '280px 1fr';
    sidebar.style.width = '280px';
    sidebarToggle.textContent = '◀';
  }
});

// Initialize
addBackToSeniorButtons();
renderWorkspacesList();
renderQueue();
renderContextual();
renderEmotions();
showPage('dashboard');

// Dashboard card navigation
const dashboardCards = document.querySelectorAll('.dashboard-card');
dashboardCards.forEach(function(card) {
  card.addEventListener('click', function() {
    const pageName = card.getAttribute('data-page');
    if (pageName) {
      showPage(pageName);
    }
  });
});



// Back to senior view from pages (when in senior mode)
function addBackToSeniorButtons() {
  const pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    const topbar = page.querySelector('.topbar');
    if (topbar && !topbar.querySelector('.back-to-senior')) {
      const backBtn = document.createElement('button');
      backBtn.className = 'ghost back-to-senior';
      backBtn.textContent = '← Back';
      backBtn.style.display = 'none';
      backBtn.addEventListener('click', function() {
        page.classList.remove('active');
        showSeniorView();
      });
      topbar.insertBefore(backBtn, topbar.firstChild);
    }
  });
}

// Show/hide back buttons based on senior mode
function updateBackButtons() {
  const backBtns = document.querySelectorAll('.back-to-senior');
  backBtns.forEach(function(btn) {
    btn.style.display = appRoot.classList.contains('senior') ? 'block' : 'none';
  });
}
