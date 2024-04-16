import tokenStore from "../store/tokenStore";
import issuesStore from "../store/issueStore";
import { fetchIssues, createComment } from "../services/githubService";

const monitorIssues = async (owner: string, repo: string) => {
  try {
    const accessToken = tokenStore.getToken() as string;
    const fetchedIssues = await fetchIssues(owner, repo, accessToken);
    const issuesWithOwnerAndRepo = fetchedIssues.map((issue) => ({
      number: issue.number,
      owner: owner,
      repo: repo,
    }));
    const existingIssues = issuesStore.getIssues();
    const newIssues = issuesWithOwnerAndRepo.filter(
      (issue) =>
        !existingIssues.some(
          (existingIssue) =>
            existingIssue.number === issue.number &&
            existingIssue.owner === issue.owner &&
            existingIssue.repo === issue.repo
        )
    );
    if (newIssues.length === 0) {
      console.log("No new issues.");
      return;
    }
    for(const issue of newIssues) {
      await createComment(owner, repo, issue.number, "Thank you for your submission! A team member will review this shortly", accessToken)
    }
    issuesStore.setIssues(issuesWithOwnerAndRepo);
  } catch (error) {
    console.error("Error monitoring issues:", error);
  }
}

export default monitorIssues;