import { Router } from "express";
import { fetchUserRepos, fetchIssues } from "../services/githubService";
import {
  NotAuthenticatedError,
  AccessDeniedError,
  NotFound,
} from "../errors/octokitErrors";
import authRoutes from './authRoutes';
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// this token will be replaced by the token from the user later
const accessToken = process.env.GITHUB_TOKEN as string;

router.use('/auth', authRoutes);

router.get("/repos", async (req, res) => {
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
    const issues = await fetchIssues(
      owner as string,
      repo as string,
      accessToken
    );
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
