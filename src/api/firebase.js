import { initializeApp } from 'firebase/app';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

import { getFutureDate } from '../utils';

const firebaseConfig = {
	apiKey: 'AIzaSyBkAgJqEvPAuUV5dzG8zyEzjlFFsDwf2uo',
	authDomain: 'tcl-shopping-list-ej.firebaseapp.com',
	databaseURL: 'https://tcl-shopping-list-ej.firebaseio.com',
	projectId: 'tcl-shopping-list-ej',
	storageBucket: 'tcl-shopping-list-ej.appspot.com',
	messagingSenderId: '589248305634',
	appId: '1:589248305634:web:6203eec343233bf60301bb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see: https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	return snapshot.docs.map((docRef) => {
		/**
		 * We must call a special `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return console.log(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		// This property will be used when we build out more of our UI.
		isChecked: false,
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item! You'll need to figure out what arguments
	 * this function must accept!
	 */
}
