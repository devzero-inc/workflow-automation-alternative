import express from 'express';
import githubRoutes from './routes/githubRoutes';
import flowsRoutes from './routes/flowRoutes';
import monitorIssues from './polling/monitorIssues';
import tokenStore from './store/tokenStore';
import issuesStore from './store/issueStore';
import userStore from './store/userStore';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4173'
}));

app.use('/github', githubRoutes);

app.use('/flows', flowsRoutes);

setInterval(() => {
    const accessToken = tokenStore.getToken() as string;
    const issues = issuesStore.getIssues();
    const owner = userStore.getOwner();
    const repo = userStore.getRepo();
    const comment = issuesStore.getComment();

    if (accessToken && issues.length > 0 && owner && repo) {
        monitorIssues(owner, repo, comment);
    } else {
        console.log("Waiting for valid access token and initial issues data...");
    }
}, 60000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
