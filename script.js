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
	
function showTenCards(){
	var $ideaCard = $('.idea-card')
	$ideaCard.each(function(index){
		if (index >= 10){
		($($ideaCard[index]).hide())
		}
	})
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
$('.bottom-section').on('click', '.delete-button', function(){
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
	var $domCard = $(this).closest('.idea-card');
	var previousQuality = $qualitySpan.text();
	$qualitySpan.text(changeRank('down',$qualitySpan.text())); 
	updateStorage($domCard.attr('id'), 'status', $qualitySpan.text());
	changeStatusClass($domCard, $qualitySpan.text(), previousQuality);

}

	
function upVote() {

	var $qualitySpan = $(this).siblings('.idea-rank');
	var $domCard = $(this).closest('.idea-card');
	var previousQuality = $qualitySpan.text();
	$qualitySpan.text(changeRank('up',$qualitySpan.text())); 
	updateStorage($domCard.attr('id'), 'status', $qualitySpan.text());
	changeStatusClass($domCard, $qualitySpan.text(), previousQuality);
	
}


function changeStatusClass ($card, status, previous) {


	$card.removeClass(previous).addClass(status)
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
	var classes = `All idea-card ${idea.status}`
	if (idea.completion){
		classes = classes + ' completed-task hide-completed-task'

	}

	$(".idea-box").prepend( `
		<article id=${idea.id} class='${classes}'>
			<h3 class="idea-title" contenteditable=true >${idea.title}<span class="delete-button" ></span></h3>
			<p class="idea-body" contenteditable=true >
				${idea.body}
			</p>
			<p class="quality"><span class = "up-vote-button card-button"></span>
			<span class= "down-vote-button card-button"></span>Importance: <span class="idea-rank">${idea.status}</span><button class="complete">Completed Task</button></p>
			
		</article>
		`
	);
	showTenCards()	
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
		currentIdeaBox.removeClass('completed-task hide-completed-task')
	}
	else if (object.completion===false){
		object.completion = true;
		currentIdeaBox.addClass('completed-task hide-completed-task');
	}
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
	completedCards.toggleClass('hide-completed-task')
	
}

function showNormal () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("Normal")) {
	}else{
		($($allCards[i]).hide());
	}
	}
}




//$( "#mydiv" ).hasClass( "foo" )




$('.bottom-section').on('keyup', '.idea-body', editBody);

$('.bottom-section').on('keyup', '.idea-title', editTitle);

$('.bottom-section').on('click', '.up-vote-button', upVote);

$('.bottom-section').on('click', '.down-vote-button', downVote);

$('.search-bar').on('keyup', searchIdea);

$('.idea-box').on('click', '.complete', changeCompletion)

$('#show-completed-btn').on('click', showCompletedToDos)

$('#show-all-btn').on('click', reloadCards)

$("#importance-filter").on('change', selectImportance) 

function selectImportance () {
	if ((this).value === "4") {
		showNormal ();
	} else if 
		((this).value === "3") {
		showLow();
	}else if 
		((this).value === "2") {
		showNone();
	} else if 
		((this).value === "5") {
		showHigh();
	} else if 
		((this).value === "6") {
		showCritical();
	} else {
		showAll();
	}
}


function showLow () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("Low")) {
	}else{
		($($allCards[i]).hide());
	}
	}
}

function showAll () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("All")) {
	}else{
		console.log('hidden cards')
		// ($($allCards[i]).hide());
	}
	}
}

function showHigh () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("High")) {
	}else{
		($($allCards[i]).hide());
	}
	}
}
function showNone () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("None")) {
	}else{
		($($allCards[i]).hide());
	}
	}
}

function showCritical () {
var $allCards = $('.idea-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
	if ($($allCards[i]).hasClass("Critical")) {
	}else{
		($($allCards[i]).hide());
	}
	}
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