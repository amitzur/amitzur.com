document.addEventListener("DOMContentLoaded", function() {
  const socialLinks = Array.prototype.slice.call(document.getElementsByClassName("social-link"), 0);

  socialLinks.forEach(link => {
    link.addEventListener("click", e => {
      ga("send", "event", {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: e.currentTarget.href,
        transport: 'beacon'
      });
    });
  });
});