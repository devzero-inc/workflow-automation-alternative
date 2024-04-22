import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";
import {
  NotAuthenticatedError,
  AccessDeniedError,
  NotFound,
  UnhandledError,
} from "../errors/octokitErrors";

async function fetchUserRepos(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    const response = await octokit.rest.repos.listForAuthenticatedUser({});
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    if ((error as RequestError).status === 401) {
      throw new NotAuthenticatedError("Not authenticated.");
    } else if ((error as RequestError).status === 403) {
      throw new AccessDeniedError("Access denied.");
    } else if ((error as RequestError).status === 404) {
      throw new NotFound("Not found.");
    } else {
      throw new UnhandledError("Unhandled error.");
    }
  }
}

async function fetchIssues(owner: string, repo: string, accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner: owner,
      repo: repo,
      state: "all",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    if ((error as RequestError).status === 401) {
      throw new NotAuthenticatedError("Not authenticated.");
    } else if ((error as RequestError).status === 403) {
      throw new AccessDeniedError("Access denied.");
    } else if ((error as RequestError).status === 404) {
      throw new NotFound("Not found.");
    } else {
      throw new UnhandledError("Unhandled error.");
    }
  }
}

async function createComment(
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
  accessToken: string
) {
  const octokit = new Octokit({ auth: accessToken });
  try {
    const response = await octokit.rest.issues.createComment({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      body: body,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    if ((error as RequestError).status === 401) {
      throw new NotAuthenticatedError("Not authenticated.");
    } else if ((error as RequestError).status === 403) {
      throw new AccessDeniedError("Access denied.");
    } else if ((error as RequestError).status === 404) {
      throw new NotFound("Not found.");
    } else {
      throw new UnhandledError("Unhandled error.");
    }
  }
}

const getAuthUser = async (accessToken: string) => {
  const octokit = new Octokit({ auth: accessToken });
  try {
    const response = await octokit.rest.users.getAuthenticated();
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    if ((error as RequestError).status === 401) {
      throw new NotAuthenticatedError("Not authenticated.");
    } else if ((error as RequestError).status === 403) {
      throw new AccessDeniedError("Access denied.");
    } else if ((error as RequestError).status === 404) {
      throw new NotFound("Not found.");
    } else {
      throw new UnhandledError("Unhandled error.");
    }
  }

}

export { fetchUserRepos, fetchIssues, createComment, getAuthUser };
