import { seedEvents } from '../utils/seedEvents';

// Run the seeding
seedEvents()
  .then(() => {
    console.log('Events seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding events:', error);
    process.exit(1);
  }); 