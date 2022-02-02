import db from "@/firebase/config";
import store from "@/store"

export default {
    //User -----------------------------------------------------------------------------------------------------------------------------------User Start
    async createUserIfNotExists() {
        const query = db.collection("user").where("userId", "==", store.state.user.uid);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                db.collection("user").add({
                    userId: store.state.user.uid,
                    name: store.state.user.displayName,
                    email: store.state.user.email,
                    firstLogin: new Date(Date.now()),
                })
            }
        } catch (error) {
            console.log('Error when settings User: ', error);
        }
    },
    //User -----------------------------------------------------------------------------------------------------------------------------------User End

    async getDocuments(collectionName) {
        const query = db.collection(collectionName);
        const snapshot = await query.get();

        const mappedDocuments = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return mappedDocuments;
    },
}