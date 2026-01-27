# Contextual Search - Pre-set Sample Queries

## Purpose
Users can type exact query text to load sample results. This provides immediate examples of what contextual search can find without requiring actual AI matching.

## Sample Queries to Try

Type these **exactly** in the search bar to load sample results:

### 📎 Attachment-Based Queries
- **`soccer practice photos`** - Find multiple images tagged as sports
  - Result type: attachments (images + video)
  - Sample files: 5 items
  
- **`math assignment documents`** - Find homework-related PDFs and docs
  - Result type: documents
  - Sample files: 4 items

### 😠 Tone-Based Queries
- **`frustrated messages`** - Find messages with frustrated tone
  - Result type: messages
  - Sample count: 2 messages from different dates
  
- **`excited or celebratory`** - Find positive/celebratory messages
  - Result type: messages
  - Sample count: 3 messages

### 💼 Business/Task Queries
- **`invoices and receipts`** - Find financial documents
  - Result type: documents
  - Sample files: 6 items from Q3 2025
  
- **`deadline mentions`** - Find messages about deadlines
  - Result type: mixed (messages + attachments)
  - Sample count: 8 hits

### 🔎 Semantic Queries
- **`mentions of assignment`** - Broad search for school/work assignments
  - Result type: mixed
  - Sample count: 12 hits across math and chemistry
  
- **`birthday planning`** - Find birthday-related content
  - Result type: mixed
  - Sample count: 12 hits

---

## How It Works

**User Flow:**
1. User lands on Contextual Search page
2. Sees search input field with placeholder hints
3. Types one of the sample query texts (must match exactly)
4. Clicks "Search" or presses Enter
5. Sample results load instantly with 2-5 items
6. User can select items and tag them or add to workspace

**Custom Searches:**
- Any text that doesn't match a sample query will show a mock result
- Allows users to try their own searches and see the interaction pattern

**Workspace Integration:**
- Checkbox next to each result item to select
- Bulk action buttons: "Add to Workspace" + "Tag for Review"
- Simple toast confirmation when items are tagged/added
- Tag options: #interesting, #follow-up, #archive, #important

---

## Usage in Test

1. Observer provides sample query text to user
2. User types it in the search bar and hits Search
3. Sample results load instantly
4. Test observer watches to see if:
   - Users understand what the results mean
   - Users attempt to select and tag items
   - Users try to create workspaces from results
   - Tagging UX is intuitive
