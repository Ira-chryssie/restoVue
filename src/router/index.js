import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PanierView from '../views/PanierView.vue'
import CommandeView from '../views/CommandeView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import HistoriqueView from '../views/HistoriqueView.vue'
import LoginView from '../views/Login.vue'
import InscriptionView from '../views/Inscription.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: InscriptionView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView
    },
    {
      path: '/commande',
      name: 'commande',
      component: CommandeView
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoriqueView
    }
  ],
})

export default router