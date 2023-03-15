<template>
  <div
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
</template>

<script>
export default {
  name: "RecipeEdit",

  props: {
    recipesList: {
      type: Array,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    },
    recipeToEdit: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      newIngredientName: ""
    }
  },

  methods: {
    cancelEdit() {
      this.$emit("cancelEdit");
    },
    saveRecipe(recipe) {
      this.$emit("saveRecipe", recipe);
    },
    addIngredientsToShoppingList(recipe) {
      this.$emit("addIngredientsToShoppingList", recipe);
    },

    addIngredient(recipe) {

      if (this.newIngredientName === '') {
        return
      }

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

  },


}
</script>

<style scoped>

</style>