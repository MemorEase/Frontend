document.addEventListener('DOMContentLoaded', function () {
    console.log('Loaded flashcards.js');


    let currentCardIndex = 0;
    let studySets = JSON.parse(localStorage.getItem('studySets')) || [];
    let currentStudySetIndex = parseInt(localStorage.getItem('currentStudySetIndex'), 10);


    console.log('Current Study Set Index:', currentStudySetIndex);


    // Check if the selected study set exists in studySets array
    if (currentStudySetIndex >= studySets.length) {
        console.error('Selected study set not found.');
        return;
    }


    // Populate the dropdown menu with study sets
    function populateDropdown() {
        const studySetDropdown = document.getElementById('study-set-dropdown');
        studySets.forEach((set, index) => {
            if (set) { // Ensure that 'set' is not null or undefined
                const option = document.createElement('option');
                option.value = index;
                option.textContent = set.title; // Assuming 'title' is a defined property
                studySetDropdown.appendChild(option);
            }
        });


        // Select the current study set
        studySetDropdown.value = currentStudySetIndex;
    }


    // Function to change the current study set when the dropdown selection changes
    function changeStudySet(index) {
        if (index >= 0 && index < studySets.length) {
            currentStudySetIndex = index;
            localStorage.setItem('currentStudySetIndex', currentStudySetIndex);
            flashcards = studySets[currentStudySetIndex].flashcards;
            currentCardIndex = 0;
            showCard();
        }
    }


    let flashcards = studySets[currentStudySetIndex].flashcards;


    if (!flashcards) {
        console.error('No flashcards property found for the current study set.');
        return; // Exit the function to avoid further errors
    }


    function showCard() {
        if (flashcards.length > 0) {
            const card = flashcards[currentCardIndex];
            const flashcardQuestion = document.getElementById('flashcard-question');
            const flashcardAnswer = document.getElementById('flashcard-answer');


            flashcardQuestion.innerText = card.term; // Make sure 'term' is the correct property name
            flashcardAnswer.innerText = card.definition; // Make sure 'definition' is the correct property name
        } else {
            document.getElementById('flashcard-question').innerText = "No cards available";
            document.getElementById('flashcard-answer').innerText = "";
        }
    }


    document.getElementById('flashcard').addEventListener('click', function () {
        this.classList.toggle('is-flipped');
    });


    document.getElementById('prev-button').addEventListener('click', function () {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            showCard();
        }
    });


    document.getElementById('next-button').addEventListener('click', function () {
        if (currentCardIndex < flashcards.length - 1) {
            currentCardIndex++;
            showCard();
        }
    });


    // Event listener for the dropdown selection change
    document.getElementById('study-set-dropdown').addEventListener('change', function () {
        changeStudySet(parseInt(this.value, 10));
    });


    // Populate the dropdown and show the initial study set
    populateDropdown();
    showCard();
});
