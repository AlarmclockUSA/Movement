import { updateEvents } from './updateEvents';

// Run the update
updateEvents()
  .then(() => {
    console.log('Events update completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error running update:', error);
    process.exit(1);
  }); 