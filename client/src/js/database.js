import { openDB } from 'idb';

const initdb = async () =>
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

  export const putDb = async (content) => {
    console.log('PUT to the database');
    const database = await openDB('jate', 1);
    const updateDb = database.transaction('jate', 'readwrite');
    const saveDb = updateDb.objectStore('jate');
    const request = saveDb.put({ id: 1, value: content });
    const result = await request;
    console.log('Data saved to the database', result.value);
  };
  

  export const getDb = async () => {
    console.log('GET from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    result
      ? console.log('This is data from Database', result.value)
      : console.log('Unable to find data in database');
    return result?.value;
  };
  

initdb();
