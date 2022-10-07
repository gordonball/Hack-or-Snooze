"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li class="Story" id="${story.storyId}">
        ${getStarHtml(story)}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Creates a Bootstrap Icon of bi-star-fill or bi-star depending
 *  if the story is favorited or not
 *
 *  Returns a HTML string
 */

function getStarHtml(story) {
  const isFavorite = currentUser.isFavorite(story);
  console.log(isFavorite);
  const starType = isFavorite ? "-fill" : "";
  return `<i class="Star bi-star${starType}"></i>`;
}

/** When Bootstrap Icon is clicked:
 *
 * - Toggles Bootstrap icon
 * - Updates API for target story
 */

async function handleStarClick(evt) {
  const $target = $(evt.target);
  const $closestLi = $target.closest(".Story");
  const storyId = $closestLi.attr("id");
  const story = await Story.getStory(storyId);
  if ($target.hasClass("bi-star-fill")) {
    await currentUser.removeFavorite(story);
    $target.toggleClass("bi-star-fill bi-star");
  } else {
    await currentUser.addFavorite(story);
    $target.toggleClass("bi-star bi-star-fill");
  }
}

$allStoriesList.on("click", ".Star", handleStarClick);
$favoriteStories.on("click", ".Star", handleStarClick);

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** Adds story to the beginning of story list when form is submitted */

async function submitNewStory(evt) {
  evt.preventDefault();

  const title = $title.val();
  const author = $author.val();
  const url = $url.val();

  const story = await storyList.addStory(currentUser, {title, author, url});
  $allStoriesList.prepend(generateStoryMarkup(story));

}

$submitForm.on("submit", submitNewStory);

/** Put list of favorites on page */
function putFavoritesOnPage() {

  $favoriteStories.empty();

  // loop through all of our favorite stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoriteStories.append($story);
  }

  $favoriteStories.show();
}
