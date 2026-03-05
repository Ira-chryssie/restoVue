import { reactive } from 'vue'

export const store = reactive({
  panier: [],
  client: {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    instructions: ''
  },

  ajouterPlat(plat) {
    const existant = this.panier.find(p => p.nom === plat.nom)
    if (existant) {
      existant.quantite++
    } else {
      this.panier.push({ ...plat, quantite: 1 })
    }
  },

  supprimerPlat(nom) {
    this.panier = this.panier.filter(p => p.nom !== nom)
  },

  diminuerQuantite(nom) {
    const plat = this.panier.find(p => p.nom === nom)
    if (plat.quantite > 1) {
      plat.quantite--
    } else {
      this.supprimerPlat(nom)
    }
  },

  viderPanier() {
    this.panier = []
  },

  get total() {
    return this.panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)
  },

  get nombreArticles() {
    return this.panier.reduce((acc, p) => acc + p.quantite, 0)
  }
})