import { Issue } from "../domain/issue";

class IssuesStore {
  private issues: Issue[] = [];

  public setIssues(issues: Issue[]) {
      this.issues = issues;
  }

  public getIssues(): Issue[] {
      return this.issues;
  }
}

const issuesStore = new IssuesStore();
export default issuesStore;
