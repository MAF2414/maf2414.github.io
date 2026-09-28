// The legal pages carry the owner's name, address and email encoded (XOR with
// a fixed key, then base64; see scripts/configure-website.cjs), so the static
// HTML that address harvesters read does not contain them. This writes them out
// for everyone who opens the page in a browser.
(() => {
  const KEY = "chatpip";
  const decode = value => new TextDecoder().decode(
    Uint8Array.from(atob(value), (char, index) => char.charCodeAt(0) ^ KEY.charCodeAt(index % KEY.length))
  );
  for (const element of document.querySelectorAll("[data-owner]")) {
    const value = decode(element.dataset.owner);
    element.textContent = value;
    if (element.dataset.ownerField === "support-email") element.href = `mailto:${value}`;
  }
})();
