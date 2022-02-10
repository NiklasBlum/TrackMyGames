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
    async deletePlatform(id) {
        await firestore
            .collection("platforms")
            .doc(id)
            .delete();
    },
    async updatePlatform(platform) {
        await firestore.collection("platforms").doc(platform.id).update({
            name: platform.name,
            icon: platform.icon,
        });
    },
    //Platform -------------------------------------------------------------------------------------------------------------------------------Platform End

    //Platform -------------------------------------------------------------------------------------------------------------------------------Platform Start
    async addAccount(account) {
        return await firestore
            .collection("accounts")
            .add({
                name: account.name,
                userId: store.state.user.uid,
                createdAt: fsTimestamp()
            });
    },
    async deleteAccount(id) {
        await firestore
            .collection("accounts")
            .doc(id)
            .delete();
    },
    async updateAccount(account) {
        await firestore.collection("accounts").doc(account.id).update({
            name: account.name,
        });
    },
    //Account -------------------------------------------------------------------------------------------------------------------------------Account End

    //Platform -------------------------------------------------------------------------------------------------------------------------------Platform Start
    async addGame(game) {
        console.log(game);
        return await firestore
            .collection("games")
            .add({
                name: game.name,
                platform: game.platform == undefined ? "" : game.platform,
                account: game.account == undefined ? "" : game.account,
                editedAt: fsTimestamp(),
                userId: store.state.user.uid,
                playType: game.playType,
                createdAt: fsTimestamp()
            });
    },
    async deleteGame(id) {
        await firestore
            .collection("games")
            .doc(id)
            .delete();
    },
    async updateGame(game) {
        await firestore.collection("games").doc(game.id).update({
            name: game.name,
            platform: game.platform,
            account: game.account,
            playType: game.playType,
            editedAt: fsTimestamp()
        });
    },
    //Account -------------------------------------------------------------------------------------------------------------------------------Account End
}