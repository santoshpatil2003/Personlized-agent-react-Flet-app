import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, Firestore, DocumentData } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, UserCredential, AuthCredential } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';


class AgentEdit {
    edit: boolean = false;

    constructor() {}

    get_edit(): boolean {
        return this.edit;
    }

    update_edit(edit: boolean): void {
        this.edit = edit;
    }
}


// TODO: Replace with your app's Firebase configuration
// const firebaseConfig = {
//     type: "service_account",
//     project_id: "ratefit2",
//     private_key_id: "1d066ddc65e916d017e23599b5bff603eba3b201",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1KwQ9ZSbQtLDa\n0Szb331jEajWsD7noh8uFZyGibmgayaL96gUhYVUTCOspE+XGrhsExVKkEjBmReM\nR9lYV1Vdr+3ReIkZKm2GmD1Kf+qvM+R+FsPRCZvBS9GcH6vir4NCfXEQv64fbg0t\nbuffg/AoN+G9rUyEz3BYCAEeZOwB+5gkTZ5tws5I2HoDiS1hbgwWlMZQ0vCdNsyY\nvfV1j8Mb6Ab3KSRx/39q/dfYJilPR7bx7xaBVR01YLo807TJ+fKEULW1HmPagLmQ\nRDn7jRW9U2fkE/WqOViLovln75UQxZ7wZE2X/X6/zjb77dgf7X54nldefrw30M9I\nctfI2cxRAgMBAAECgf9YEkT0fmuFhqcIgCsz6hN6gj0FhM+eAMzyQzZruCFAB4Gs\nzQTYymyBQftHhcr5i/PYFi7XGZfvsEW13GmgClS66lSUQiLHfnbuZAI9E5JWyBpt\n40pZBKnftv3RBjgVnQfbUEATV+KhfcBYbP5k00uAJUbd1AbLSaIZDRI3C3/v/RxD\nfk36Wdu8u6Seo7Sj1EaCqDfmTevuVUkYPuhWtUBISMNSYLlGcAyyUwfn1bSu5YZg\nQxE6FJmpmdol+rogbLhyO9REeP9KlZh5LcPprBvM1R/nyMBHCy2mKEyeOZdkvuI8\nWWxNDNqtB4hf4Ls9CaJUrqrc6VJnADDQe/frbsECgYEA899Xy5R1PqNkDwJybiCv\nBIltlf/ms0OOlRzDpsfbLBnGFOioBY4bup191lMHIsIZpIuDf+VgB8rQXOgsT62G\nLATQbbfITHflLEmJKVxcN0UgOUQ1J2HVvkRmThwPt8da+2tvArr4GcjDkx6OezQf\nOjYO6alE3yMNbZRv2+TbEsECgYEAvi1nu+i9OGJI8Cg0mtKuQvpiwfocBN6C5uib\nfl+kuGXPvhk+IXmxMHL243aDO9NohrfwmPXnz7wPSNVLEhj7rqaQhy8DPLYil1e8\nneWk2N6Sj2as5qPkVEV9QevYHqOs5KsXRzYoJQgxvMLNAqiKsJTu8O+lcuYS1CYE\nUPvIbZECgYEAojCNsUVg3HHKH/lepUNzYq8LhNEWW264qw7gSFFuwFu70zgQVvF2\nG5yWji3V9xXj+/0VTb/9J/GIteFrZupe63OgMvghbEnozpVxdWKJqfB9R9jHCRQW\nFV5kM9qR0YXySnfe8o/qZSuSdovB8sptYkeFj30V4tjrG0+3PSVtVYECgYA+lLZ0\nEWxi54TU8oYNBJMvmzFwX5tkxswQrC6u8U5FF8u65JebcG4sYUh5JYCd6T2WR2U3\nEISNyXbGItonRG1d1ZXtxjysd8r+PnLlCrKqYuObqM/wvbHfQVasoK1nt7inLt3k\nIyAmv4GOehP4cfnhjcDrLBEntCoyAaid9ZzI4QKBgQCNh0AVxeDZiIn5fENhdZsY\n1v7xMus80fYmS6cFoxmtWZyIcEAckVs1nEJB09zuIktJwc3gJmfFAQeDf9Qy99/r\nF0b/VTy02JyAIaR+9R4VGCbFu+ezpe/IYaM191/euAIGIDYdZznKSrJ1cnbEB8C3\nJcexZcavrT68RCD/twT0DQ==\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-2bb0g@ratefit2.iam.gserviceaccount.com",
//     client_id: "103571010316904811398",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2bb0g%40ratefit2.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com"
// };

const firebaseConfig = {
    'apiKey': "AIzaSyCE9XJuFEAKtsFl-QfGfJBBD-cKsObZTsQ",
    'authDomain': "ratefit2.firebaseapp.com",
    'databaseURL': "https://ratefit2-default-rtdb.asia-southeast1.firebasedatabase.app",
    'projectId': "ratefit2",
    'storageBucket': "ratefit2.appspot.com",
    'messagingSenderId': "329927444210",
    'appId': "1:329927444210:web:cf4f130125406bcc81b26b"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);

function create_id(): number {
    let x = new Date().toISOString();
    const l = ["-", " ", ":", "."];
    for (let i of l) {
        if (x.includes(i)) {
            const dl = x.split(i);
            x = dl.join('');
        }
    }
    let f = parseInt(x) / 1000000000000;
    var f1 = f.toString().split(".")[1];
    return Math.floor(parseInt(f1));
}

function delete_agent_file(agent_id: string): void {
    // This function would need to be implemented using Node.js file system operations
    // as TypeScript doesn't have direct file system access
}

class AgentsData {
    private name: string = "";
    uuid: string = "";
    private user_data_db: string = 'users_data';

    constructor() {}

    set_uuid(uuid: string): void {
        this.uuid = uuid.replace(/\/$/, '');
    }

    create_new_id(): string {
        return create_id().toString();
    }

    update_name(name: string): void {
        this.name = name;
    }

    get_name(): string {
        return this.name;
    }

    async delete_agent(agent_id: string, uuid: string): Promise<void> {
        if (!uuid || uuid.endsWith('/')) return;
        const userDoc = await getDoc(doc(db, this.user_data_db, uuid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedAgents = userData.agents.filter((agent: { _id: string; }) => agent._id !== agent_id);
            await updateDoc(doc(db, this.user_data_db, uuid), { agents: updatedAgents });
        }
    }

    async create_user(name: string, uuid: string): Promise<void> {
        if (!uuid || uuid.endsWith('/')) return;

        const user_doc = {
            "_id": uuid,
            "user_name": name,
            "agents": []
        };
        await setDoc(doc(db, this.user_data_db, uuid), user_doc);
    }

    async create_agent(name: string, uuid: string): Promise<string> {
        const new_agent_id = this.create_new_id();
        const new_agent = {
            "_id": new_agent_id,
            "agent_name": name,
            "chat_history": []
        };
        await updateDoc(doc(db, this.user_data_db, uuid), {
            agents: arrayUnion(new_agent)
        });
        return new_agent_id;
    }

    async get_data(): Promise<DocumentData[]> {
        const querySnapshot = await getDocs(collection(db, this.user_data_db));
        return querySnapshot.docs.map(doc => doc.data());
    }

    async get_user_data(uuid: string): Promise<DocumentData | null> {
        if (!uuid || uuid.endsWith('/')) return null;
        const docSnap = await getDoc(doc(db, this.user_data_db, uuid));
        return docSnap.exists() ? docSnap.data() : null;
    }

    async update_agent_history(agent_id: string, new_history: any[], uuid: string): Promise<void> {
        if (!uuid || uuid.endsWith('/')) return;
        const userDoc = await getDoc(doc(db, this.user_data_db, uuid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const agents = userData.agents || [];
            const updatedAgents = agents.map((agent: { _id: string; }) => 
                agent._id === agent_id ? {...agent, chat_history: new_history} : agent
            );
            await updateDoc(doc(db, this.user_data_db, uuid), { agents: updatedAgents });
        }
    }

    async get_data_of(agent_id: string, uuid: string): Promise<any | null> {
        if (!uuid || uuid.endsWith('/')) return null;
        const userDoc = await getDoc(doc(db, this.user_data_db, uuid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.agents?.find((agent: { _id: string; }) => agent._id === agent_id) || null;
        }
        return null;
    }

    async delete_agent_history(agent_id: string, uuid: string): Promise<boolean> {
        if (!uuid || uuid.endsWith('/')) return false;
        const userDoc = await getDoc(doc(db, this.user_data_db, uuid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const agents = userData.agents || [];
            const updatedAgents = agents.map((agent: { _id: string; }) => 
                agent._id === agent_id ? {...agent, chat_history: []} : agent
            );
            await updateDoc(doc(db, this.user_data_db, uuid), { agents: updatedAgents });
            return true;
        }
        return false;
    }

    async delete_all(): Promise<void> {
        const querySnapshot = await getDocs(collection(db, this.user_data_db));
        querySnapshot.forEach(async (document) => {
            await deleteDoc(doc(db, this.user_data_db, document.id));
        });
    }

    async get_agents_list(uuid: string): Promise<any[]> {
        if (!uuid || uuid.endsWith('/')) return [];
        const userDoc = await getDoc(doc(db, this.user_data_db, uuid));
        return userDoc.exists() ? userDoc.data().agents || [] : [];
    }
}

class UserData {
    private name: string = "";
    private uid: number = create_id();
    private email: string = "";
    private password: string = "";
    private cpassword: string = "";

    set_user(uid: string, name: string, email: string, password: string): void {
        this.name = name;
        this.uid = parseInt(uid);
        this.email = email;
        this.password = password;
    }

    set_user_name(name: string): void {
        this.name = name.trim();
    }

    set_user_email(email: string): void {
        this.email = email.trim();
    }

    set_user_password(password: string): void {
        this.password = password.trim();
    }

    set_user_cpassword(cpassword: string): void {
        this.cpassword = cpassword.trim();
    }

    async delete_user(uid: string): Promise<number> {
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteUser(user);
                return 1;
            }
            return -1;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "FirebaseError" && error.message.includes("auth/user-not-found")) return -1;
                if (error.name === "ConnectionError") return 0;
            }
            throw error;
        }
    }

    async get_user(uid: string): Promise<UserCredential | number> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
            return userCredential;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "FirebaseError" && error.message.includes("auth/user-not-found")) return -1;
                if (error.name === "ConnectionError") return 0;
            }
            throw error;
        }
    }

    async create_auth(): Promise<UserCredential | number | boolean> {
        try {
            if (this.password === this.cpassword) {
                return await createUserWithEmailAndPassword(auth, this.email, this.password);
            } else {
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "FirebaseError" && error.message.includes("auth/email-already-in-use")) return 1;
                if (error.name === "ConnectionError") return -1;
                if (error.name === "ValueError") return -2;
            }
            throw error;
        }
    }

    async add_user(): Promise<UserCredential | number | boolean> {
        const user = await this.create_auth();
        if (typeof user === 'object' && user !== null) {
            const usersRef = ref(rtdb, 'users/' + user.user.uid);
            await update(usersRef, {
                uid: user.user.uid,
                name: this.name,
                email: this.email,
                password: this.password,
            });
            return user;
        }
        return user;
    }

    async check_user(): Promise<string | number | boolean> {
        try {
            console.log("hi-1")
            const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
            console.log("hi-2")
            const usersRef = ref(rtdb, 'users/' + userCredential.user.uid);
            console.log("hi-3")
            // console.log(userCredential.user.uid)
            // You would need to implement a method to get data from Realtime Database
            // const userData = await get(usersRef);
            // if (userData.exists() && userData.val().password === this.password) {
            //     return userCredential.user.uid;
            // }
            return userCredential.user.uid; // Simplified for this example
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "FirebaseError" && error.message.includes("auth/user-not-found")) return 0;
                if (error.name === "ValueError") return 1;
            }
            throw error;
        }
    }
}

export {UserData, AgentEdit, AgentsData}