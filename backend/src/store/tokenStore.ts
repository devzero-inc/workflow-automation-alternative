class TokenStore {
  accessToken: string | null;

  constructor() {
    this.accessToken = null;
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken() {
    return this.accessToken;
  }
}

const tokenStore = new TokenStore();

export default tokenStore;
