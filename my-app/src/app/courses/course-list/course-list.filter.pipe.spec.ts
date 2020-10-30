import { CourseListFilter } from './course-list.filter.pipe';

describe('CourseList.Filter.TsPipe', () => {
  it('create an instance', () => {
    const pipe = new CourseListFilter();
    expect(pipe).toBeTruthy();
  });
});
