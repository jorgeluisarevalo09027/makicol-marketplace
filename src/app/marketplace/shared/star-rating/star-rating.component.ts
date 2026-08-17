import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `
    <div class="flex items-center gap-0.5 flex-wrap">
      @for (i of [1,2,3,4,5]; track i) {
        <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"
             [style.color]="i <= fullStars() ? '#FFCD00' : '#d4b87a'">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      }
      <span class="text-sm font-bold ml-1" style="color:#295440;">{{ rating() }}</span>
      @if (showCount() && count() > 0) {
        <span class="text-xs ml-0.5" style="color:#57685c;">({{ count() }} reseñas)</span>
      }
    </div>
  `,
})
export class StarRatingComponent {
  rating    = input(0);
  count     = input(0);
  showCount = input(true);
  fullStars = computed(() => Math.round(this.rating()));
}
