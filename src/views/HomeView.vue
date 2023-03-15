<template>

  <div class="main">

    <h1 class="main-title">Recipe Book</h1>

    <!-- LIST MODE -->
    <div
        v-if="editMode === false && shoppingListMode === false"

        class="list_mode"
    >

      <form
          class="new-recipe-form"
          @submit.prevent="addRecipe(newRecipeTitle)"
      >

        <input
            v-model="newRecipeTitle"

            type="text"
            class="recipe-title-input"
            placeholder="Add a new recipe..."
        />

        <button
            type="submit"
            class="recipe-create-button"
        >
          Add
        </button>

      </form>

      <div class="recipe-book">
        <div
            class="recipe"
            v-for="recipe in recipesList" :key="recipe.id"
        >
          <div class="recipe-title">{{ recipe.name }}</div>
          <div class="recipe-actions">

            <button
                @click="editRecipe(recipe)"

                class="recipe-edit-button"
            >
              Edit
            </button>

            <button
                @click="deleteRecipe(recipe)"

                class="recipe-delete-button"
            >
              Delete
            </button>

          </div>
        </div>
      </div>

      <button
          @click="shoppingListMode = !shoppingListMode"

          class="shopping-list-button"
      >
        Shopping List
      </button>

    </div>

    <!-- EDIT MODE -->
    <div
        v-if="editMode === true"

        class="recipe-edit-form"
    >

      <input
          v-model="recipeToEdit.name"

          type="text"
          class="recipe-edit-title-input"
      />
      <textarea
          v-model="recipeToEdit.description"

          class="recipe-edit-description-input"
          rows={10}
          placeholder="Description"
      ></textarea>

      <h2 class="recipe-ingredients-title">Ingredients</h2>

      <ul class="recipe-ingredients-list">
        <li
            v-for="ingredient in recipeToEdit.ingredients" :key="ingredient.id"

            class="recipe-ingredient"
        >
          <input
              v-model="ingredient.name"

              type="text"
              class="recipe-ingredient-input"
          />
          <button
              @click="deleteIngredient(ingredient)"

              class="recipe-ingredient-delete-button"
          >
            Delete
          </button>
        </li>

        <form
            @submit.prevent="addIngredient(recipeToEdit)"
            class="recipe-new-ingredient"
        >

          <input
              v-model="newIngredientName"

              type="text"
              class="recipe-new-ingredient-input"
              placeholder="Add a new ingredient..."/>

          <button
              type="submit"
              class="recipe-new-ingredient-button"
          >
            Add
          </button>

        </form>

      </ul>

      <div class="recipe-edit-actions">

        <button
            @click="cancelEdit"

            class="recipe-edit-cancel-button button--danger"
        >
          Cancel
        </button>

        <button
            @click="saveRecipe(recipeToEdit)"

            class="recipe-edit-save-button button--ok"
        >
          Save
        </button>

        <button
            @click="addIngredientsToShoppingList(recipeToEdit)"

            class="recipe-edit-cart-button"
        >
          Add to shopping list
        </button>

      </div>

    </div>

    <!-- SHOPPING LIST MODE -->
    <div
        v-if="shoppingListMode === true"

        class="shopping-list"
    >
      <h2 class="shopping-list-title">Shopping list</h2>

      <p
          v-if="shoppingList.length === 0"
          style="text-align: center; font-size: 1.2rem; font-weight: 600"
      >
        Your shopping list is empty
      </p>

      <ul class="recipe-ingredients-list">

        <li
            v-for="ingredient in shoppingList" :key="ingredient.id"

            class="recipe-ingredient">
          <label class="shopping-list-item">
            <input
                v-model="ingredient.checked"

                type="checkbox"
            />{{ ingredient.name }}</label>
        </li>

      </ul>
      <div class="shopping-list-actions">
        <button
            @click="checkAllItems"

            class="shopping-list-clear-button">Check all
        </button>
        <button
            @click="clearCheckedItems"

            class="shopping-list-clear-button button--ok">Clear checked items
        </button>
        <button
            @click="clearAllItems"

            class="shopping-list-clear-button button--danger">Clear all
        </button>

        <button
            @click="shoppingListMode = !shoppingListMode"

            class="shopping-list-close-button"
            style="margin-left: auto"
        >
          Close
        </button>
      </div>
    </div>

  </div>


</template>

<script>

export default {
  name: "HomeView",

  data() {
    return {
      newRecipeTitle: '',

      newIngredientName: '',

      recipeToEdit: null,

      editMode: false,
      shoppingListMode: false,

      recipesList: [
        {
          id: 0,
          name: 'Poulet au curry',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nunc nisl eget nisl.',
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

      this.recipesList.push({
        id: this.recipesList.length,
        name: newRecipeTitle,
        description: '',
        ingredients: []
      })
      this.newRecipeTitle = ''

    },

    deleteRecipe(recipe) {

      this.recipesList.splice(this.recipesList.indexOf(recipe), 1)

    },

    editRecipe(recipe) {
      this.recipeToEdit = Object.assign({}, recipe)
      this.editMode = true
    },

    addIngredient(recipe) {
      recipe.ingredients.push({
        id: recipe.ingredients.length,
        name: this.newIngredientName
      })
      this.newIngredientName = ''
    },

    deleteIngredient(ingredient) {
      this.recipeToEdit.ingredients.splice(this.recipeToEdit.ingredients.indexOf(ingredient), 1)
      this.recipeToEdit.ingredients.forEach((ingredient, index) => {
        ingredient.id = index
      })
    },

    cancelEdit() {
      this.editMode = false
    },

    saveRecipe(recipe) {
      this.recipesList[recipe.id] = recipe
      this.editMode = false
    },

    addIngredientsToShoppingList(recipe) {
      for (let ingredient of recipe.ingredients) {
        this.checkIfNotExist(ingredient)
      }

      this.shoppingListMode = true
      this.editMode = false
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

    checkAllItems() {
      for (let ingredient of this.shoppingList) {
        ingredient.checked = true
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
    }

  },

}

</script>

<style scoped>

</style>