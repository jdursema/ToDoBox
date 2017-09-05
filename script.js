//Delete Button Function
$('.bottom-section').on('click', '#delete-button', function(){
	$(this).closest('article').remove();
});

//Local Storage

// localStorage.setItem('ID Local Storage Knows', myObject);
// Date.now()
// localStorage.getItem(myObject.id)
// v