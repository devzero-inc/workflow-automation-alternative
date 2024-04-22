import { Flow } from '../domain/flow';

class FlowStore {
  
  flows: Flow[] = [];
  
  constructor() {
    this.flows = [];
  }

  addFlow(flow: Flow) {
    this.flows.push(flow);
  }

  getFlows() {
    return this.flows;
  }
}

const flowStore = new FlowStore();

export default flowStore;