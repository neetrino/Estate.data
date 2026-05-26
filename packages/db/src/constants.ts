export const API_VERSION_PREFIX = "/api/v1";

/** Cache for immutable asset bytes served by GET /api/v1/assets/:key. */
export const ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";

/** Default count for GET /api/v1/projects/recent. */
export const DEFAULT_RECENT_WORK_LIMIT = 4;
