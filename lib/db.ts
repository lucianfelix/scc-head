// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase, ref, get, set, child, onValue, off} from "firebase/database";
import {any} from "prop-types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2fSCWIotCNH-tHe9FskHYQyDwexb6ib4",
    authDomain: "rna-live.firebaseapp.com",
    projectId: "rna-live",
    storageBucket: "rna-live.appspot.com",
    messagingSenderId: "875213914664",
    appId: "1:875213914664:web:3c6ac8b4f19c97fc692b1d",
    measurementId: "G-PFQQEB5V1J",
    databaseURL: "https://rna-live-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

//const analytics = getAnalytics(app);

type DataType = {
    [key: string]: any;
};

function translateKey(key: string) {
    if (key === "https://main--upm--hlxsites.hlx.live/query-index.json?limit=500&offset=0") {
        key = "upm-idx";
    }

    if (key === "https://main--upm--hlxsites.hlx.live/") {
        key = "upm";
    }

    if (key === "https://main--upm--hlxsites.hlx.live") {
        key = "hlx";
    }

    return key;
}

export async function getData(key: string): Promise<DataType | undefined> {
    key = translateKey(key);

    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, key));

    if (snapshot.exists()) {
        console.log(snapshot.val());
        const data = snapshot.val();
        return data;
    } else {
        console.log("No data available");
    }
}

class FirebaseStoreStorage {
    data : DataType | undefined = {};
    subscribers = new Set<() => void>();

    fetch() {
        let key = 'hlx';
        key = translateKey(key);

        const dbRef = ref(getDatabase(), 'hlx');
        onValue(dbRef, async (snapshot) => {
            //log current time
            console.log("Got updated data at: ", new Date().toLocaleTimeString());
            this.data = snapshot.val();
            this.subscribers.forEach((notify) => notify());
        });

        // @ts-ignore
        getData('hlx').then(
            (newData) => {
                this.data = newData;
                this.subscribers.forEach((notify) => notify());
            }
        );

    }

    subscribe(notify: () => void) {
        this.subscribers.add(notify);
    }

    unsubscribe(notify: () => void) {
        this.subscribers.delete(notify);
        const dbRef = ref(getDatabase(), 'hlx');
        off(dbRef);
    }
}

export const firebaseStoreStorageInstance = new FirebaseStoreStorage();

// Create a Firebase store and pass it to useSyncExternalStore
export let firebaseStore: {
    getServerSnapshot: () => any;
    //getServerSnapshot: () => Promise<any>;
    subscribe: (onStoreChange: () => void) => () => void;
    // fetch: (key: string) => Promise<void>;
    //getSnapshot: () => Promise<any>
    getSnapshot: () => any
};

firebaseStore = {
    // A function that subscribes to changes in the store
    subscribe: (onStoreChange: () => void) => {
        //firebaseStoreStorageInstance.fetch();
        firebaseStoreStorageInstance.subscribe(onStoreChange);
        return () => {
            firebaseStoreStorageInstance.unsubscribe(onStoreChange);
        };
        // Subscribe to changes in the Firebase database and call the
        // provided callback function when the data changes
        // const docRef = ref(getDatabase(), 'hlx');
        // onValue(docRef, async (snapshot) => {
        //     const data = await snapshot.val();
        //     onStoreChange();
        // });
        //
        // // Return a function that can be used to unsubscribe from the
        // // store change events
        // return () => {
        //     off(docRef);
        // };
    },
    // A function that gets the current snapshot of the store data
    getSnapshot: () => {
        // Get the current value of the data from the Firebase database
        // and return it as the snapshot
        // const docRef = ref(getDatabase(), 'hlx');
        // const r = await get(docRef);
        // return await r.val();

        return firebaseStoreStorageInstance.data;
    },

    // A function that gets the latest snapshot of the store data from
    // the server (optional)
    getServerSnapshot: () => {
        return firebaseStoreStorageInstance.data;
        // Get the latest value of the data from the Firebase database
        // and return it as the snapshot
        // const docRef = ref(getDatabase(), 'hlx');
        // const s = await get(docRef);
        // return await s.val();
        // const dataSnapshot = dataRef.once('value', {
        //     serverTimeStamp: firebase.database.ServerValue.TIMESTAMP,
        // });
        // return dataSnapshot.then(snapshot => snapshot.val());
    },

    // data: any
};

export const dummyStore = {

    subscribe: (onStoreChange: () => void) => {
        console.log("subscribe");
        const i = setInterval(onStoreChange, 3000);
        return () => {
            clearInterval(i);
        };
    },

    getSnapshot: () => {
        console.log("getSnapshot");
        return "bla bla";
    },

    getServerSnapshot: () => {
        console.log("getServerSnapshot");
        return "bla bla";
    }
};