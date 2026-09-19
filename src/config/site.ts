// Single source of truth for values used by more than one component.
// Update here once instead of hunting through Pricing, Contact and Footer.

/** Free 15-minute intro call. Must match the event slug in your Calendly account. */
export const CALENDLY_URL = "https://calendly.com/hello-prismwave-studio/15min";

/** Calendly embed URL, themed to the site's ink/paper/amber palette. */
export const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=10182b&text_color=f3f4f1&primary_color=ffb84d`;
