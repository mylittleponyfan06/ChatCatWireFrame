// Page-specific shared functions

// Workspaces page functions
function renderWorkspacesList() {
  const listEl = document.getElementById('workspacesList');
  if (!listEl) return;
  
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
    
    if (infoSection) {
      infoSection.addEventListener('click', function() {
        showWorkspaceDetail(index);
      });
    }
    
    if (editBtn) {
      editBtn.addEventListener('click', function() {
        renameWorkspace(index);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function() {
        deleteWorkspace(index);
      });
    }
    
    listEl.appendChild(item);
  });
}

function renderQueue() {
  const queueEl = document.getElementById('queueList');
  if (!queueEl) return;
  
  queueEl.innerHTML = '';
  queue.forEach(function(q) {
    const li = document.createElement('li');
    li.className = 'list__item';
    li.innerHTML = '<span>' + q.file + '</span><span class="muted">' + q.status + '</span>';
    queueEl.appendChild(li);
  });
}

function renderEmotions() {
  const emotionEl = document.getElementById('emotionList');
  if (!emotionEl) return;
  
  emotionEl.innerHTML = '';
  emotions.forEach(function(e) {
    const card = document.createElement('div');
    card.className = 'emotion__item';
    card.innerHTML = '<p class="emotion__title">' + e.who + '</p><p class="emotion__tone">' + e.tone + '</p><p class="muted">"' + e.msg + '"</p>';
    emotionEl.appendChild(card);
  });
}

function renderRecentUploads() {
  const uploadsList = document.getElementById('uploadsList');
  if (!uploadsList) return;
  
  uploadsList.innerHTML = '';
  recentUploads.forEach(function(upload) {
    const item = document.createElement('div');
    item.className = 'upload-item';
    const statusClass = upload.status === 'completed' ? 'completed' : 'processing';
    item.innerHTML = '<div class="upload-status"><div class="status-dot ' + statusClass + '"></div><div><p class="upload-name">' + upload.name + '</p><p class="upload-meta">' + upload.time + '</p></div></div><button class="ghost" style="font-size: 12px;">⋮</button>';
    uploadsList.appendChild(item);
  });
}

function showWorkspaceDetail(index) {
  const workspace = workspaces[index];
  if (!workspace) return;
  
  const detailPanel = document.getElementById('workspaceDetailPanel');
  const detailTitle = document.getElementById('workspaceDetailTitle');
  const detailContent = document.getElementById('workspaceDetailContent');
  
  if (!detailPanel || !detailTitle || !detailContent) return;
  
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
  
  html += '</div></div>';
  
  if (workspace.recentFiles && workspace.recentFiles.length > 0) {
    html += '<div class="workspace-attachments"><h4>Recent files</h4>';
    workspace.recentFiles.forEach(function(file) {
      html += '<div class="attachment-sample"><div class="attachment-icon">' + file.type + '</div><div class="attachment-name"><p class="attachment-name-text">' + file.name + '</p><div class="attachment-date">' + file.date + '</div></div></div>';
    });
    html += '</div>';
  }
  
  detailContent.innerHTML = html;
  detailPanel.style.display = 'block';
  const listPanel = document.querySelector('.panel');
  if (listPanel) listPanel.style.display = 'none';
  
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
  showWorkspaceDetail(workspaceIndex);
  renderWorkspacesList();
}

function createWorkspace() {
  const input = document.getElementById('workspaceNameInput');
  const name = input ? input.value.trim() : '';
  if (!name) {
    toast('Workspace name required.');
    return;
  }
  workspaces.push({ name: name, tags: 0, attachments: 0, messages: 0, recentFiles: [] });
  renderWorkspacesList();
  if (input) input.value = '';
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

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
  // Workspaces page setup
  const createWorkspaceBtn = document.getElementById('createWorkspaceBtn');
  const workspaceNameInput = document.getElementById('workspaceNameInput');
  const backToWorkspacesBtn = document.getElementById('backToWorkspacesBtn');
  const importBtn = document.getElementById('importBtn');
  
  if (createWorkspaceBtn) {
    createWorkspaceBtn.addEventListener('click', createWorkspace);
  }
  
  if (workspaceNameInput) {
    workspaceNameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') createWorkspace();
    });
  }
  
  if (backToWorkspacesBtn) {
    backToWorkspacesBtn.addEventListener('click', function() {
      document.getElementById('workspaceDetailPanel').style.display = 'none';
      document.querySelector('.panel').style.display = 'block';
    });
  }
  
  if (importBtn) {
    importBtn.addEventListener('click', function() {
      const fileName = 'whatsapp-import-' + Date.now().toString().slice(-4) + '.zip';
      queue.unshift({ file: fileName, status: 'Queued now' });
      renderQueue();
      toast('Import added to queue.');
    });
  }
  
  // Emotion scan page setup
  const scanEmotionBtn = document.getElementById('scanEmotionBtn');
  const emotionInput = document.getElementById('emotionInput');
  
  if (scanEmotionBtn) {
    scanEmotionBtn.addEventListener('click', function() {
      const sample = emotionInput ? emotionInput.value.trim() : '';
      if (!sample) {
        toast('Paste or type a message to scan.');
        return;
      }
      emotions.unshift({ who: 'AI Scan', tone: 'Detected: thoughtful - slightly stressed', msg: sample });
      renderEmotions();
      toast('Emotion scan completed');
    });
  }
  
  // Upload page setup
  const browseBtn = document.getElementById('browseBtn');
  const fileInput = document.getElementById('fileInput');
  const scanBtn = document.getElementById('scanBtn');
  const uploadProgress = document.getElementById('uploadProgress');
  
  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', function() {
      fileInput.click();
    });
  }
  
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        simulateUpload(file.name);
      }
    });
  }
  
  if (scanBtn) {
    scanBtn.addEventListener('click', function() {
      toast('Scanning uploaded file...');
    });
  }
  
  // Workspaces page - file search functionality
  const searchInput = document.querySelector('.files-search');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const fileRows = document.querySelectorAll('.file-row');
      let visibleCount = 0;
      
      fileRows.forEach(function(row) {
        const fileName = row.querySelector('.file-name').textContent.toLowerCase();
        const shouldShow = fileName.includes(searchTerm);
        row.style.display = shouldShow ? 'flex' : 'none';
        if (shouldShow) visibleCount++;
      });
      
      if (visibleCount === 0 && searchTerm.length > 0) {
        toast('No files matching "' + searchTerm + '"');
      }
    });
  }

  // File checkbox tracking
  const fileCheckboxes = document.querySelectorAll('.file-checkbox');
  fileCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function(e) {
      const checkedCount = Array.from(fileCheckboxes).filter(cb => cb.checked).length;
      const exportBtn = document.querySelector('.files-toolbar .primary');
      
      if (exportBtn) {
        if (checkedCount > 0) {
          exportBtn.textContent = 'Export ' + checkedCount + ' Selected';
        } else {
          exportBtn.textContent = 'Export Selected';
        }
      }
    });
  });

  // New project button
  const newProjectBtn = document.getElementById('newProjectBtn');
  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', function() {
      const projectName = prompt('Enter new project name:');
      if (projectName && projectName.trim()) {
        toast('Project "' + projectName.trim() + '" would be created');
      }
    });
  }

  // Export buttons on file rows
  const exportButtons = document.querySelectorAll('.file-actions .ghost');
  exportButtons.forEach(function(btn) {
    if (btn.textContent.toLowerCase().includes('export')) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const fileName = e.target.closest('.file-row').querySelector('.file-name').textContent;
        toast('Starting export: ' + fileName);
      });
    }
  });

  // Category card interactions
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(function(card, index) {
    card.addEventListener('click', function() {
      const categoryName = card.querySelector('.category-name').textContent;
      toast('Viewing ' + categoryName + ' category');
    });
    
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Preview card interactions
  const previewCards = document.querySelectorAll('.preview-card');
  previewCards.forEach(function(card) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function() {
      const fileName = card.querySelector('.preview-name').textContent;
      toast('Preview: ' + fileName);
    });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Breadcrumb navigation
  const breadcrumbs = document.querySelectorAll('.breadcrumb-item');
  breadcrumbs.forEach(function(crumb) {
    crumb.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        crumb.click();
      }
    });
  });

  // Emotion scan page initialization
  const chatSelect = document.getElementById('chatSelect');
  const toFactsFeelingsBtn = document.getElementById('toFactsFeelingsBtn');
  const toDraftComposerBtn = document.getElementById('toDraftComposerBtn');

  if (chatSelect) {
    chatSelect.addEventListener('change', function(e) {
      selectedChat = e.target.value;
      if (selectedChat) {
        toast('Selected: ' + selectedChat);
      }
    });
  }

  if (toFactsFeelingsBtn) {
    toFactsFeelingsBtn.addEventListener('click', function() {
      if (!selectedChat) {
        toast('Please select a chat first');
        return;
      }
      navigateToScreen('emotion-facts-feelings');
    });
  }

  if (toDraftComposerBtn) {
    toDraftComposerBtn.addEventListener('click', function() {
      navigateToScreen('emotion-draft-composer');
    });
  }

  // Emotion scan screen 2
  const backToMainBtn = document.getElementById('backToMainBtn');
  if (backToMainBtn) {
    backToMainBtn.addEventListener('click', function() {
      navigateToScreen('emotion-main');
    });
  }

  // Emotion scan screen 3
  const backToMainBtn2 = document.getElementById('backToMainBtn2');
  const toRewriteSuggestionsBtn = document.getElementById('toRewriteSuggestionsBtn');
  const draftText = document.getElementById('draftText');

  if (backToMainBtn2) {
    backToMainBtn2.addEventListener('click', function() {
      navigateToScreen('emotion-main');
    });
  }

  if (toRewriteSuggestionsBtn) {
    toRewriteSuggestionsBtn.addEventListener('click', function() {
      if (draftText && draftText.value.trim()) {
        draftMessage = draftText.value;
        navigateToScreen('emotion-rewrite');
      } else {
        toast('Please write a message first');
      }
    });
  }

  // Tone preset selection
  const tonePills = document.querySelectorAll('#emotion-draft-composer .pill');
  tonePills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      tonePills.forEach(function(p) {
        p.style.background = 'transparent';
        p.style.border = '1px solid var(--border)';
      });
      this.style.background = 'var(--panel-strong)';
      this.style.border = '2px solid var(--accent)';
    });
  });

  // Emotion scan screen 4
  const backToComposerBtn = document.getElementById('backToComposerBtn');
  const toPreviewBtn = document.getElementById('toPreviewBtn');

  if (backToComposerBtn) {
    backToComposerBtn.addEventListener('click', function() {
      navigateToScreen('emotion-draft-composer');
    });
  }

  if (toPreviewBtn) {
    toPreviewBtn.addEventListener('click', function() {
      navigateToScreen('emotion-preview');
    });
  }

  // Tone option selection in rewrite
  const screenRewriteTones = document.querySelectorAll('#emotion-rewrite .pill');
  screenRewriteTones.forEach(function(pill) {
    pill.addEventListener('click', function() {
      screenRewriteTones.forEach(function(p) {
        p.style.background = 'transparent';
        p.style.border = '1px solid var(--border)';
      });
      this.style.background = 'linear-gradient(135deg, rgba(88, 198, 255, 0.15), rgba(106, 228, 184, 0.15))';
      this.style.border = '2px solid var(--accent)';
    });
  });

  // Emotion scan screen 5
  const backToRewriteBtn = document.getElementById('backToRewriteBtn');
  const backToComposerFromPreviewBtn = document.getElementById('backToComposerFromPreviewBtn');

  if (backToRewriteBtn) {
    backToRewriteBtn.addEventListener('click', function() {
      navigateToScreen('emotion-rewrite');
    });
  }

  if (backToComposerFromPreviewBtn) {
    backToComposerFromPreviewBtn.addEventListener('click', function() {
      navigateToScreen('emotion-draft-composer');
    });
  }

  // Copy to clipboard
  const copyBtn = document.querySelector('#emotion-preview .primary');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const previewText = document.querySelector('#emotion-preview .message-item, #emotion-preview [style*="background: var(--panel-strong)"]');
      if (previewText) {
        const textToCopy = draftMessage || 'Message content';
        navigator.clipboard.writeText(textToCopy).then(function() {
          toast('Copied to clipboard!');
        });
      }
    });
  }

  // Adjustment toggles
  const adjustmentRadios = document.querySelectorAll('input[name="adjustment"]');
  adjustmentRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      const label = this.closest('.toggle');
      if (label) {
        if (this.checked) {
          label.style.opacity = '1';
          const otherLabel = document.querySelector('.toggle:not([style*="opacity"])');
          if (otherLabel && otherLabel !== label) {
            otherLabel.style.opacity = '0.6';
          }
        }
      }
    });
  });
  
  // Render initial data
  renderWorkspacesList();
  renderQueue();
  renderEmotions();
  renderRecentUploads();
});

// Simulate file upload with progress
function simulateUpload(fileName) {
  const uploadProgress = document.getElementById('uploadProgress');
  const progressFill = document.getElementById('progressFill');
  const fileNameSpan = document.getElementById('fileName');
  
  if (uploadProgress && progressFill && fileNameSpan) {
    uploadProgress.style.display = 'block';
    fileNameSpan.textContent = fileName;
    
    let progress = 0;
    const interval = setInterval(function() {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      progressFill.style.width = progress + '%';
      
      if (progress === 100) {
        clearInterval(interval);
        recentUploads.unshift({ name: fileName, time: 'Just now', status: 'completed' });
        renderRecentUploads();
        setTimeout(function() {
          uploadProgress.style.display = 'none';
          progressFill.style.width = '0%';
        }, 1000);
        toast('File uploaded successfully!');
      }
    }, 300);
  }
}

// Workspaces page functions - Screen switching
function switchScreen(screenName) {
  const screens = document.querySelectorAll('.workspace-screen');
  screens.forEach(function(screen) {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById('screen-' + screenName);
  if (targetScreen) {
    targetScreen.classList.add('active');
    const firstButton = targetScreen.querySelector('button');
    if (firstButton) {
      setTimeout(function() { firstButton.focus(); }, 100);
    }
  }
}

// Switch to category in workspaces
let currentCategory = 'Drafts';
function switchToCategory(categoryName) {
  currentCategory = categoryName;
  const filesSectionName = document.getElementById('files-section-name');
  if (filesSectionName) {
    filesSectionName.textContent = categoryName;
  }
  
  const incomingView = document.getElementById('files-incoming-view');
  const draftsView = document.getElementById('files-drafts-view');
  const exportView = document.getElementById('files-export-view');
  
  if (categoryName === 'Incoming Files') {
    if (incomingView) incomingView.style.display = 'block';
    if (draftsView) draftsView.style.display = 'none';
    if (exportView) exportView.style.display = 'none';
  } else if (categoryName === 'Final Deliverables') {
    if (incomingView) incomingView.style.display = 'none';
    if (draftsView) draftsView.style.display = 'none';
    if (exportView) exportView.style.display = 'block';
  } else {
    if (incomingView) incomingView.style.display = 'none';
    if (draftsView) draftsView.style.display = 'block';
    if (exportView) exportView.style.display = 'none';
  }
  
  switchScreen('files');
}

// Toggle all file checkboxes
function toggleAllCheckboxes() {
  const checkboxes = document.querySelectorAll('.file-checkbox');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = !allChecked;
  });
  
  const exportBtn = document.querySelector('.files-toolbar .primary');
  const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
  
  if (exportBtn) {
    if (checkedCount > 0) {
      exportBtn.textContent = 'Export ' + checkedCount + ' Selected';
      toast(checkedCount + ' file(s) selected for export');
    } else {
      exportBtn.textContent = 'Export Selected';
    }
  }
}

// Export file
function exportFile(fileName) {
  toast('Exporting: ' + fileName);
}

// Handle category drop
function handleCategoryDrop(categoryName) {
  toast('Files would be categorized as: ' + categoryName);
}

// Emotion scan functions
let selectedChat = null;
let draftMessage = null;

function navigateToScreen(screenId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(screenId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo(0, 0);

    if (screenId === 'emotion-facts-feelings' && selectedChat) {
      const s2ChatTitle = document.getElementById('s2ChatTitle');
      if (s2ChatTitle) {
        s2ChatTitle.textContent = selectedChat + ' - Analysis';
      }
    }
  }
}
