<template>
<div>
  <h1>Account info</h1>
  <h3 v-if="user && user.email">Email: {{user.email}}</h3>
  <h3 v-if="user && user.emailVerified !== null">Email verified: {{user.emailVerified}}</h3>
  <div>
    <button v-if="user" class="btn btn-lg btn-outline-dark" @click="this.logout">
    Logout
  </button>
  </div>


</div>
</template>
<script>
import {store} from "@/store";
import {logOutUser} from "@/firebase/firebase";
import {ref, watch} from "vue";
import {useRouter} from 'vue-router'

export default {
  name: "AccountView",
  setup() {
    let user = ref(store.user);
    const router = useRouter()
    const logout = async () => {

      await logOutUser();
      store.user = null;
      await router.push('/');
    }

    watch(
        () => store.user,
        (newValue) => {
          user.value = newValue;
          console.log('User changed to: ', user.value);
        }
    )
    return {
      user,
      logout,
    };
  }
}

</script>

<style scoped>

</style>