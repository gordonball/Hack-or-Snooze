"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show story submit form when submit link is clicked */

function navSubmitStory(evt) {
  evt.preventDefault();
  hidePageComponents();
  $favoriteStories.hide();
  $submitForm.show();
  $allStoriesList.show();
}

$navSubmit.on("click", navSubmitStory);

/** Show favorites list of current user when favorites link is clicked. */

function navShowFavorites(evt) {
  evt.preventDefault();
  hidePageComponents();
  $submitForm.hide();
  putFavoritesOnPage();

}

$navFavorites.on("click", navShowFavorites);

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
