import { createTask } from './tasks.js';
import { createAdding } from './adding.js';

const adding = createAdding();

adding.submission = (data) => console.log(data)
