(function () {
  var copyButton = document.querySelector("[data-copy-target]");
  var backToTop = document.querySelector(".back-to-top");

  function fallbackCopyText(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.parentNode.removeChild(textArea);
  }

  function setCopySuccess(label) {
    label.textContent = "Copied";
    copyButton.setAttribute("aria-live", "polite");
    window.setTimeout(function () {
      label.textContent = "Copy";
    }, 1800);
  }

  function setCopyFailure(label) {
    label.textContent = "Select text";
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var targetId = copyButton.getAttribute("data-copy-target");
      var target = document.getElementById(targetId);
      var label = copyButton.querySelector("span");

      if (!target || !label) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(target.innerText.trim()).then(
          function () {
            setCopySuccess(label);
          },
          function () {
            setCopyFailure(label);
          }
        );
        return;
      }

      try {
        fallbackCopyText(target.innerText.trim());
        setCopySuccess(label);
      } catch (error) {
        setCopyFailure(label);
      }
    });
  }

  function updateBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 650);
    }
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
