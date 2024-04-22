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
import flowStore from "../store/flowStore";
import authRoutes from './authRoutes';
import dotenv from "dotenv";
import { Issue } from "../domain/issue";
import { Flow } from "../domain/flow";
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

router.post("/issues", async (req, res) => {
  try {
    const { repo, comment, flowName } = req.body;
    const owner = userStore.getOwner();
    if (!owner || !repo) {
      return res.status(400).json({ message: "Owner and repo are required." });
    }
    userStore.setRepo(repo as string);

    const newFlow: Flow = {
      name: flowName,
      repo: repo,
    }

    flowStore.addFlow(newFlow);

    const accessToken = tokenStore.getToken() as string;
    const issues = await fetchIssues(
      owner as string,
      repo as string,
      accessToken
    );

    const sampleIssue: Issue = {
      number: 0,
      owner: owner as string,
      repo: repo as string,
    };

    const issuesWithOwnerAndRepo: Issue[] = issues.map((issue) => ({
      number: issue.number,
      owner: owner as string,
      repo: repo as string,
    }));

    issuesWithOwnerAndRepo.push(sampleIssue);

    issuesStore.setIssues(issuesWithOwnerAndRepo, comment);

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
