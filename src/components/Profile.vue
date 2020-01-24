<template>
  <div>
    <div v-if="user !== null">
      <img v-bind:src="user.avatar_url" width="200" height="200"> <br>
      <label>Username : {{ user.login }}</label> <br>
      <label>Profile name : {{ user.name }}</label> <br>
      <label>Profile bio : {{ user.bio }}</label>
    </div>
    <div v-if="user === null">
      <p>Profile page</p>
    </div>
    <div v-if="repositories.length > 0">
      <ul>
        <li v-for="(repo, index) in repositories" :key="index" class="pick" @click="getReadme(repo)">
          {{repo.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GithubService from '@/services/GithubService'

export default {
  name: 'Profile',
  data() {
    return {
      readme: null
    }
  },

  computed: {
    user() {
      return this.$store.state.userGithub
    },

    repositories() {
      return this.$store.state.repositories
    }
  },
  
  mounted() {
    console.log(this.$store.state.userGithub)
    console.log(this.$store.state.repositories)
  },

  methods: {
    async getReadme (repo) {
      this.readme = null;

      const result = await GithubService.getReposReadMe(
        repo.owner.login, repo.name
      ).then(response => {
        this.readme = response.data
        const description = atob(this.readme.content)
        this.$store.commit('setReposReadMe', description)
        if(this.readme !== null){
          this.$router.push({name: 'readme', params : { reponame: repo.name}});
        }
      }).catch(error => {
        console.log(error)        
      })
    }
  },
}
</script>

<style scoped>

  label {
    font-size: 20px;
  }

  .pick {
    cursor: pointer;
    margin-bottom: 10px;
  }
  
</style>
