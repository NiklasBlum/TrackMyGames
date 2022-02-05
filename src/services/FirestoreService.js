import { firestore, fsTimestamp } from "@/firebase/config";
import store from "@/store"

export default {
    //User -----------------------------------------------------------------------------------------------------------------------------------User Start
    async createUserIfNotExists() {
        const query = firestore.collection("user").where("userId", "==", store.state.user.uid);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                firestore.collection("user").add({
                    userId: store.state.user.uid,
                    name: store.state.user.displayName,
                    email: store.state.user.email,
                    firstLogin: fsTimestamp(),
                })
            }
        } catch (error) {
            console.log('Error when settings User: ', error);
        }
    },
    //User -----------------------------------------------------------------------------------------------------------------------------------User End

    async getDocuments(collectionName) {
        const query = firestore.collection(collectionName);
        const snapshot = await query
            // .orderBy("createdAt")
            .get();
        const mappedDocuments = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return mappedDocuments;
    },

    async addPlatform(platform) {
        return await firestore
            .collection("platform")
            .add({
                name: platform.name,
                icon: platform.icon == undefined ? "" : platform.icon,
                createdAt: fsTimestamp()
            });
    },
    async deletePlatform(id) {
        await firestore
            .collection("platform")
            .doc(id)
            .delete();
    },
    async updatePlatform(platform) {
        await firestore.collection("platform").doc(platform.id).update({
            name: platform.name,
            icon: platform.icon,
        });
    }
}