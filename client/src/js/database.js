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

  const database = await openDB('jate', 1);
  const readADD = database.transaction('jate', 'readwrite');
  const savedContent = readADD.objectStore('jate');
  const newDB = savedContent.put({ id: 1, value: content });
  const updatedDb = await newDB;
  console.log('Data saved to the database', updatedDb.value);

};

export const getDb = async () => {

  const database = await openDB('jate', 1);
  const content = database.transaction('jate', 'readonly');
  const savedContent = content.objectStore('jate');
  const readDb = savedContent.get(1);
  const result = await readDb;
  
  if (!result) {console.log('Data not found in the database');}
  console.log('Data was READ', result.value)
  return result?.value;
};

initdb();
