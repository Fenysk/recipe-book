<template>
  <div
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
          style="
            background-color: #ddd
        ">
        <a
            style="
              text-decoration: none;
              color: #fff;
            "
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
        >Rick Roll</a>
      </button>

      <button
          @click="closeShoppingList"

          class="shopping-list-close-button"
          style="margin-left: auto"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingList",

  props: {
    shoppingList: {
      type: Array,
      required: true
    },
    shoppingListMode: {
      type: Boolean,
      required: true
    },
  },

  methods: {
    checkAllItems() {
      for (let ingredient of this.shoppingList) {
        ingredient.checked = true
      }
    },
    clearCheckedItems() {
      this.$emit("clearCheckedItems");
    },
    clearAllItems() {
      this.$emit("clearAllItems");
    },
    closeShoppingList() {
      this.$emit("closeShoppingList");
    }
  }
}
</script>

<style scoped>

</style>