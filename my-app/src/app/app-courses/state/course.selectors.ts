import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectItems = (state: AppState) => state.courses;

export const getItemById = (id) =>
  createSelector(selectItems, (allItems) => {
    if (allItems) {
      return allItems.find((item) => {
        return item.id === id;
      });
    } else {
      return {};
    }
});
