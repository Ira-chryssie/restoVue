<template>
  <div>

    <main class="confirmation-container">

      <div class="confirmation-icon">✅</div>

      <h1 class="confirmation-title">Commande Confirmée!</h1>
      <p class="confirmation-number">N° #CMD-{{ numeroCommande }}</p>

      <div class="confirmation-details">
        <div class="confirmation-row">
          <span class="confirmation-icon-small">📧</span>
          <div class="confirmation-text">
            <div class="confirmation-label">Email de confirmation envoyé à</div>
            <div class="confirmation-value">{{ client.email }}</div>
          </div>
        </div>

        <div class="confirmation-row">
          <span class="confirmation-icon-small">👤</span>
          <div class="confirmation-text">
            <div class="confirmation-label">Commande au nom de</div>
            <div class="confirmation-value">{{ client.prenom }} {{ client.nom }}</div>
          </div>
        </div>

        <div class="confirmation-row">
          <span class="confirmation-icon-small">⏱️</span>
          <div class="confirmation-text">
            <div class="confirmation-label">Temps de préparation estimé</div>
            <div class="confirmation-value">25 minutes</div>
          </div>
        </div>

        <div class="confirmation-row">
          <span class="confirmation-icon-small">📍</span>
          <div class="confirmation-text">
            <div class="confirmation-label">Adresse du restaurant</div>
            <div class="confirmation-value">123 Rue de la Gastronomie, 75001 Paris</div>
          </div>
        </div>
      </div>

      <button class="checkout-btn" @click="$router.push('/historique')">
        SUIVRE MA COMMANDE
      </button>

      <button class="secondary-btn" @click="$router.push('/')">
        RETOURNER AU MENU
      </button>

    </main>

  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'ConfirmationView',
  data() {
    return {
      client: { ...store.client },
      numeroCommande: Math.floor(Math.random() * 9000) + 1000
    }
  },
  mounted() {
    store.viderPanier()
  }
}
</script>