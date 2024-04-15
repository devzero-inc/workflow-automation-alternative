import { Router } from "express";
import axios from "axios";
const router = Router();

router.get("/github", (req, res) => {
  try {
    // this will be taken from user input later
    const clientId = process.env.GITHUB_CLIENT_ID;
    if(!clientId){
      res.status(400).json({message: "No client id found."})
    }
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/auth/github/callback"
    );
    const scopes = encodeURIComponent(
      "repo,admin:org,admin:public_key,admin:repo_hook,admin:org_hook,gist,user,delete_repo,write:packages,read:packages,delete:packages,admin:gpg_key,workflow,repository_projects:read"
    );
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

router.get("/github/callback", async (req, res) => {
  
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).json({ message: "No code found." });
    }
    // these will be taken from user input later
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
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

    // this will be persisted in memory for later use
    const accessToken = response.data.access_token;
    console.log(accessToken);
    res.status(200).send("Successfully signed in with GitHub.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

export default router;
