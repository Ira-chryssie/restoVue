<template>
  <div>

    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <router-link to="/panier" class="back-btn">←</router-link>
        <div class="logo">
          <span>Vos Informations</span>
        </div>
        <div style="width: 40px;"></div>
      </div>
    </header>

    <main class="form-container">

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nom *</label>
          <input type="text" class="form-input" placeholder="Votre nom" v-model="client.nom">
        </div>
        <div class="form-group">
          <label class="form-label">Prénom *</label>
          <input type="text" class="form-input" placeholder="" v-model="client.prenom">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Email *</label>
        <input type="email" class="form-input" placeholder="exemple@gmail.com" v-model="client.email">
      </div>

      <div class="form-group">
        <label class="form-label">Téléphone *</label>
        <input type="tel" class="form-input" placeholder="+257 ......." v-model="client.telephone">
      </div>

      <!-- Récapitulatif -->
      <div class="form-recap">
        <div class="form-recap-title">Récapitulatif</div>
        <div class="form-recap-row" v-for="plat in panier" :key="plat.nom">
          <span>{{ plat.quantite }}× {{ plat.nom }}</span>
          <span>{{ (plat.prix * plat.quantite).toFixed(2) }}€</span>
        </div>
        <div class="form-recap-row">
          <span>Frais de service (5%)</span>
          <span>{{ (total * 0.05).toFixed(2) }}€</span>
        </div>
        <div class="form-recap-total">
          <span>Total à payer</span>
          <span>{{ (total * 1.05).toFixed(2) }}€</span>
        </div>
      </div>

      <button class="submit-btn" @click="confirmer">
        CONFIRMER LA COMMANDE
      </button>

      <button class="secondary-btn" @click="$router.push('/panier')">
        ← Retour au panier
      </button>

    </main>

  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'CommandeView',
  data() {
    return {
      client: store.client
    }
  },
  computed: {
    panier() {
      return store.panier
    },
    total() {
      return store.total
    }
  },
  methods: {
    confirmer() {
      if (!this.client.nom || !this.client.email || !this.client.telephone) {
        alert('Veuillez remplir tous les champs obligatoires !')
        return
      }
      this.$router.push('/confirmation')
    }
  }
}
</script>