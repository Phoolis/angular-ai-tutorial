import { Component, computed, inject, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink,  FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);
  protected readonly recipes = this.recipeService.recipes;
  protected readonly recipe = signal<RecipeModel>(this.recipes[0]);
  protected readonly searchTerm = signal<string>('');

  protected readonly filteredRecipes = computed(() =>
    this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

}
