$(document).ready(function() {
    console.log(localStorage);
    // localStorage.forEach(function (idea, i) {
    // 	console.log(idea, i);
    // })

    // newCard(getIdeas(idea));
});

function getIdeas(rhubarb) {
	var oldIdea = localStorage.getItem("potato-" + rhubarb.id);
	var parsedIdea = JSON.parse(oldIdea);
	console.log(parsedIdea);
	return parsedIdea;
}


$('.save-button').on('click', function(event){
	event.preventDefault();
	var idea = {
		title: $('#title-input').val(),
		body: $('#body-input').val(),
		quality: 'swill',
		id: Date.now()
	}
	storeIdea(idea);
	newCard(idea);
	getIdeas(idea);
});

function newCard(idea) {
	$(".idea-box").prepend( `
		<article id=${idea.id} class="idea-card">
			<h3 class="idea-title">${idea.title}<input type="image" src="images/delete.svg" class="card-button" id="delete-button" alt="idea delete button"></h3>
			<p class="idea-body">
				${idea.body}
			</p>
			<p class="quality"><input type="image" id="up-vote-button" alt="idea up vote button" src="images/upvote.svg" class="card-button">
			<input type="image" id="down-vote-button" alt="idea down vote button" src="images/downvote.svg" class="card-button">quality: <span class="idea-rank">${idea.quality}</span></p>
		</article>
		`
	);
}
//Delete Button Function
$('.bottom-section').on('click', '#delete-button', function(){
	$(this).closest('article').remove();
});

//Local Storage

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

function storeIdea (potato) {
	localStorage.setItem("potato-" + potato.id, JSON.stringify(potato));
}

function changeRank(direction, currentRank) {
	var rankArray = ['swill', 'plausible', 'genius'];
	var increment = direction === 'down'? -1:1;
	var currentIndex = rankArray.indexOf(currentRank);
	if (currentRank + increment < 0 || currentRank + increment > rankArray.length - 1) {
		return rankArray[currentIndex];
	} else {
		return rankArray[currentIndex + increment];
	}

}

$('.bottom-section').on('click', '#up-vote-button', function() {
	var $qualitySpan = $(this).siblings('span');
	$qualitySpan.text(changeRank('up',$qualitySpan.text())); 
})


$('.bottom-section').on('click', '#down-vote-button', function() {
	var $qualitySpan = $(this).siblings('span');
	$qualitySpan.text(changeRank('down',$qualitySpan.text())); 
})