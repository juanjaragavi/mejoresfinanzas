// Central ad configuration for the Financial Blog Template
// Keep this minimal and brand-agnostic so integrators can override easily.

export const ADS = {
  // DOM id prefix for AutoZep containers and similar ad placeholders
  // Example final ids: us_site_3, us_site_4
  idPrefix: "us_site_",

  // Google Ad Manager ad unit path suffix used in defineSlot
  // Example: /YOUR_NETWORK_CODE/site_mob_1
  gamPathPrefix: "site",

  // Storage key prefix for diagnostics and duplicate detection
  storagePrefix: "admgr",

  // Default pubads targeting key for site
  siteTarget: "brand",
};

export default ADS;
