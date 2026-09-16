/**
 * config.js — Reanty Real Estate
 *
 * API configuration.
 * Change API_BASE_URL to your backend endpoint.
 * Leave empty string '' to use local JSON files (default).
 */

const CONFIG = {
  /**
   * API Base URL.
   * If empty, the app will load data from local JSON files.
   * Example: 'https://api.reanty.com'
   */
  API_BASE_URL: '',

  /**
   * API endpoints (relative to API_BASE_URL).
   * Only used when API_BASE_URL is set.
   */
  ENDPOINTS: {
    properties: '/api/properties',
    services: '/api/services',
    testimonials: '/api/testimonials',
    blogs: '/api/blogs',
  },

  /**
   * Local JSON fallback paths (relative to index.html).
   * Used when API_BASE_URL is empty or API fails.
   */
  LOCAL_DATA: {
    properties: './data/properties.json?v=3',
    services: './data/services.json',
    testimonials: './data/testimonials.json',
    blogs: './data/blogs.json',
  },
};
