import express from 'express';
import authRoutes from './routes/authRoutes';
import githubRoutes from './routes/githubRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/github', githubRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
