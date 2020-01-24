<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="user === null && status === null">
      <input type="text" name="username" v-model="username"/> <br>
      <button @click="getUserData"> Search </button>
    </div>
    <div v-if="status === 404" class="not-found">
      <h1>Data user tidak ditemukan :(</h1>
    </div>
  </div>
</template>

<script>
  import GithubService from '@/services/GithubService'

  export default {

    name: 'hello',
    data () {
      return {
        msg: 'VueJS PWA consuming Github API',
        username: '',
        user: null,
        status: null,
        repository: []
      }
    },

    methods: {
      async getUserData() {
        this.user = null;

        const result = await GithubService.searchUser({
          username: this.username
        }).then(response => {
          this.$store.commit('setData', response.data)
          this.user = response.data
        }).catch(error => {
          console.log(error)
        })
        if(!result){
          this.status = 404
        }
        if(this.user !== null) {
          const repos = await GithubService.searchRepos({
            username: this.user.login
          }).then(response => {
            this.$store.commit('setRepositories', response.data)
            this.repository = response.data
          }).catch(error => {
            console.log(error)            
          })
          if(this.repository.length > 0){
            this.$router.push({name: 'profile', params : { username: this.user.login}});
          }
        }
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  input {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0; 
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .not-found {
    margin-top: 20%
  }

  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .profile {
    padding: 16px;
  }

  label {
    font-size: 20px;
  }
  
</style>
