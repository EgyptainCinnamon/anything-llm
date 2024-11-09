import { API_BASE } from "@/utils/constants";
import { baseHeaders } from "@/utils/request";

const CommunityHub = {
  /**
   * Get an item from the community hub by its import ID.
   * @param {string} importId - The import ID of the item.
   * @returns {Promise<{error: string | null, item: object | null}>}
   */
  async getItemFromImportId(importId) {
    return await fetch(`${API_BASE}/community-hub/item`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ importId }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return {
          error: e.message,
          item: null,
        };
      });
  },

  /**
   * Import a bundle item from the community hub.
   * @param {string} importId - The import ID of the item.
   * @returns {Promise<{error: string | null, item: object | null}>}
   */
  async importBundleItem(importId) {
    return await fetch(`${API_BASE}/community-hub/import`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({ importId }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return {
          error: e.message,
          item: null,
        };
      });
  },

  /**
   * Update the hub settings (API key, etc.)
   * @param {Object} data - The data to update.
   * @returns {Promise<{success: boolean, error: string | null}>}
   */
  updateSettings: async (data) => {
    return await fetch(`${API_BASE}/community-hub/settings`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const response = await res.json();
        if (!res.ok)
          throw new Error(response.error || "Failed to update settings");
        return { success: true, error: null };
      })
      .catch((e) => ({
        success: false,
        error: e.message,
      }));
  },

  /**
   * Get the hub settings (API key, etc.)
   * @returns {Promise<{connectionKey: string | null, error: string | null}>}
   */
  getSettings: async () => {
    return await fetch(`${API_BASE}/community-hub/settings`, {
      method: "GET",
      headers: baseHeaders(),
    })
      .then(async (res) => {
        const response = await res.json();
        if (!res.ok)
          throw new Error(response.error || "Failed to fetch settings");
        return { connectionKey: response.connectionKey, error: null };
      })
      .catch((e) => ({
        connectionKey: null,
        error: e.message,
      }));
  },

  /**
   * Fetch the explore items from the community hub that are publicly available.
   * @returns {Promise<{agentSkills: {items: [], hasMore: boolean, totalCount: number}, systemPrompts: {items: [], hasMore: boolean, totalCount: number}, slashCommands: {items: [], hasMore: boolean, totalCount: number}}>}
   */
  fetchExploreItems: async () => {
    return await fetch(`${API_BASE}/community-hub/explore`, {
      method: "GET",
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return {
          success: false,
          error: e.message,
          result: null,
        };
      });
  },

  /**
   * Fetch the user items from the community hub.
   * @returns {Promise<{success: boolean, error: string | null, createdByMe: object, teamItems: object[]}>}
   */
  fetchUserItems: async () => {
    return await fetch(`${API_BASE}/community-hub/items`, {
      method: "GET",
      headers: baseHeaders(),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return {
          success: false,
          error: e.message,
          createdByMe: {},
          teamItems: [],
        };
      });
  },
};

export default CommunityHub;