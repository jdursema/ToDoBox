////*ON LOAD TRIGGERS*////
$(document).ready(function() {
    reloadCards();
});

// $(window).on('load', removeCompletedTask); 

////*LOCAL STORAGE FUNCTIONS*////

/*Pull Saved Ideas from Local Storage*/
function reloadCards () {
	for(var i in localStorage) {
		newCard(JSON.parse(localStorage[i]));
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
	var cardId = getId;
	localStorage.removeItem(cardId);
});

function Idea (title, body) {
	this.title = title;
	this.body = body; 
	this.status = 'swill'; 
	this.id = Date.now();
	this.completion = false;
}

$('.save-btn').on('click', function(event){
	event.preventDefault();
	var title = $('#title-input').val();
	var body = $('#body-input').val();
	var status = 'swill';
	var anotherIdea = new Idea (title, body, status);
	newCard(anotherIdea);
	storeIdea(anotherIdea);
	clearInput();	
});

/*Down Vote Button*/
$('.bottom-section').on('click', '#down-vote-button', function() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	var id = ($(this).closest('.idea-card').attr('id'));
	$qualitySpan.text(changeRank('down',$qualitySpan.text())); 
	setStatus(id, $qualitySpan)
})

// upvote
$('.bottom-section').on('click', '#up-vote-button', function() {
	var $qualitySpan = $(this).siblings('.idea-rank');
	var id = ($(this).closest('.idea-card').attr('id'));
	$qualitySpan.text(changeRank('up',$qualitySpan.text())); 
	setStatus(id, $qualitySpan);
})

$('.bottom-section').on('keyup', '.idea-body', editBody);

function editBody(event){
var id = ($(this).closest('.idea-card').attr('id'));
var uniqueCard = JSON.parse(localStorage.getItem(id));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
}
uniqueCard.body = $(this).text();
localStorage.setItem(id, JSON.stringify(uniqueCard));

}


$('.bottom-section').on('keyup', '.idea-title', editTitle);

function editTitle(event){
var id = ($(this).closest('.idea-card').attr('id'));
var uniqueCard = JSON.parse(localStorage.getItem(id));
if (event.keyCode === 13) {
	event.preventDefault();
	this.blur();
}
uniqueCard.title = $(this).text();
localStorage.setItem(id, JSON.stringify(uniqueCard));
updateStorage(id, 'title', $(this).text());

}



function setStatus (id, $qualitySpan) {
var uniqueCard = JSON.parse(localStorage.getItem(id));
uniqueCard.status = $qualitySpan.text();
localStorage.setItem(id, JSON.stringify(uniqueCard));
}




/*Search Evebnt Listener*/
$('.search-bar').on('keyup', function(){
	var userInput = $(this).val();
	$('.idea-card').each(function(index, card){
		if ($(this).children('.idea-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.idea-body').text().toLowerCase().includes(userInput.toLowerCase())) {
			$(this).show()
		} else {
			$(this).hide()
		}
	})
});

/*Up Vote Button*/




////*FUNCTIONS*////

/*Clear Fields Function*/
function clearInput() {
  $('#title-input').val("");
  $('#body-input').val("");
}

/*Prepend New Card Function*/
function newCard(idea) {
	$(".idea-box").prepend( `
		<article id=${idea.id} class="idea-card">
			<h3 class="idea-title" contenteditable=true >${idea.title}<span id="delete-button" ></span></h3>
			<p class="idea-body" contenteditable=true >
				${idea.body}
			</p>
			<p class="quality"><span id="up-vote-button" class="card-button"></span>
			<span id="down-vote-button" class="card-button"></span>quality: <span class="idea-rank">${idea.status}</span></p>
			<button class="complete">Completed Task</button
		</article>
		`
	);
}




/*Change Rank Up/Down Function*/
function changeRank(direction, currentRank) {
	var rankArray = ['swill', 'plausible', 'genius'];
	var increment = direction === 'down'? -1:1;
	var currentIndex = rankArray.indexOf(currentRank);
	if (currentRank + increment < 0 || currentRank + increment > rankArray.length - 1) {
		return rankArray[currentIndex];
	} else {
		return rankArray[currentIndex + increment];
	};
}

$('.idea-box').on('click', function(event){
	event.preventDefault();
	var currentIdeaBox = $(event.target).closest(".idea-card");
	var id =($(this).children('.idea-card').attr('id'));

	if(event.target.className ==='complete'){
		currentIdeaBox.toggleClass('completed-task');
	}
	changeCompletion(id);
})

function changeCompletion (id){
	var uniqueCard = JSON.parse(localStorage.getItem(id));
	if ($('.idea-card').hasClass('completed-task')){
		uniqueCard.completion = true;
	} else
		{uniqueCard.completion = false;}
	localStorage.setItem(id, JSON.stringify(uniqueCard))
}

function updateStorage(id, property ,value){
	var storedObject = pullFromStorage(id);
	console.log(storedObject, property, value)
	console.log(storedObject[property])
	storeObject[property] = value
	storeIdea(storeObject)
	// storeIdea(car)

}







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