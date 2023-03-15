<template>

  <div class="main">

    <h1 class="main-title">Recipe Book</h1>

    <!-- LIST MODE -->
    <RecipesList
        v-if="editMode === false && shoppingListMode === false"

        :recipesList="recipesList"
        @editRecipe="editRecipe"
        @deleteRecipe="deleteRecipe"
        @addRecipe="addRecipe"
        @shoppingMode="shoppingMode"
    />

    <!-- EDIT MODE -->
    <RecipeEdit
        v-if="editMode === true"

        :recipeToEdit="recipeToEdit"
        :recipesList="recipesList"
        @saveRecipe="saveRecipe"
        @cancelEdit="cancelEdit"
        @addIngredientsToShoppingList="addIngredientsToShoppingList"
    />

    <!-- SHOPPING LIST MODE -->
    <ShoppingList
        v-if="shoppingListMode === true"

        :shoppingList="shoppingList"
        :shoppingListMode="shoppingListMode"
        @clearCheckedItems="clearCheckedItems"
        @clearAllItems="clearAllItems"
        @closeShoppingList="closeShoppingList"
    />

  </div>


</template>

<script>

import RecipesList from "../components/RecipesList.vue";
import RecipeEdit from "../components/RecipeEdit.vue";
import ShoppingList from "../components/ShoppingList.vue";

export default {
  name: "HomeView",
  components: {
    ShoppingList,
    RecipeEdit,
    RecipesList
  },

  data() {
    return {

      recipeToEdit: null,

      editMode: false,
      shoppingListMode: false,

      recipesList: [
        {
          id: 0,
          name: 'Poulet au curry',
          description: 'Pour 4 personnes, 30 minutes de préparation, 1 heure de cuisson. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
          ingredients: [
            {
              id: 0,
              name: 'Poulet'
            },
            {
              id: 1,
              name: 'Curry'
            },
            {
              id: 2,
              name: 'Crème'
            }
          ]
        },

        {
          id: 1,
          name: 'Pates au saumon',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
          ingredients: [
            {
              id: 0,
              name: 'Pates'
            },
            {
              id: 1,
              name: 'Saumon'
            },
            {
              id: 2,
              name: 'Crème'
            }
          ]
        },

        {
          id: 2,
          name: 'Boeuf bourguignon',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
          ingredients: [
            {
              id: 0,
              name: 'Boeuf'
            },
            {
              id: 1,
              name: 'Vin rouge'
            },
            {
              id: 2,
              name: 'Crème'
            }
          ]
        }
      ],
      shoppingList: []

    }
  },

  methods: {
    addRecipe(newRecipeTitle) {

      if (newRecipeTitle === '') {
        return
      }

      this.recipesList.push({
        id: this.recipesList.length,
        name: newRecipeTitle,
        description: '',
        ingredients: []
      })

    },

    deleteRecipe(recipe) {

      this.recipesList.splice(this.recipesList.indexOf(recipe), 1)
      this.recipesList.forEach((recipe, index) => {
        recipe.id = index
      })

    },

    editRecipe(recipe) {
      this.recipeToEdit = Object.assign({}, recipe)
      this.editMode = true
    },

    shoppingMode() {
      this.shoppingListMode = true
    },

    cancelEdit() {
      this.editMode = false
    },

    saveRecipe(recipe) {
      this.recipesList[recipe.id] = recipe
      this.recipeToEdit = null
      this.editMode = false
    },

    addIngredientsToShoppingList(recipe) {
      for (let ingredient of recipe.ingredients) {
        this.checkIfNotExist(ingredient)
      }
    },

    checkIfNotExist(ingredient) {
      if (this.shoppingList.length > 0) {
        let ingredientAlreadyInShoppingList = false
        for (let shoppingListIngredient of this.shoppingList) {
          if (ingredient.name === shoppingListIngredient.name) {
            ingredientAlreadyInShoppingList = true
          }
        }
        if (!ingredientAlreadyInShoppingList) {
          this.shoppingList.push(
              {
                id: this.shoppingList.length,
                name: ingredient.name,
                checked: false
              }
          )
        }
      } else {
        this.shoppingList.push(
            {
              id: this.shoppingList.length,
              name: ingredient.name,
              checked: false
            }
        )
      }
    },

    clearCheckedItems() {
      this.shoppingList = this.shoppingList.filter(ingredient => !ingredient.checked)
      this.shoppingList.forEach((ingredient, index) => {
        ingredient.id = index
      })
    },

    clearAllItems() {
      this.shoppingList = []
    },

    closeShoppingList() {
      this.shoppingListMode = false
    }

  },

}

</script>

<style scoped>

</style>