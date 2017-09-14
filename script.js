
$('.save-btn').on('click', createToDo);

$('.bottom-section').on('keyup', '.todo-body', editBody);

$('.bottom-section').on('keyup', '.todo-title', editTitle);

$('.bottom-section').on('click', '.up-vote-button', upVote);

$('.bottom-section').on('click', '.down-vote-button', downVote);

$('.search-bar').on('keyup', searchTodo);

$('.todo-box').on('click', '.complete', changeCompletion)

$('#show-completed-btn').on('click', showCompletedToDos)

$('#show-all-btn').on('click', resetCards)

$("#importance-filter").on('change', selectImportance) 

$('.bottom-section').on('click', '.delete-button', deleteCard)

$('#title-input, #body-input').on('keyup', enableSave);

$('#show-more-btn').on('click', showAllCards);


$(document).ready(function() {
	reloadCards();
});


function resetCards() {
	showAllCards();
	var dropDown = document.getElementById("importance-filter");
	dropDown.selectedIndex = 0;
}

function reloadCards () {
	for(var i in localStorage) {
		newCard(JSON.parse(localStorage[i]))
	}
}

function showTenCards(){
	var $toDoCard = $('.todo-card')
	$toDoCard.each(function(index){
		if (index >= 10){
			($($toDoCard[index]).hide())
		}
	})
}

function showAllCards(){
	var $toDoCard = $('.todo-card')
	$toDoCard.each(function(index){
		if (index <= $toDoCard.length){
			($($toDoCard[index]).show())
		}
	})
}

function showShowMore(){
	var $showMoreBtn = $('#show-more-btn')
	var $toDoCard = $('.todo-card')
	$toDoCard.each(function(index){
		if (index > -1){
			$showMoreBtn.removeClass('hide-completed-task')
		}
	})
}


function pullFromStorage(id){
	var uniqueCard = JSON.parse(localStorage.getItem(id));
	return uniqueCard;
}

function storeTodo (card) {
	localStorage.setItem(card.id, JSON.stringify(card));
}


function deleteCard() {
	$(this).closest('article').remove();
	var getId = $(this).closest('article').attr('id');
	localStorage.removeItem(getId);
}


function enableSave() {

  if($('#title-input').val() !== "" && $('#body-input').val() !== "") {
    $('#save').removeAttr('disabled');
  } else {
    $('#save').attr('disabled', true);
  }
}

function Todo (title, body) {
	this.title = title;
	this.body = body; 
	this.status = 'Normal'; 
	this.id = Date.now();
	this.completion = false;
}


	
function createToDo(){
	event.preventDefault();
	var title = $('#title-input').val();
	var body = $('#body-input').val();
	var status = 'Normal';
	var anotherTodo = new Todo (title, body, status);
	newCard(anotherTodo);
	storeTodo(anotherTodo);
	clearInput();
	enableSave();	
};


function editBody(event){
	var id = ($(this).closest('.todo-card').attr('id'));
	if (event.keyCode === 13) {
		event.preventDefault();
		this.blur();
	}
	updateStorage(id, 'body', $(this).text());
}


function editTitle(event){
	var id = ($(this).closest('.todo-card').attr('id'));
	if (event.keyCode === 13) {
		event.preventDefault();
		this.blur();
	}
	updateStorage(id, 'title', $(this).text());

}

function downVote() {
	var $qualitySpan = $(this).siblings('.todo-rank');
	var $domCard = $(this).closest('.todo-card');
	var previousQuality = $qualitySpan.text();
	$qualitySpan.text(changeRank('down',$qualitySpan.text())); 
	updateStorage($domCard.attr('id'), 'status', $qualitySpan.text());
	changeStatusClass($domCard, $qualitySpan.text(), previousQuality);

}


function upVote() {

	var $qualitySpan = $(this).siblings('.todo-rank');
	var $domCard = $(this).closest('.todo-card');
	var previousQuality = $qualitySpan.text();
	$qualitySpan.text(changeRank('up',$qualitySpan.text())); 
	updateStorage($domCard.attr('id'), 'status', $qualitySpan.text());
	changeStatusClass($domCard, $qualitySpan.text(), previousQuality);
	
}


function changeStatusClass ($card, status, previous) {
	$card.removeClass(previous).addClass(status)
}



function searchTodo () {
	var userInput = $(this).val();
	$('.todo-card').each(function(index, card){
		if ($(this).children('.todo-title').text().toLowerCase().includes(userInput.toLowerCase()) || $(this).children('.todo-body').text().toLowerCase().includes(userInput.toLowerCase())) {
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

function newCard(todo) {
	var classes = `todo-card ${todo.status}`
	if (todo.completion){
		classes = classes + ' completed-task hide-completed-task'
	}

	$(".todo-box").prepend( `
		<article id=${todo.id} class='${classes}'>
			<h3 class="todo-title" contenteditable=true >${todo.title}<span class="delete-button" ></span></h3>
			<p class="todo-body" contenteditable=true > ${todo.body} </p>
			<p class="quality"><span class = "up-vote-button card-button"></span>
			<span class= "down-vote-button card-button"></span>Importance: <span class="todo-rank">${todo.status}</span></p>
			<button class="complete">Completed Task</button>
			</article>`
		);
	showTenCards();	
	showShowMore();
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
    var currentTodoBox = $(event.target).closest(".todo-card");
    if (object.completion === true){
        object.completion = false;
        currentTodoBox.removeClass('completed-task hide-completed-task')
    }
    else if (object.completion===false){
        object.completion = true;
        currentTodoBox.addClass('completed-task hide-completed-task');
    }
    localStorage.setItem(getId,JSON.stringify(object));
    
};


function changeCompletionClass(getId){
	var getId = $(this).closest('article').attr('id');
	var object = pullFromStorage(getId);
	var currentTodoBox = $(event.target).closest(".todo-card");
	if (object.completion === true){
		currentTodoBox.addClass('completed-task')
	}
	else if (object.completion === false){
		currentTodoBox.removeClass('completed-task')
	}
};

function updateStorage(id, property, value){
	var storedObject = pullFromStorage(id);
	storedObject[property] = value;
	storeTodo(storedObject);
}

function showCompletedToDos(todo){
	var completedCards = $('.completed-task')
	completedCards.toggleClass('hide-completed-task')
	
}

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

function showNormal () {
	var $allCards = $('.todo-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
		if ($($allCards[i]).hasClass("Normal")) {
		}else{
			($($allCards[i]).hide());
		}
	}
}

function showLow () {
	var $allCards = $('.todo-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
		if ($($allCards[i]).hasClass("Low")) {
		}else{
			($($allCards[i]).hide());
		}
	}
}


function showHigh () {
	var $allCards = $('.todo-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
		if ($($allCards[i]).hasClass("High")) {
		}else{
			($($allCards[i]).hide());
		}
	}
}

function showNone () {
	var $allCards = $('.todo-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
		if ($($allCards[i]).hasClass("None")) {
		}else{
			($($allCards[i]).hide());
		}
	}
}

function showCritical () {
	var $allCards = $('.todo-card');
	for (var i = 0 ; i < $allCards.length ; i++ ) {
		if ($($allCards[i]).hasClass("Critical")) {
		}else{
			($($allCards[i]).hide());
		}
	}
}

