// DIALOGUE REFERENCE GUIDE
// Copy and paste this template to create your own dialogues!

// ============================================
// HOW TO USE
// ============================================
// 1. Open src/App.jsx
// 2. Find the 'sampleDialogues' array
// 3. Replace it with your custom dialogues
// 4. Save the file and the page will auto-reload!

// ============================================
// DIALOGUE TEMPLATE
// ============================================
const myCustomDialogues = [
    {
        speaker: 'Character Name',  // Who is speaking
        text: 'What they say.\nUse \\n for new lines.'  // What they say
    },
    // Add more dialogues below...
];

// ============================================
// EXAMPLES FROM UNDERTALE
// ============================================

// Example 1: Sans
const sansDialogue = [
    {
        speaker: 'Sans',
        text: 'hey there, buddy.\nnice to see you again.'
    },
    {
        speaker: 'Sans',
        text: "you've been busy, huh?"
    },
    {
        speaker: 'Sans',
        text: "so i've got a question for ya.\ndo you think even the worst person\ncan change...?"
    }
];

// Example 2: Papyrus
const papyrusDialogue = [
    {
        speaker: 'Papyrus',
        text: 'HUMAN! I, THE GREAT PAPYRUS,\nWELCOME YOU TO OUR HOME!'
    },
    {
        speaker: 'Papyrus',
        text: 'I HAVE PREPARED A VARIETY\nOF PUZZLES FOR YOU!'
    },
    {
        speaker: 'Papyrus',
        text: 'NYEH HEH HEH!!!'
    }
];

// Example 3: Toriel
const torielDialogue = [
    {
        speaker: 'Toriel',
        text: 'Oh my, what a terrible creature,\ntormenting such a poor, innocent youth...'
    },
    {
        speaker: 'Toriel',
        text: 'Do not be afraid, my child.\nI am TORIEL, caretaker of the RUINS.'
    },
    {
        speaker: 'Toriel',
        text: 'I pass through this place every day\nto see if anyone has fallen down.'
    }
];

// Example 4: Flowey
const floweyDialogue = [
    {
        speaker: 'Flowey',
        text: "Howdy! I'm FLOWEY.\nFLOWEY the FLOWER!"
    },
    {
        speaker: 'Flowey',
        text: "You're new to the UNDERGROUND,\naren'tcha?"
    },
    {
        speaker: 'Flowey',
        text: "Golly, you must be so confused.\nSomeone ought to teach you\nhow things work around here!"
    }
];

// Example 5: Narrator / System Messages
const narratorDialogue = [
    {
        speaker: 'Narrator',
        text: '* The wind is howling...'
    },
    {
        speaker: 'Narrator',
        text: '* But nobody came.'
    },
    {
        speaker: 'Narrator',
        text: '* You feel your sins crawling\non your back.'
    }
];

// Example 6: Mixed Conversation
const conversationDialogue = [
    {
        speaker: 'Sans',
        text: 'hey, papyrus.'
    },
    {
        speaker: 'Papyrus',
        text: 'YES, BROTHER?'
    },
    {
        speaker: 'Sans',
        text: 'wanna hear a joke?'
    },
    {
        speaker: 'Papyrus',
        text: 'SANS! THIS IS NO TIME\nFOR YOUR AWFUL PUNS!'
    },
    {
        speaker: 'Sans',
        text: "what do you call a skeleton\nwho won't fight?"
    },
    {
        speaker: 'Sans',
        text: 'a NUMBSKULL.'
    },
    {
        speaker: 'Papyrus',
        text: 'SANS!!!!!!'
    }
];

// Example 7: Without Speaker (Pure Text)
const pureTextDialogue = [
    {
        speaker: '',  // Leave empty for no speaker name
        text: 'Long ago, two races ruled over Earth:\nHUMANS and MONSTERS.'
    },
    {
        speaker: '',
        text: 'One day, war broke out\nbetween the two races.'
    },
    {
        speaker: '',
        text: 'After a long battle,\nthe humans were victorious.'
    }
];

// ============================================
// TIPS FOR WRITING DIALOGUE
// ============================================
/*
1. Use \n for line breaks
2. Keep speaker names short and consistent
3. UPPERCASE for Papyrus (it's his style!)
4. Use * prefix for narrator messages (added automatically)
5. Keep each dialogue segment reasonably short
6. Test your dialogue to check timing and pacing
7. Emulate character voices from the game

Character Writing Tips:
- Sans: lowercase, casual, puns, lazy
- Papyrus: UPPERCASE, enthusiastic, dramatic
- Toriel: Motherly, kind, formal
- Flowey: Creepy cheerful, manipulative
- Undyne: PASSIONATE, HERO-LIKE
- Alphys: n-nervous, stammering, awkward
- Mettaton: DRAMATIC, FABULOUS, showbiz

Formatting Examples:
- Single line: "Hello, human."
- Two lines: "Hello, human.\nNice to meet you."
- Three lines: "Hello, human.\nNice to meet you.\nWelcome to the Underground."
*/

// ============================================
// QUICK START
// ============================================
// Replace the 'sampleDialogues' in App.jsx with any of the examples above!
