class UserStore{
  owner: string;
  repo: string;
  clientId: string;
  clientSecret: string;
  constructor(){
    this.owner = "";
    this.repo = "";
    this.clientId = "";
    this.clientSecret = "";
  }

  setOwner(owner: string){
    this.owner = owner;
  }

  setRepo(repo: string){
    this.repo = repo;
  }

  setClientId(clientId: string){
    this.clientId = clientId;
  }

  setClientSecret(clientSecret: string){
    this.clientSecret = clientSecret;
  }

  getOwner(){
    return this.owner;
  }

  getRepo(){
    return this.repo;
  }

  getClientId(){
    return this.clientId;
  }

  getClientSecret(){
    return this.clientSecret;
  }
}

const userStore = new UserStore();
export default userStore;