/** @format */

import { firebaseRealTimeDatabase, firebaseDatabase } from './firebase';
import { generator } from '../../helpers/Tools';
import { TypesToServer } from './TypesToServer';

var ls = localStorage.user;

export function Add(type: string, Obj: any) {
	firebaseRealTimeDatabase.ref(`${ls}/${type}/${generator()}`).set(Obj, function(error) {
		if (error) {
			// The write failed...
			console.log('error adding', error);
		} else {
			// Data saved successfully!
		}
	});
}

export function Get(type: string) {
	return firebaseRealTimeDatabase.ref(`${ls}/${type}`).once('value');
}

export function Update(type: string, id: string, Obj: any) {
	firebaseRealTimeDatabase
		.ref(`${ls}/${type}/${id}`)
		.update(Obj)
		.then(() => {})
		.catch(error => {
			console.log('error update', error);
		});
}

export function Delete(type: string, id: string) {
	firebaseRealTimeDatabase
		.ref(`${ls}/${type}/${id}`)
		.remove()
		.then(() => {
			window.location.reload();
		})
		.catch(error => {
			console.log('error delete', error);
		});
}

////////////////////////////////////////////////////

export function GetUserFromServer() {
	return firebaseDatabase.doc(`/${TypesToServer.User}/${ls}`).get();
}

/////////////////////////////////////////////////////

export function FoodDbMaker(foodObj: any) {
	firebaseRealTimeDatabase.ref(`${ls}/${TypesToServer.FoodDb}`).once('value', function(snapshot) {
		// console.log("snapshot", snapshot.val(), snapshot.key)

		snapshot.forEach(function(userSnapshot) {
			console.log('userSnapshot', userSnapshot.val().foodId);
			if (foodObj.foodId === userSnapshot.val().foodId) {
				console.log('match');
				return;
			} else {
				console.log('No match');
				Add(TypesToServer.FoodDb, foodObj);
			}
		});
	});
}

// type aka koebaaiVetnooi cherio chubby chick

export function AddBookToServer(type: string, title: string, Book: any) {
	firebaseRealTimeDatabase.ref(`Books/${type}/${title}`).set(Book, function(error) {
		if (error) {
			// The write failed...
			console.log('error adding', error);
		} else {
			// Data saved successfully!
			alert("Boek opgelaai Dankie")
		}
	});
}

export function GetAllBooksFromServer(type: string) {
	return firebaseRealTimeDatabase.ref(`Books/${type}`).once('value');
}

export function GetBookFromServer(type: string, title: string) {
	return firebaseRealTimeDatabase.ref(`Books/${type}/${title}`).once('value');
}

// type aka recipe or vloermoer or homeSlider
export function AddCardToServer(type: string, title: string, Book: any) {
	firebaseRealTimeDatabase.ref(`Books/${type}/${title}`).set(Book, function(error) {
		if (error) {
			// The write failed...
			console.log('error adding', error);
		} else {
			// Data saved successfully!
		}
	});
}

export function GetCardFromServer(type: string, title: string) {
	return firebaseRealTimeDatabase.ref(`Books/${type}/${title}`).once('value');
}
