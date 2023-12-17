<template>
<div>
  <h1>Dane konta</h1>
  <h3 v-if="user && user.email">Email: {{user.email}}</h3>
  <h3 v-if="user && user.name !== null && user.name !== undefined">Imię: {{user.name}}</h3>
  <div>
    <button v-if="user" class="btn btn-lg btn-outline-dark" @click="this.logout">
    Wyloguj się
  </button>
  </div>


</div>
</template>
<script>
import {store} from "@/store";
import {logOutUser} from "@/firebase/auth";
import {ref, watch} from "vue";
import {useRouter} from 'vue-router'

export default {
  name: "AccountView",
  setup() {
    let user = ref(store.user);
    const router = useRouter()
    const logout = async () => {

      await logOutUser();
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