<template>
  <div class="auth-page">
    <div class="card">
      <div class="brand">
        <span class="icon">🍽️</span>
        <h1>Gourmet</h1>
        <p>Créez votre compte</p>
      </div>

      <div v-if="success" class="success-box">
        <p>🎉 Compte créé avec succès ! Redirection...</p>
      </div>

      <div v-else>
        <div class="row-2">
          <div class="field">
            <label>Prénom</label>
            <input
              type="text"
              v-model="form.prenom"
              placeholder="votre prénom"
              :class="{ error: errors.prenom }"
              @blur="validatePrenom"
            />
            <span v-if="errors.prenom" class="error-msg">{{ errors.prenom }}</span>
          </div>

          <div class="field">
            <label>Nom</label>
            <input
              type="text"
              v-model="form.nom"
              placeholder="votre nom"
              :class="{ error: errors.nom }"
              @blur="validateNom"
            />
            <span v-if="errors.nom" class="error-msg">{{ errors.nom }}</span>
          </div>
        </div>

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
            @input="updateStrength"
            @blur="validatePassword"
          />
          <div class="strength-bar">
            <span
              v-for="i in 4"
              :key="i"
              :class="['bar-seg', strength >= i ? 'level-' + strength : '']"
            ></span>
          </div>
          <span class="strength-label">{{ strengthLabel }}</span>
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <div class="field">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            v-model="form.confirm"
            placeholder="••••••••"
            :class="{ error: errors.confirm }"
            @blur="validateConfirm"
          />
          <span v-if="errors.confirm" class="error-msg">{{ errors.confirm }}</span>
        </div>

        <div class="field">
          <label>Téléphone <small>(optionnel)</small></label>
          <input
            type="tel"
            v-model="form.tel"
            placeholder="+257 ......."
          />
        </div>

        <label class="terms">
          <input type="checkbox" v-model="form.terms" />
          J'accepte les <a href="#">conditions d'utilisation</a>
        </label>
        <span v-if="errors.terms" class="error-msg" style="margin-bottom:0.8rem;display:block">
          {{ errors.terms }}
        </span>

        <button class="btn" @click="handleRegister" :disabled="loading">
          {{ loading ? 'Création...' : 'Créer mon compte' }}
        </button>

        <p class="link-bottom">
          Déjà un compte ?
          <router-link to="/login">Se connecter</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'InscriptionView',
  data() {
    return {
      form: {
        prenom: '', nom: '', email: '',
        password: '', confirm: '', tel: '', terms: false
      },
      errors: {
        prenom: '', nom: '', email: '',
        password: '', confirm: '', terms: ''
      },
      strength: 0,
      loading: false,
      success: false,
    }
  },
  computed: {
    strengthLabel() {
      return ['', 'Très faible', 'Faible', 'Correct', 'Fort'][this.strength]
    }
  },
  methods: {
    updateStrength() {
      const p = this.form.password
      let s = 0
      if (p.length >= 6) s++
      if (p.length >= 10) s++
      if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++
      if (/[^A-Za-z0-9]/.test(p)) s++
      this.strength = s
    },
    validatePrenom()  { this.errors.prenom   = this.form.prenom  ? '' : 'Prénom requis.' },
    validateNom()     { this.errors.nom      = this.form.nom     ? '' : 'Nom requis.' },
    validateEmail() {
      if (!this.form.email)                        { this.errors.email = 'E-mail requis.'; return }
      if (!/\S+@\S+\.\S+/.test(this.form.email))  { this.errors.email = 'Format invalide.'; return }
      this.errors.email = ''
    },
    validatePassword() {
      if (!this.form.password)             { this.errors.password = 'Mot de passe requis.'; return }
      if (this.form.password.length < 6)   { this.errors.password = 'Minimum 6 caractères.'; return }
      this.errors.password = ''
    },
    validateConfirm() {
      this.errors.confirm =
        this.form.confirm === this.form.password ? '' : 'Les mots de passe ne correspondent pas.'
    },
    validateTerms() {
      this.errors.terms = this.form.terms ? '' : 'Vous devez accepter les conditions.'
    },
    async handleRegister() {
      this.validatePrenom(); this.validateNom()
      this.validateEmail(); this.validatePassword()
      this.validateConfirm(); this.validateTerms()
      if (Object.values(this.errors).some(e => e)) return

      this.loading = true
    try {
      await axios.post('http://127.0.0.1:8000/commandes/inscription/', {
        email: this.form.email,
        password: this.form.password,
        prenom: this.form.prenom,
        nom: this.form.nom
      })
      this.loading = false
      this.success = true
      setTimeout(() => this.$router.push('/login'), 1800)
      } catch (e) {
      this.loading = false
      const msg = e.response?.data?.erreur || "Erreur lors de l'inscription."
      alert(msg)
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
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(59,31,14,0.12);
}
.brand { text-align: center; margin-bottom: 1.8rem; }
.brand .icon { font-size: 2.5rem; }
.brand h1 {
  font-family: Georgia, serif;
  font-size: 1.8rem;
  color: #3b1f0e;
  margin: 0.3rem 0 0.2rem;
}
.brand p { font-size: 0.85rem; color: #8a6a50; }

.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem; }

.field { margin-bottom: 1.1rem; }
.field label {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8a6a50;
  margin-bottom: 0.4rem;
}
.field label small { text-transform: none; font-weight: 400; }
.field input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid #e8ddd3;
  border-radius: 8px;
  font-size: 0.91rem;
  color: #3b1f0e;
  background: #fdf6ec;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field input:focus { border-color: #c8892a; }
.field input.error { border-color: #c0392b; }
.error-msg { font-size: 0.75rem; color: #c0392b; margin-top: 0.3rem; display: block; }

/* barre de force */
.strength-bar { display: flex; gap: 4px; margin-top: 0.5rem; }
.bar-seg {
  flex: 1; height: 4px; border-radius: 4px;
  background: #e8ddd3; transition: background 0.3s;
}
.bar-seg.level-1 { background: #c0392b; }
.bar-seg.level-2 { background: #e67e22; }
.bar-seg.level-3 { background: #c8892a; }
.bar-seg.level-4 { background: #27ae60; }
.strength-label { font-size: 0.73rem; color: #8a6a50; margin-top: 0.2rem; display: block; }

.terms {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #8a6a50;
  margin-bottom: 1.2rem;
  cursor: pointer;
}
.terms input { accent-color: #c8892a; }
.terms a { color: #c8892a; text-decoration: none; font-weight: 500; }

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