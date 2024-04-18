import { Router } from "express";
import axios from "axios";
import tokenStore from "../store/tokenStore";
import userStore from "../store/userStore";
import { getAuthUser } from "../services/githubService";
const router = Router();

router.get("/signin", (req, res) => {
  try {
    
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;

    if(!clientId){
      res.status(400).json({message: "No client id found."})
    }

    userStore.setClientId(clientId as string);
    userStore.setClientSecret(clientSecret as string);

    const redirectUri = encodeURIComponent(
      "http://localhost:3000/github/auth/signin/callback"
    );
    const scopes = encodeURIComponent(
      "repo,admin:org,admin:public_key,admin:repo_hook,admin:org_hook,gist,user,delete_repo,write:packages,read:packages,delete:packages,admin:gpg_key,workflow,repository_projects:read"
    );

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

    res.status(200).json({ url: authUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

router.get("/signin/callback", async (req, res) => {
  
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).json({ message: "No code found." });
    }

    const clientId = userStore.getClientId();
    const clientSecret = userStore.getClientSecret();
  
    if(!clientId || !clientSecret){
      res.status(400).json({message: "No client id or client secret found."})
    }
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = response.data.access_token;
    tokenStore.setToken(accessToken);

    const user = await getAuthUser(accessToken);
    userStore.setOwner(user.login);

    res.status(200).send("Successfully signed in with GitHub.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

export default router;
