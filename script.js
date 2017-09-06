
$('.save-button').on('click', function(event){
	event.preventDefault();
	var ideaTitle = $('#title-input').val();
	var ideaBody = $('#body-input').val();
	newCard(ideaTitle, ideaBody); 
});

function newCard(title, body) {
	$(".idea-box").prepend( `
		<article class="idea-card">
			<h3 class="idea-title">${title}<input type="image" src="images/delete.svg" class="card-button" id="delete-button" alt="idea delete button"></h3>
			<p class="idea-body">
				${body}
			</p>
			<p class="quality"><input type="image" id="up-vote-button" alt="idea up vote button" src="images/upvote.svg" class="card-button">
			<input type="image" id="down-vote-button" alt="idea down vote button" src="images/downvote.svg" class="card-button">quality: <span class="idea-rank">swill</span></p>
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

// what button pressed? Are we gpomg up or down in rank? What is current rank? What is it's index? Add or subtract.
//If at top or bottom, doesn't do anything.

function changeRank(direction, currentRank) {
	var rankArray = ['swill', 'plausible', 'genius'];
	var increment = direction === 'down'? -1:1;
	rankArray.indexOf(currentRank);
	console.log(direction);
	console.log(currentRank);
	console.log(increment);
}

$('.bottom-section').on('click', '#up-vote-button', function() {
	changeRank ('up',$(this).siblings('span').text()); 
})


$('.bottom-section').on('click', '#down-vote-button', function() {
	changeRank ('down',$(this).siblings('span').text()); 
})