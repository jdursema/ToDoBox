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
			<p class="quality"><input type="image" alt="idea up vote button" src="images/upvote.svg" class="card-button">
			<input type="image" alt="idea down vote button" src="images/downvote.svg" class="card-button">quality: <span class="idea-rank">swill</span></p>
		</article>
		`
		);
}