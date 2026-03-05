<template>
  <div>

    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="back-btn">←</router-link>
        <div class="logo">
          <span>Mon Panier</span>
        </div>
        <div style="width: 40px;"></div>
      </div>
    </header>

    <main class="form-container">

      <!-- Panier vide -->
      <div v-if="panier.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p class="empty-cart-text">Votre panier est vide</p>
      </div>

      <!-- Articles -->
      <div v-for="plat in panier" :key="plat.nom" class="cart-item">
        <div class="cart-item-header">
          <div>
            <div class="cart-item-title">{{ plat.emoji }} {{ plat.nom }}</div>
            <div class="cart-item-price">{{ plat.prix }}€ × {{ plat.quantite }}</div>
          </div>
          <button class="delete-btn" @click="supprimer(plat.nom)">🗑️</button>
        </div>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn" @click="diminuer(plat.nom)">-</button>
            <span class="qty-value">{{ plat.quantite }}</span>
            <button class="qty-btn" @click="augmenter(plat)">+</button>
          </div>
          <span class="cart-item-total">{{ (plat.prix * plat.quantite).toFixed(2) }}€</span>
        </div>
      </div>

      <!-- Résumé -->
      <div v-if="panier.length > 0" class="cart-summary">
        <div class="summary-row">
          <span>Sous-total</span>
          <span>{{ total.toFixed(2) }}€</span>
        </div>
        <div class="summary-row">
          <span>Frais de service (5%)</span>
          <span>{{ (total * 0.05).toFixed(2) }}€</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>{{ (total * 1.05).toFixed(2) }}€</span>
        </div>
      </div>

      <button v-if="panier.length > 0" class="checkout-btn" @click="$router.push('/commande')">
        PASSER LA COMMANDE
      </button>

    </main>

  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'PanierView',
  computed: {
    panier() {
      return store.panier
    },
    total() {
      return store.total
    }
  },
  methods: {
    supprimer(nom) {
      store.supprimerPlat(nom)
    },
    diminuer(nom) {
      store.diminuerQuantite(nom)
    },
    augmenter(plat) {
      store.ajouterPlat(plat)
    }
  }
}
</script>