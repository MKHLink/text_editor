import { openDB } from 'idb';

export const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('POST to database');

  const contactDB = await openDB('jate',1);

  const tx = contactDB.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request  = store.put({id:1, text: content});
  const result = await request;
  console.log('Content save to the database',result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (e) => {
  console.log('GET from database');

  const contactDB = await openDB('jate',1);

  const tx = contactDB.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request  = store.get(1);

  const result = await request;
  return result?.text;
};

initdb();
