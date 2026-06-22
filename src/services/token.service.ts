let accessToken: string | null = null;

export const tokenService = {
  // Set access token in memory - called after successful login/token refresh
  setAccessToken: (token: string | null) => {
    accessToken = token;
  },

  // Get current access token - used in interceptors
  getAccessToken: () => accessToken,

  // Clear access token from memory - called on logout
  clearAccessToken: () => {
    accessToken = null;
  },
};
