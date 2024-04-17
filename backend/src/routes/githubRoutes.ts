import { Router } from "express";
import { fetchUserRepos, fetchIssues } from "../services/githubService";
import {
  NotAuthenticatedError,
  AccessDeniedError,
  NotFound,
} from "../errors/octokitErrors";
import tokenStore from "../store/tokenStore";
import issuesStore from "../store/issueStore";
import userStore from "../store/userStore";
import authRoutes from './authRoutes';
import dotenv from "dotenv";
import { Issue } from "../domain/issue";
dotenv.config();

const router = Router();

router.use('/auth', authRoutes);

router.get("/repos", async (req, res) => {
  const accessToken = tokenStore.getToken() as string;
  try {
    const repos = await fetchUserRepos(accessToken);
    res.status(200).json({ data: repos });
  } catch (error) {
    if(error instanceof NotAuthenticatedError) {
      res.status(401).json({ message: error.message });
    } else if(error instanceof AccessDeniedError) { 
      res.status(403).json({ message: error.message });
    } else if(error instanceof NotFound) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

router.get("/issues", async (req, res) => {
  try {
    const { owner, repo } = req.query;
    if (!owner || !repo) {
      return res.status(400).json({ message: "Owner and repo are required." });
    }
    userStore.setOwner(owner as string);
    userStore.setRepo(repo as string);
    const accessToken = tokenStore.getToken() as string;
    const issues = await fetchIssues(
      owner as string,
      repo as string,
      accessToken
    );

    const issuesWithOwnerAndRepo: Issue[] = issues.map((issue) => ({
      number: issue.number,
      owner: owner as string,
      repo: repo as string,
    }));

    issuesStore.setIssues(issuesWithOwnerAndRepo);

    res.status(201).json({ data: issues });
  } catch (error) {
    if(error instanceof NotAuthenticatedError) {
      res.status(401).json({ message: error.message });
    } else if(error instanceof AccessDeniedError) { 
      res.status(403).json({ message: error.message });
    } else if(error instanceof NotFound) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error." });
    }
  }
});

export default router;
