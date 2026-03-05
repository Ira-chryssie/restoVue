<template>
  <div>

    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span>📋 Mes Commandes</span>
        </div>
      </div>
    </header>

    <main class="menu-container">

      <!-- Chargement -->
      <div v-if="chargement" style="text-align:center; padding: 40px;">
        ⏳ Chargement...
      </div>

      <!-- Commandes venant de Django -->
      <div class="order-card" v-for="commande in commandes" :key="commande.id">
        <div class="order-header">
          <div>
            <div class="order-id">#{{ commande.id }}</div>
            <div class="order-date">{{ commande.date_commande }}</div>
          </div>
          <span class="order-status en-attente">{{ commande.statut }}</span>
        </div>
        <div class="order-items">
          <div class="order-item" v-for="ligne in commande.lignes" :key="ligne.id">
            <span>{{ ligne.quantite }}× {{ ligne.plat_nom }}</span>
          </div>
        </div>
        <div class="order-footer">
          <span class="order-total">Client #{{ commande.client }}</span>
        </div>
      </div>

      <!-- Aucune commande -->
      <div v-if="!chargement && commandes.length === 0" class="empty-cart">
        <div class="empty-cart-icon">📋</div>
        <p class="empty-cart-text">Aucune commande trouvée</p>
      </div>

    </main>

    <!-- Navigation bas -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>Accueil</span>
      </router-link>
      <router-link to="/historique" class="nav-item active">
        <span class="nav-icon">📋</span>
        <span>Commandes</span>
      </router-link>
      <router-link to="/panier" class="nav-item">
        <span class="nav-icon">🛒</span>
        <span>Panier</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HistoriqueView',
  data() {
    return {
      commandes: [],
      chargement: true
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/commandes/commandes/')
      this.commandes = response.data
    } catch (e) {
      console.error("Erreur chargement commandes", e)
    } finally {
      this.chargement = false
    }
  }
}
</script>