// Client facing scripts here

const createListing = function(listing) {
  return `
  <article class="shoe-listing">
    <section class="image">
    <img src=${listing.photo_url} >
    </section>
    <div>
    <span class="title">${listing.name}</span>
    <span class="description>${listing.description}</span>
    <span class="size">${listing.size}</span>
    </div>

    <article class="listing-footer">
    <div class="like-repost">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-light fa-message"></i>
      <i class="fa-light fa-cart-shopping"></i>
    </div>
    </article>

  </article>
  `;
};

const addListing = function(listing) {
  $('.listings').append(listing);
};

const clearListings = function() {
  $('.listings').empty();

};

const renderListings = function(listings) {
  clearListings();
  for (const listingId in listings) {
    const listing = listings[listingId];
    const createdListing = createListing(listing);
    addListing(createdListing);
  }
};