import Route from '@ember/routing/route';

// import { Surreal } from 'surrealdb.wasm';

export default class ApplicationRoute extends Route {
  async beforeModel() {
    let { Surreal } = await import('surrealdb.wasm');

    const db = new Surreal();
    try {
      // Connect to the database
      // prettier-ignore
      await db.connect('memory');

      // Select a specific namespace / database
      await db.use({ ns: 'test', db: 'test' });

      // Create a new person with a random id
      // eslint-disable-next-line no-unused-vars
      let created = await db.create('person', {
        title: 'Founder & CEO',
        name: {
          first: 'Tobie',
          last: 'Morgan Hitchcock',
        },
        marketing: true,
        identifier: Math.random().toString(36).substr(2, 10),
      });

      // Update a person record with a specific id
      let updated = await db.merge('person:jaime', {
        marketing: true,
      });

      // Select all people records
      let people = await db.select('person');

      // Perform a custom advanced query
      let groups = await db.query(
        'SELECT marketing, count() FROM type::table($table) GROUP BY marketing',
        {
          table: 'person',
        }
      );

      // Delete all people upto but not including Jaime
      let deleted = await db.delete('person:..jaime');

      // Delete all people
      await db.delete('person');
    } catch (e) {
      console.error('ERROR', e);
    }
  }
}
