<template>

  <div class="main">

    <h1 class="main-title">Recipe Book</h1>

    <!-- LIST MODE -->
    <div
        v-if="editMode === false"

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
            @click="saveRecipe(recipeToEdit)"

            class="recipe-edit-save-button"
        >
          Save
        </button>

        <button
            @click="addRecipeToShoppingList(recipeToEdit)"

            class="recipe-edit-cart-button"
        >
          Add to shopping list
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

      editMode: false,

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
      this.editMode = !this.editMode
      this.recipeToEdit = Object.assign({}, recipe)
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
    },

    saveRecipe(recipe) {
      this.recipesList[recipe.id] = recipe
      this.editMode = !this.editMode
    },

  },

}

</script>

<style scoped>

</style>