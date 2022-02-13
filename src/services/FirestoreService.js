import { firestore, fsTimestamp } from "@/firebase/config";
import store from "@/store"

export default {
    //User -----------------------------------------------------------------------------------------------------------------------------------User Start
    async createUserIfNotExists() {
        const query = firestore.collection("users").where("userId", "==", store.state.user.uid);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                firestore.collection("users").add({
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

    //Documents ------------------------------------------------------------------------------------------------------------------------------Documents Start
    async getDocuments(collectionName) {
        const query = firestore.collection(collectionName);
        const snapshot = await query.where("userId", "==", store.state.user.uid)
            // .orderBy("createdAt")
            .get();
        const mappedDocuments = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return mappedDocuments;
    },

    async deleteDocument(collectionName, id) {
        await firestore
            .collection(collectionName)
            .doc(id)
            .delete();
    },
    //Documents ------------------------------------------------------------------------------------------------------------------------------Documents End

    //Platform -------------------------------------------------------------------------------------------------------------------------------Platform Start
    async addPlatform(platform) {
        return await firestore
            .collection("platforms")
            .add({
                name: platform.name,
                icon: platform.icon == undefined ? "" : platform.icon,
                userId: store.state.user.uid,
                createdAt: fsTimestamp()
            });
    },

    async updatePlatform(platform) {
        await firestore.collection("platforms").doc(platform.id).update({
            name: platform.name,
            icon: platform.icon,
        });
    },
    //Platform -------------------------------------------------------------------------------------------------------------------------------Platform End

    //Account --------------------------------------------------------------------------------------------------------------------------------Account Start
    async addAccount(account) {
        return await firestore
            .collection("accounts")
            .add({
                name: account.name,
                userId: store.state.user.uid,
                createdAt: fsTimestamp()
            });
    },
    async updateAccount(account) {
        await firestore.collection("accounts").doc(account.id).update({
            name: account.name,
        });
    },
    //Account -------------------------------------------------------------------------------------------------------------------------------Account End

    //Game ----------------------------------------------------------------------------------------------------------------------------------Game Start
    async addGame(game) {
        return await firestore
            .collection("games")
            .add({
                name: game.name,
                platformId: game.platformId == undefined ? "" : game.platformId,
                accountId: game.accountId == undefined ? "" : game.accountId,
                gameStateId: game.gameStateId == undefined ? null : game.gameStateId,
                editedAt: fsTimestamp(),
                userId: store.state.user.uid,
                createdAt: fsTimestamp()
            });
    },
    async updateGame(game) {
        await firestore.collection("games").doc(game.id).update({
            name: game.name,
            platformId: game.platformId,
            accountId: game.accountId,
            gameStateId: game.gameStateId,
            editedAt: fsTimestamp()
        });
    },
    //Game -------------------------------------------------------------------------------------------------------------------------------Game End
}