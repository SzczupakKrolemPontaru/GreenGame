<template>
  <div>
    <div v-for="ch in chats" :key="ch.id">
      <div>
        <small>{{ ch.date }}</small>
        <p>{{ ch.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { ref, onUnmounted } from "vue";

export default {
  name: "MultiplayerBoard",
  data: () => ({
    chats: ref([]),
  }),
  mounted() {
    const chatSnapshot = onSnapshot(
        query(collection(db, "chat"), orderBy("date", "desc")),
        (snapshot) => {
          this.chats = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
        }
    );
    onUnmounted(chatSnapshot);
  },
};
</script>

<style>
</style>
