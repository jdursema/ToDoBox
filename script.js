////*ON LOAD TRIGGERS*////
$(document).ready(function() {

    reloadCards();
    // changeCompletionClass(id);
});


function reloadCards () {
	for(var i in localStorage) {
	newCard(JSON.parse(localStorage[i]))
	}
	
}
	


/*Store New Idea to Local Storage from Inputs*/
function pullFromStorage(id){
	var uniqueCard = JSON.parse(localStorage.getItem(id));
	return uniqueCard;
}


function storeIdea (card) {
	localStorage.setItem(card.id, JSON.stringify(card));
}

////*EVENT LISTENERS*////

/*Delete Card Button*/
$('.bottom-section').on('click', '#delete-button', function(){
	$(this).closest('article').remove();
	var getId = $(this).closest('article').attr('id');
	localStorage.removeItem(getId);
});

function Idea (title, body) {
	this.title = title;
	this.body = body; 
	this.status = 'Normal'; 
	this.id = Date.now();
	this.completion = false;
}

$('.save-btn').on('click', function(event){
	event.preventDefault();
	var title = $('#title-input').val();
	var body = $('#body-input').val();
	var status = 'Normal';
	var anotherIdea = new Idea (title, body, status);
	newCard(anotherIdea);
	storeIdea(anotherIdea);
	clearInput();	
});



function editBody(event){
var id = ($(this).closest('.idea-card').attr('id'));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
}
updateStorage(id, 'body', $(this).text());
}


function editTitle(event){
getID();
var id = ($(this).closest('.idea-card').attr('id'));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
}
updateStorage(id, 'title', $(this).text());

}

function downVote() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	var id = ($(this).closest('.idea-card').attr('id'));
	$qualitySpan.text(changeRank('down',$qualitySpan.text())); 
	updateStorage(id, 'status', $qualitySpan.text());

}

	
function upVote() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	var id = ($(this).closest('.idea-card').attr('id'));
	$qualitySpan.text(changeRank('up',$qualitySpan.text())); 
	updateStorage(id, 'status', $qualitySpan.text());
}


function searchIdea () {
	var userInput = $(this).val();
	$('.idea-card').each(function(index, card){
		if ($(this).children('.idea-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.idea-body').text().toLowerCase().includes(userInput.toLowerCase())) {
			$(this).show()
		} else {
			$(this).hide()
		}
	})
};



function clearInput() {
  $('#title-input').val("");
  $('#body-input').val("");
}

function newCard(idea) {
	console.log(idea)
	var classes = 'idea-card'
	if (idea.completion){
		classes = 'idea-card completed-task hide-completed-task'
		console.log('completed')
	}

	$(".idea-box").prepend( `
		<article id=${idea.id} class='${classes}'>
			<h3 class="idea-title" contenteditable=true >${idea.title}<span id="delete-button" ></span></h3>
			<p class="idea-body" contenteditable=true >
				${idea.body}
			</p>
			<p class="quality"><span id="up-vote-button" class="card-button"></span>
			<span id="down-vote-button" class="card-button"></span>Importance: <span class="idea-rank">${idea.status}</span><button class="complete">Completed Task</button></p>
			
		</article>
		`
	);
		
}



function changeRank(direction, currentRank) {
	var rankArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
	var increment = direction === 'down'? -1:1;
	var currentIndex = rankArray.indexOf(currentRank);
	if (currentRank + increment < 0 || currentRank + increment > rankArray.length - 1) {
		return rankArray[currentIndex];
	} else {
		return rankArray[currentIndex + increment];
	};
}





function changeCompletion (id){
	event.preventDefault();
	var getId = $(this).closest('article').attr('id');
	var object = pullFromStorage(getId);	
	var currentIdeaBox = $(event.target).closest(".idea-card");


	if (object.completion === true){
		object.completion = false;
		currentIdeaBox.removeClass('completed-task')
	}
	else if (object.completion===false){
		object.completion = true;
		currentIdeaBox.addClass('completed-task');
	}
	console.log(object);
	localStorage.setItem(getId,JSON.stringify(object));
	// changeCompletionClass(getId);
}


function changeCompletionClass(getId){
	var getId = $(this).closest('article').attr('id');
	var object = pullFromStorage(getId);
	var currentIdeaBox = $(event.target).closest(".idea-card");
		if (object.completion === true){
		currentIdeaBox.addClass('completed-task')
	}
		else if (object.completion === false){
			currentIdeaBox.removeClass('completed-task')
		}
};

function updateStorage(id, property, value){
	var storedObject = pullFromStorage(id);
	storedObject[property] = value;
	storeIdea(storedObject);
}

function showCompletedToDos(idea){
	var completedCards = $('.completed-task')
	console.log(completedCards)
	completedCards.toggleClass('hide-completed-task')
	
}


$('.bottom-section').on('keyup', '.idea-body', editBody);

$('.bottom-section').on('keyup', '.idea-title', editTitle);

$('.bottom-section').on('click', '#up-vote-button', upVote);

$('.bottom-section').on('click', '#down-vote-button', downVote);

$('.search-bar').on('keyup', searchIdea);

$('.idea-box').on('click', '.complete', changeCompletion)

$('#show-completed-btn').on('click', showCompletedToDos)

// function removeCompletedTask(){
// 	var currentIdeaBox = $(event.target).closest(".idea-card");
// 	if(event.target.className === 'completed-task'){
// 		currentIdeaBox.remove();
// 	}
// }

////////////NOTES////////////

// localStorage.setItem('ID Local Storage Knows', myObject);
// Date.now()
// localStorage.getItem(myObject.id)
// v

//To save old ideas:
//First needs to look at localStorage to see if there are ideas.
//If ideas are present, they are shown in lower half, represented as cards.

//For new idea:
//Get input from user: Title and the Body.
//Make a new card with those values.
//When card is created, it needs a unique value, based on when card when
//card was created and/or content of card.
//Pass unique value created to localStorage to pull from.