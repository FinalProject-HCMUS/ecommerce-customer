export interface TokenResponse {
  /**
   * Access token for authentication
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken: string

  /**
   * Expiration time of the access token (in milliseconds since epoch)
   * @example 1681928400000
   */
  accessTokenExpiresAt: number

  /**
   * Refresh token for obtaining a new access token
   * @example "dGhpc2lzYXJlZnJlc2h0b2tlbg=="
   */
  refreshToken: string
}
