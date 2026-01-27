// Emotion Scan Multi-screen Navigation & Logic

// State
let selectedChat = null;
let draftMessage = null;
let selectedTone = null;
let selectedSuggestedText = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeEmotionScan();
});

function initializeEmotionScan() {
  // Screen 1: Main dashboard
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

  // Screen 2: Facts/Feelings/Requests
  const backToMainBtn = document.getElementById('backToMainBtn');
  if (backToMainBtn) {
    backToMainBtn.addEventListener('click', function() {
      navigateToScreen('emotion-main');
    });
  }
  
  // Set Reminder buttons on facts/feelings screen
  const setReminderBtns = document.querySelectorAll('#emotion-facts-feelings .primary');
  setReminderBtns.forEach(function(btn) {
    if (btn.textContent.includes('Set Reminder')) {
      btn.addEventListener('click', function() {
        const actionText = this.closest('.message-item').querySelector('p').textContent;
        toast('⏰ Reminder set for: ' + actionText);
      });
    }
  });

  // Screen 3: Draft Composer
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

  // Tone preset selection (Screen 3)
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

  // Screen 4: Rewrite Suggestions
  const backToComposerBtn = document.getElementById('backToComposerBtn');
  const editDraftBtn = document.getElementById('editDraftBtn');
  const toPreviewBtn = document.getElementById('toPreviewBtn');

  if (backToComposerBtn) {
    backToComposerBtn.addEventListener('click', function() {
      navigateToScreen('emotion-draft-composer');
    });
  }

  if (editDraftBtn) {
    editDraftBtn.addEventListener('click', function() {
      navigateToScreen('emotion-draft-composer');
    });
  }

  if (toPreviewBtn) {
    toPreviewBtn.addEventListener('click', function() {
      // Get the current suggested text from textarea
      const suggestedTextarea = document.querySelector('#emotion-rewrite textarea');
      if (suggestedTextarea) {
        selectedSuggestedText = suggestedTextarea.value;
      }
      navigateToScreen('emotion-preview');
    });
  }

  // Tone option selection (Screen 4)
  const screenRewriteTones = document.querySelectorAll('#emotion-rewrite .pill');
  screenRewriteTones.forEach(function(pill) {
    pill.addEventListener('click', function() {
      screenRewriteTones.forEach(function(p) {
        p.style.background = 'transparent';
        p.style.border = '1px solid var(--border)';
      });
      this.style.background = 'linear-gradient(135deg, rgba(88, 198, 255, 0.15), rgba(106, 228, 184, 0.15))';
      this.style.border = '2px solid var(--accent)';
      
      // Update suggested text based on tone selection
      const toneText = this.textContent.trim();
      const suggestedTextarea = document.querySelector('#emotion-rewrite textarea');
      
      // Store the selected tone
      selectedTone = toneText;
      
      if (suggestedTextarea) {
        if (toneText === 'Direct') {
          suggestedTextarea.value = 'I wanted to discuss the deadline for the project. I\'m currently managing multiple priorities and finding it challenging to focus due to ADHD-related difficulties. Could we review the timeline or priorities to ensure quality delivery?';
        } else if (toneText === 'Polite') {
          suggestedTextarea.value = 'I hope you\'re well Jeff! The project deadline feels quite challenging given my current workload and ADHD-related focus difficulties. Would it be possible to discuss adjusting the timeline or priorities?';
        } else if (toneText === 'Casual') {
          suggestedTextarea.value = 'This deadline feels a bit tight for me. I\'m juggling a lot right now and ADHD is making it tough to focus. Can we chat about adjusting the timeline or priorities?';
        }
        
        // Store the suggested text
        selectedSuggestedText = suggestedTextarea.value;
      }
    });
  });

  // Screen 5: Preview
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

  // Copy to clipboard button
  const copyBtn = document.querySelector('#emotion-preview .primary');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const previewText = document.querySelector('#emotion-preview .message-item, #emotion-preview [style*="background: var(--panel-strong)"]');
      if (previewText) {
        const textToCopy = selectedSuggestedText || draftMessage || 'Message content';
        navigator.clipboard.writeText(textToCopy).then(function() {
          toast('✓ Copied to clipboard!');
        }).catch(function() {
          toast('Failed to copy to clipboard');
        });
      }
    });
  }

  // Adjustment toggles (Screen 5)
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
}

function navigateToScreen(screenId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(screenId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo(0, 0);

    // Update chat title in Screen 2
    if (screenId === 'emotion-facts-feelings' && selectedChat) {
      const s2ChatTitle = document.getElementById('s2ChatTitle');
      if (s2ChatTitle) {
        s2ChatTitle.textContent = selectedChat + ' - Analysis';
      }
    }
    
    // Update preview message in Screen 5
    if (screenId === 'emotion-preview' && selectedSuggestedText) {
      const previewMessageDiv = document.querySelector('#emotion-preview [style*="background: linear-gradient"]');
      if (previewMessageDiv) {
        const messageParagraph = previewMessageDiv.querySelector('p');
        if (messageParagraph) {
          messageParagraph.textContent = selectedSuggestedText;
        }
      }
    }
  }
}

// Toast is defined in script-shared.js, but we ensure it's available
if (typeof toast === 'undefined') {
  window.toast = function(message) {
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
  };
}
