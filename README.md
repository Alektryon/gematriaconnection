# Gematria Calculator

### Based on [Gematrinator.com](https://www.gematrinator.com/calculator/index.php) (original calculator by Derek Tikkuri)
---

### List of features:
<ul>
<li>Phrase Box
  <ul>
  <li>Press "Enter" to add phrase to history table</li>
  <li>Box is cleared automatically on "Enter", press "Del" to clear manually</li>
  <li>Press "Shift - Enter" to preserve contents when a new phrase is added</li>
  <li>Phrase can be removed from history with "Del" if it is present (use Up/Down arrows to cycle through history)</li>
  <li>Press "End" to add current phrase (sentence) as a list of words and phrases</li>
  <li>Press "Home" to remove all entries from history table</li>
  <li>Drag & Drop a .txt file to load phrases into history table (line by line, option to load saved ciphers)</li>
  </ul>
</li>
<li>Highlight Box
  <ul>
  <li>Highlight values inside history table, type space delimited numbers (e.g - 8 10 12)</li>
  <li>Press "Del" to clear highlight box contents</li>
  <li>Press "Insert" to automatically highlight all available matches</li>
  <li>Press "Enter" to filter only matching phrases (snapshot of history is saved)</li>
  <li>Press "Ctrl - Delete" to clear filter and revert any changes to history (or press "X" button next to the highlight box)</li>
  <li>New option: "Filter - Show Matching Ciphers" (ciphers with no matches are not displayed, enabled by default)</li>
  <li>New option: "Filter - Same Cipher Match" (show only phrases that match in the same cipher, note: choose only one option)</li>
  <li>New option: "Weighted Auto Highlighter" - auto highlighter ("Insert") is color graded based on frequency of matches (non-linear)</li>
  </ul>
</li>
<li>Cipher Chart
  <ul>
  <li>"Left Click" on letters/numbers to highlight cells</li>
  </ul>
</li>
<li>History Table
  <ul>
  <li>"Left click" on value makes all matching values blink</li>
  <li>"Ctrl + Left Click" adds cell value to highlight box (note: history table is recalculated)</li>
  <li>"Right Click" on cell to hide/show that particular cell</li>
  <li>"Ctrl + Left Click" on phrase in history table selects that phrase and loads it into search box (press "Del" to remove phrase)</li>
  <li>"Ctrl + Left Click" on cipher name in history table disables that cipher</li>
  <li>New option: "Compact History Table" - no cipher names, no break every 25 phrases, only values are displayed</li>
  </ul>
</li>
</ul>

### Additional Functionality:
- Copy/save cipher chart or history table as an image (no need to do screenshots)
- Copy/save word breakdown chart as an image
- Export history table as a CSV file (semicolon as delimiter), can be loaded back into the calculator or Excel
- Added "Compact" word breakdown option from test version by Gematrinator

### Ciphers:
- Added "Empty" button to disable all active ciphers
- Added "English (special)" cipher category
- Added "Custom" cipher category (English alphabet, fully customizable)
- Added "Russian" cipher category

### Miscellaneous:
- Characters with diacritic marks are recognized properly (Latin, Greek)
- Removed history limit (100 items)
- Phrase is no longer added to history on mouse over ciphers (unfinished phrases cannot be added accidentally)
- History table is automatically updated on cipher toggle
- All available matches found with auto highlighter are displayed in console (debug)
- New option: "Matrix Code Rain" - disable dynamic background if you prefer "classic" gray color background
- CSS changes (visual style)
- Removed unused code

---

### More custom ciphers
There is a way to temporarily add multiple properly named and colored custom ciphers.
1. Open the page with "Experimental" calculator in your browser
2. Open "Developer Tools" in browser (press "F12" or "Ctrl+Shift+I")
3. Switch to "Console" tab, paste the code below and press "Enter"
4. A new cipher under "Other" category will be added and it will be available until you reload the page

```
cipherName = "Test Cipher";
ciphCategory = "Other";
R = 110;
G = 179;
B = 77;
lowerCaseValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
upperCaseValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

// ======================

allCiphers[allCiphers.length] = new cipher(cipherName, "English", R, G, B);
cipherArray[cipherName] = ciphCategory;
allCiphers[allCiphers.length-1].vArr = lowerCaseValues;
allCiphers[allCiphers.length-1].vArr2 = upperCaseValues;
Build_Open_Ciphers();
```
