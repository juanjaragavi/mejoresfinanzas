/**
 * AdZep Standalone Activator Script
 * Vanilla JavaScript implementation for direct inclusion in HTML
 * Can be used as a fallback or in non-React contexts
 */

(function () {
  "use strict";

  // Namespace for AdZep activation
  window.AdZep = window.AdZep || {};

  // Configuration
  const CONFIG = {
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 500,
    TIMEOUT: 5000,
    CHECK_INTERVAL: 100,
    INITIAL_DELAY: 100,
  };

  // State management
  let activationState = {
    activated: false,
    activationInProgress: false,
    activationAttempts: 0,
    lastActivation: null,
  };

  /**
   * Wait for AdZepActivateAds function to be available
   */
  function waitForAdZepFunction(timeout) {
    return new Promise((resolve) => {
      const startTime = Date.now();

      function check() {
        if (typeof window.AdZepActivateAds === "function") {
          resolve(window.AdZepActivateAds);
          return;
        }

        if (Date.now() - startTime >= timeout) {
          resolve(null);
          return;
        }

        setTimeout(check, CONFIG.CHECK_INTERVAL);
      }

      check();
    });
  }

  /**
   * Activate AdZep ads
   */
  async function activateAdZep(force = false) {
    // Check if already activated
    if (!force && activationState.activated) {
      console.log("[AdZep] Already activated, skipping...");
      return true;
    }

    // Check if activation is in progress
    if (activationState.activationInProgress) {
      console.log("[AdZep] Activation in progress, skipping...");
      return false;
    }

    activationState.activationInProgress = true;
    activationState.activationAttempts++;

    console.log(
      `[AdZep] Starting activation attempt ${activationState.activationAttempts}...`,
    );

    try {
      // Wait for function to be available
      const adZepFunction = await waitForAdZepFunction(CONFIG.TIMEOUT);

      if (!adZepFunction) {
        throw new Error(
          "AdZepActivateAds function not available within timeout",
        );
      }

      // Call the function
      console.log("[AdZep] Calling AdZepActivateAds...");
      adZepFunction();

      // Mark as activated
      activationState.activated = true;
      activationState.lastActivation = Date.now();

      console.log("[AdZep] Ads activated successfully");
      return true;
    } catch (error) {
      console.error("[AdZep] Error during activation:", error);

      // Retry logic
      if (activationState.activationAttempts < CONFIG.MAX_RETRY_ATTEMPTS) {
        console.log(`[AdZep] Retrying in ${CONFIG.RETRY_DELAY}ms...`);

        setTimeout(() => {
          activateAdZep(true);
        }, CONFIG.RETRY_DELAY);
      }

      return false;
    } finally {
      activationState.activationInProgress = false;
    }
  }

  /**
   * Initialize and activate AdZep
   */
  function initialize() {
    // Prevent multiple initializations
    if (window.AdZep.initialized) {
      return;
    }

    window.AdZep.initialized = true;
    window.AdZep.activationState = activationState;

    // Expose functions
    window.AdZep.activate = activateAdZep;
    window.AdZep.reset = function () {
      activationState.activated = false;
      activationState.activationInProgress = false;
      activationState.activationAttempts = 0;
      activationState.lastActivation = null;
      console.log("[AdZep] State reset");
    };

    // Auto-activate after delay
    setTimeout(() => {
      activateAdZep();
    }, CONFIG.INITIAL_DELAY);
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
