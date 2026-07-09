(function () {
  const AD_SLOT = "2056784980";
  const AD_CLIENT = "ca-pub-7296634171837358";
  const MAX_RENDER_ATTEMPTS = 10;
  const RETRY_DELAY = 500;

  function renderAdWithRetry(attempt = 0) {
    if (attempt > MAX_RENDER_ATTEMPTS) {
      return;
    }

    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.warn("Adsense rendering error", error);
      }
      return;
    }

    setTimeout(() => renderAdWithRetry(attempt + 1), RETRY_DELAY);
  }

  function createAdElement(container) {
    const adElement = document.createElement("ins");
    adElement.className = "adsbygoogle page-ad";
    adElement.style.display = "block";
    adElement.setAttribute("data-ad-client", AD_CLIENT);
    adElement.setAttribute("data-ad-slot", AD_SLOT);
    adElement.setAttribute("data-ad-format", "auto");
    adElement.setAttribute("data-full-width-responsive", "true");

    const heading = container.querySelector("h1, h2, h3, h4, h5, h6");

    if (heading && heading.parentNode) {
      if (heading.nextSibling) {
        heading.parentNode.insertBefore(adElement, heading.nextSibling);
      } else {
        heading.parentNode.appendChild(adElement);
      }
    } else {
      container.insertBefore(adElement, container.firstChild);
    }

    return adElement;
  }

  function ensureAd() {
    const container = document.querySelector("article.md-content__inner");

    if (!container) {
      return;
    }

    let adElement = container.querySelector(
      `ins.adsbygoogle[data-ad-slot="${AD_SLOT}"]`
    );

    if (!adElement) {
      adElement = createAdElement(container);
    }

    if (
      adElement &&
      !adElement.dataset.adsbygoogleStatus &&
      !adElement.getAttribute("data-adsbygoogle-status")
    ) {
      renderAdWithRetry();
    }
  }

  function setup() {
    ensureAd();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(setup);
  } else {
    document.addEventListener("DOMContentLoaded", setup);
  }
})();
