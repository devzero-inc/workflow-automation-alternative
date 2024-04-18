import { Issue } from "../domain/issue";

class IssuesStore {
  private issues: Issue[] = [];
  private comment: string = "Thank you for your submission! A team member will review this shortly";

  public setIssues(issues: Issue[], comment: string) {
      this.issues = issues;
      this.comment = comment;
  }

  public getIssues(): Issue[] {
      return this.issues;
  }

  public getComment(): string {
      return this.comment;
  }
}

const issuesStore = new IssuesStore();
export default issuesStore;
