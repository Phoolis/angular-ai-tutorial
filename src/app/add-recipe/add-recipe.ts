import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.scss',
})
export class AddRecipe {
  private readonly fb = inject(FormBuilder);
  private readonly recipeService = inject(Recipe);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.valid) {
      const newRecipe = this.form.value;
      this.recipeService.addRecipe({
        name: newRecipe.name!,
        description: newRecipe.description!,
        imgUrl: "placeholder",
        isFavorite: false,
        ingredients: [],
      })
      this.form.reset();
      this.router.navigate(['/recipes']);
    }
  }
}
