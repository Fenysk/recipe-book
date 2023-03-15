<template>

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
        @click="shoppingMode"

        class="shopping-list-button"
    >
      Shopping List
    </button>

</template>

<script>
export default {
  name: "RecipesList",

  props: {
    recipesList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      newRecipeTitle: "",
      editMode: false,
      shoppingListMode: false
    }
  },

  methods: {
    addRecipe(title) {
      this.$emit("addRecipe", title);
      this.newRecipeTitle = "";
    },
    editRecipe(recipe) {
      this.$emit("editRecipe", recipe);
    },
    deleteRecipe(recipe) {
      this.$emit("deleteRecipe", recipe);
    },
    shoppingMode() {
      this.$emit("shoppingMode");
    }
  },

}
</script>

<style scoped>

</style>