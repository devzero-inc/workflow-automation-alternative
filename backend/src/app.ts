import express from 'express';
import githubRoutes from './routes/githubRoutes';
import monitorIssues from './polling/monitorIssues';
import tokenStore from './store/tokenStore';
import issuesStore from './store/issueStore';
import userStore from './store/userStore';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/github', githubRoutes);

setInterval(() => {
    const accessToken = tokenStore.getToken() as string;
    const issues = issuesStore.getIssues();
    const owner = userStore.getOwner();
    const repo = userStore.getRepo();

    if (accessToken && issues.length > 0 && owner && repo) {
        monitorIssues(owner, repo);
    } else {
        console.log("Waiting for valid access token and initial issues data...");
    }
}, 3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
