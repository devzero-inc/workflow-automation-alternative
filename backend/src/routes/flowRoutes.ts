import {Router} from 'express';
import flowStore from '../store/flowStore';
const router = Router();

router.get('/', (req, res) => {
    try {
      const flows = flowStore.getFlows();
      res.status(200).json({ data: flows });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error.');
    }
});

export default router;