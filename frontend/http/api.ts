import axios from 'axios';

const githubAuth = async (clientId: string, clientSecret: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/github/auth/signin?clientId=${clientId}&clientSecret=${clientSecret}`);
    return response.data;
  } catch (error) {
    console.error("Error authenticating with Github:", error); 
  }
}

const getRepos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/github/repos');
    return response.data;
  } catch (error) {
    console.error("Error getting repos:", error); 
  }
} 

const storeIssues = async (repo: string, comment: string, flowName: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/github/issues`, {repo, comment, flowName});
    return response.data;
  } catch (error) {
    console.error("Error storing issues:", error); 
  }
}

const getFlows = async () => {
  try {
    const response = await axios.get('http://localhost:3000/flows');
    return response.data;
  } catch (error) {
    console.error("Error getting flows:", error); 
  }
}

export {githubAuth, getRepos, storeIssues, getFlows};