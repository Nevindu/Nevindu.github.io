(() => {
  const copyButton = document.querySelector("[data-copy-target]");
  const backToTop = document.querySelector(".back-to-top");

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  };

  copyButton?.addEventListener("click", async () => {
    const target = document.getElementById(copyButton.dataset.copyTarget);
    if (!target) return;

    const label = copyButton.querySelector("span");
    try {
      await copyText(target.innerText.trim());
      label.textContent = "Copied";
      copyButton.setAttribute("aria-live", "polite");
      window.setTimeout(() => {
        label.textContent = "Copy";
      }, 1800);
    } catch {
      label.textContent = "Select text";
    }
  });

  const updateBackToTop = () => {
    backToTop?.classList.toggle("is-visible", window.scrollY > 650);
  };

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
