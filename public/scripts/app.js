$(document).ready(function() {
  console.log('Document Ready');

  $('.favorite').on("click", function(event) {
    event.preventDefault();
    let listingid = event.target.attributes['listing-id'].value;

    $.ajax({
      url: '/favorite', method: "POST",
      data: { 'listingid': listingid }
    })
      .then(() => {
        alert(`Added Listing ${listingid} to Favorites!`);
      })
      .catch(error => {
        console.log('error');
        alert("Something went wrong in app.js!");
      });
  });
});

