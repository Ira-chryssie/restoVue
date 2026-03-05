<template>
  <div>

    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🍽️</span>
          <span>Le Petit Gourmet</span>
        </div>
        <router-link to="/panier" class="cart-btn">
          🛒 <span>{{ nombreArticles }}</span>
        </router-link>
      </div>
    </header>

    <!-- Recherche -->
    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" placeholder="Rechercher un plat..." v-model="recherche">
      </div>
    </div>

    <!-- Catégories -->
    <div class="categories">
      <button class="category-btn" :class="{ active: categorieActive === 'Tous' }" @click="filtrer('Tous')">Tous</button>
      <button class="category-btn plat" :class="{ active: categorieActive === 'Plat' }" @click="filtrer('Plat')">Plats</button>
      <button class="category-btn dessert" :class="{ active: categorieActive === 'Dessert' }" @click="filtrer('Dessert')">Desserts</button>
      <button class="category-btn boisson" :class="{ active: categorieActive === 'Boisson' }" @click="filtrer('Boisson')">Boissons</button>
    </div>

    <!-- Chargement -->
    <div v-if="chargement" style="text-align:center; padding: 40px;">
      ⏳ Chargement des plats...
    </div>

    <!-- Erreur -->
    <div v-if="erreur" style="text-align:center; padding: 20px; color: red;">
      {{ erreur }}
    </div>

    <!-- Liste des plats -->
    <main class="menu-container">
      <div class="plat-card" v-for="plat in platsFiltres" :key="plat.id">
        <div class="plat-image">🍽️</div>
        <div class="plat-info">
          <div class="plat-header">
            <h3 class="plat-nom">{{ plat.nom }}</h3>
            <span class="plat-prix">{{ plat.prix }} F</span>
          </div>
          <p class="plat-description">-</p>
          <div class="plat-footer">
            <span class="plat-category" :class="'cat-' + plat.categorie.toLowerCase()">
              {{ plat.categorie }}
            </span>
            <button class="add-btn" @click="ajouterAuPanier(plat)">+</button>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-if="!chargement && platsFiltres.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🔍</div>
        <p class="empty-cart-text">Aucun plat trouvé</p>
      </div>

    </main>

    <!-- Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Accueil</span>
      </router-link>
      <router-link to="/historique" class="nav-item">
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
import { store } from '../store.js'
import axios from 'axios'

export default {
  name: 'HomeView',
  data() {
    return {
      categorieActive: 'Tous',
      recherche: '',
      plats: [],
      chargement: true,
      erreur: null
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://127.0.0.1:8000/commandes/plats/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.plats = response.data.results
    } catch (e) {
      this.erreur = "Impossible de charger les plats."
    } finally {
      this.chargement = false
    }
  },
  computed: {
    nombreArticles() {
      return store.nombreArticles
    },
    platsFiltres() {
      let resultat = this.plats

      // Filtre par catégorie
      if (this.categorieActive !== 'Tous') {
        resultat = resultat.filter(p => p.categorie === this.categorieActive)
      }

      // Filtre par recherche
      if (this.recherche) {
        resultat = resultat.filter(p =>
          p.nom.toLowerCase().includes(this.recherche.toLowerCase())
        )
      }

      return resultat
    }
  },
  methods: {
    ajouterAuPanier(plat) {
      store.ajouterPlat(plat)
    },
    filtrer(categorie) {
      this.categorieActive = categorie
    }
  }
}
</script>

<style scoped>
/* Badges catégorie sur les cartes */
.plat-category {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.cat-entrée  { background-color: #f59e0b; }
.cat-plat    { background-color: #ef4444; }
.cat-dessert { background-color: #ec4899; }
.cat-boisson { background-color: #3b82f6; }

/* Boutons catégorie actifs par couleur */
.category-btn.entree.active  { background-color: #f59e0b; color: white; border-color: #f59e0b; }
.category-btn.plat.active    { background-color: #ef4444; color: white; border-color: #ef4444; }
.category-btn.dessert.active { background-color: #ec4899; color: white; border-color: #ec4899; }
.category-btn.boisson.active { background-color: #3b82f6; color: white; border-color: #3b82f6; }
</style>