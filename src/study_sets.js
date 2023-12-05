document.addEventListener('DOMContentLoaded', function () {
    let studySets = JSON.parse(localStorage.getItem('studySets')) || [];
    let createSetButton = document.getElementById('create-set-button');
    let createSetForm = document.getElementById('create-set-form');
    let addCardButton = document.getElementById('add-card-button');
    let doneButton = document.getElementById('done-button');
    let saveSetButton = document.getElementById('save-set-button');
    let termDefinitionContainer = document.getElementById('term-definition-container');
    let flashcardsContainer = document.getElementById('flashcards-container');
    let currentFlashcards = [];
    let editingSetIndex = -1;
 
    function showStudySets() {
      const studySetsList = document.getElementById('study-sets');
      studySetsList.innerHTML = '';
      studySets.forEach((set, index) => {
        if (set) { // Ensure that 'set' is not null or undefined
          const listItem = document.createElement('li');
          const button = document.createElement('button');
          button.textContent = set.title; // Assuming 'title' is a defined property
          button.className = 'study-set-button';
          button.onclick = function () {
            localStorage.setItem('currentStudySetIndex', index);
            currentFlashcards = set.flashcards || [];
            showFlashcards();
          };
          listItem.appendChild(button);
 
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit Set';
          editButton.className = 'edit-set-button';
          editButton.setAttribute('data-index', index);
          editButton.onclick = function() { handleEditSet(index); };
          listItem.appendChild(editButton);
 
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete Set';
          deleteButton.className = 'delete-set-button';
          deleteButton.onclick = function() { handleDeleteSet(index); };
          listItem.appendChild(deleteButton);
 
          studySetsList.appendChild(listItem);
        }
      });
    }
 
    function handleEditSet(index) {
      const setToEdit = studySets[index];
      if (setToEdit) {
        document.getElementById('set-title').value = setToEdit.title;
        document.getElementById('set-description').value = setToEdit.description;
        termDefinitionContainer.innerHTML = '';
        currentFlashcards = setToEdit.flashcards || [];
        currentFlashcards.forEach(card => addTermAndDefinitionInputs(card.term, card.definition));
        editingSetIndex = index; // Set editing index to the selected set
 
        createSetForm.style.display = 'block';
        addCardButton.style.display = 'block';
        saveSetButton.style.display = 'block';
        doneButton.style.display = 'none';
        flashcardsContainer.innerHTML = '';
        document.getElementById('done-button').style.display = 'block';

      }
      document.getElementById('done-button').addEventListener('click', function() {
        if (editingSetIndex >= 0) {
          // Set the currentStudySetIndex in localStorage to the index of the set being edited
          localStorage.setItem('currentStudySetIndex', editingSetIndex);
        } else {
          // If not editing (meaning a new set is saved), set the index of the new set
          localStorage.setItem('currentStudySetIndex', studySets.length - 1);
        }
        // Navigate to flashcards.html
        window.location.href = 'flashcards.html';
      });
    }
 
    function handleDeleteSet(index) {
      studySets.splice(index, 1);
      localStorage.setItem('studySets', JSON.stringify(studySets));
      showStudySets();
    }
 
    function saveStudySet() {
      const setTitle = document.getElementById('set-title').value.trim();
      const setDescription = document.getElementById('set-description').value.trim();
 
      if (!setTitle) {
        alert('Please enter a title for the set.');
        return; // Don't save the set if no title is provided
      }
 
      const newStudySet = {
        title: setTitle,
        description: setDescription,
        flashcards: currentFlashcards,
      };
 
      if (editingSetIndex >= 0) {
        studySets[editingSetIndex] = newStudySet;
      } else {
        studySets.push(newStudySet);
      }
 
      localStorage.setItem('studySets', JSON.stringify(studySets));
      showStudySets();
 
      document.getElementById('set-title').value = '';
      document.getElementById('set-description').value = '';
      termDefinitionContainer.innerHTML = '';
      currentFlashcards = [];
      editingSetIndex = -1; // Reset editing index
      document.getElementById('done-button').style.display = 'block';

    }

   
 
    function addTermAndDefinitionInputs(term = '', definition = '') {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'input-container';
 
      const termInput = document.createElement('input');
      termInput.type = 'text';
      termInput.className = 'input-field';
      termInput.placeholder = 'Enter Term';
      termInput.value = term;
 
      const definitionInput = document.createElement('input');
      definitionInput.type = 'text';
      definitionInput.className = 'input-field';
      definitionInput.placeholder = 'Enter Definition';
      definitionInput.value = definition;
 
      termInput.addEventListener('change', function(event) {
        let cardIndex = Array.from(termDefinitionContainer.children).indexOf(cardContainer);
        if (currentFlashcards[cardIndex]) {
          currentFlashcards[cardIndex].term = event.target.value;
        }
      });
 
      definitionInput.addEventListener('change', function(event) {
        let cardIndex = Array.from(termDefinitionContainer.children).indexOf(cardContainer);
        if (currentFlashcards[cardIndex]) {
          currentFlashcards[cardIndex].definition = event.target.value;
        }
      });
 
      cardContainer.appendChild(termInput);
      cardContainer.appendChild(definitionInput);
      termDefinitionContainer.appendChild(cardContainer);
 
      if (!term && !definition) {
        // Only push a new flashcard if both term and definition are empty (new card)
        currentFlashcards.push({ term: termInput.value, definition: definitionInput.value });
      }
    }
 
    function showFlashcards() {
      flashcardsContainer.innerHTML = '';
      currentFlashcards.forEach((flashcard, index) => {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <span class="flashcard-term">${flashcard.term}</span>
                </div>
                <div class="flashcard-back">
                    <span class="flashcard-definition">${flashcard.definition}</span>
                </div>
            </div>
        `;
 
        card.addEventListener('click', function () {
          card.classList.toggle('is-flipped');
        });
 
        flashcardsContainer.appendChild(card);
      });
    }
 
    // Event Listeners
    createSetButton.addEventListener('click', function () {
      createSetForm.style.display = 'block';
      addCardButton.style.display = 'block';
      saveSetButton.style.display = 'block';
      doneButton.style.display = 'none';
      flashcardsContainer.innerHTML = '';
      currentFlashcards = [];
      termDefinitionContainer.innerHTML = '';
      editingSetIndex = -1;
    });
 
    addCardButton.addEventListener('click', function () {
      addTermAndDefinitionInputs();
    });
 
    saveSetButton.addEventListener('click', saveStudySet);
 
    // Call showStudySets at the end to display any sets on initial load
    showStudySets();
  });
