<template>
  <div class="auth-page">
    <div class="card">
      <div class="brand">
        <span class="icon">🍽️</span>
        <h1>Gourmet</h1>
        <p>Connectez-vous à votre espace</p>
      </div>

      <div v-if="success" class="success-box">
        <p>✅ Connexion réussie ! Redirection...</p>
      </div>

      <div v-else>
        <div class="field">
          <label>Adresse e-mail</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="vous@example.com"
            :class="{ error: errors.email }"
            @blur="validateEmail"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            :class="{ error: errors.password }"
            @blur="validatePassword"
          />
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <div class="row-options">
          <label class="remember">
            <input type="checkbox" v-model="form.remember" />
            Se souvenir de moi
          </label>
          <a href="#">Mot de passe oublié ?</a>
        </div>

        <button class="btn" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <p class="link-bottom">
          Pas de compte ?
          <router-link to="/inscription">S'inscrire</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      form: { email: '', password: '', remember: false },
      errors: { email: '', password: '' },
      loading: false,
      success: false,
    }
  },
  methods: {
    validateEmail() {
      if (!this.form.email) {
        this.errors.email = "L'e-mail est requis."
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = "Format d'e-mail invalide."
      } else {
        this.errors.email = ''
      }
    },
    validatePassword() {
      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis.'
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Minimum 6 caractères.'
      } else {
        this.errors.password = ''
      }
    },
    async handleLogin() {
      this.validateEmail()
      this.validatePassword()
      if (this.errors.email || this.errors.password) return

     this.loading = true
    try {
      const response = await axios.post('http://127.0.0.1:8000/commandes/token/', {
        username: this.form.email,
        password: this.form.password
      })
      localStorage.setItem('token', response.data.access)
      this.loading = false
      this.success = true
      setTimeout(() => this.$router.push('/home'), 1500)
    } catch (e) {
      this.loading = false
      alert('Email ou mot de passe incorrect.')
    }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #fdf6ec;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(59,31,14,0.12);
}
.brand {
  text-align: center;
  margin-bottom: 2rem;
}
.brand .icon { font-size: 2.5rem; }
.brand h1 {
  font-family: Georgia, serif;
  font-size: 1.8rem;
  color: #3b1f0e;
  margin: 0.3rem 0 0.2rem;
}
.brand p { font-size: 0.85rem; color: #8a6a50; }

.field { margin-bottom: 1.2rem; }
.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8a6a50;
  margin-bottom: 0.4rem;
}
.field input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #e8ddd3;
  border-radius: 8px;
  font-size: 0.92rem;
  color: #3b1f0e;
  background: #fdf6ec;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field input:focus { border-color: #c8892a; }
.field input.error { border-color: #c0392b; }
.error-msg { font-size: 0.75rem; color: #c0392b; margin-top: 0.3rem; display: block; }

.row-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
  font-size: 0.82rem;
  color: #8a6a50;
}
.remember { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }
.remember input { accent-color: #c8892a; }
.row-options a { color: #c8892a; text-decoration: none; font-weight: 500; }

.btn {
  width: 100%;
  padding: 0.85rem;
  background: #c8892a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:hover { background: #b57a22; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.link-bottom {
  text-align: center;
  margin-top: 1.2rem;
  font-size: 0.83rem;
  color: #8a6a50;
}
.link-bottom a { color: #c8892a; font-weight: 500; text-decoration: none; }

.success-box {
  text-align: center;
  padding: 2rem 0;
  font-size: 1rem;
  color: #27ae60;
}
</style>