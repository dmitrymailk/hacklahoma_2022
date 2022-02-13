console.log(chrome.runtime.onMessage);

const scroll = (direction, scrollAmount) => {
  if (direction === "scroll_down") {
    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  } else if (direction === "scroll_up") {
    window.scrollBy({
      top: -scrollAmount,
      behavior: "smooth",
    });
  }
};

const isYoutube = () => {
  const currentLink = window.location.href;
  const regular = new RegExp("(?=.*youtube)(?=.*watch)");
  if (currentLink.match(regular)) {
    return true;
  }
};

const youtubeLike = () => {
  if (isYoutube()) {
    const rateButtons = document.querySelectorAll(
      ".yt-simple-endpoint.style-scope.ytd-toggle-button-renderer"
    );
    const likeButton = rateButtons[0];
    const parentLikeButton = likeButton.parentElement;
    if (!parentLikeButton.classList.contains("style-default-active")) {
      likeButton.click();
    }
  }
};

const youtubeDislike = () => {
  if (isYoutube()) {
    const rateButtons = document.querySelectorAll(
      ".yt-simple-endpoint.style-scope.ytd-toggle-button-renderer"
    );
    const dislikeButton = rateButtons[1];
    const parentDislikeButton = dislikeButton.parentElement;
    if (!parentDislikeButton.classList.contains("style-default-active")) {
      dislikeButton.click();
    }
  }
};

window.onload = () => {
  console.log("Hello from the content-script");
  const currentLink = window.location.href;
  window[`${currentLink}_dislike`] = false;
  window[`${currentLink}_like`] = false;
  // get message from background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("ON MESSAGE", request, sender, sendResponse);
    const message_type = request["type"];
    switch (message_type) {
      case "scroll_up": {
        console.log("scroll_up");
        scroll(message_type, 20);
        break;
      }
      case "scroll_down": {
        console.log("scroll_down");
        scroll("scroll_down", 20);
        break;
      }
      case "like": {
        console.log("like");
        youtubeLike();
        break;
      }
      case "dislike": {
        console.log("dislike");
        youtubeDislike();
        break;
      }
    }
  });

  //   chrome.runtime.sendMessage("{ );
};
