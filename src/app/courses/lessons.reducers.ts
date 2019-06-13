import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Lesson } from './model/lesson';
import { CourseActions, CourseActionTypes } from './course.actions';

export interface LessonsState extends EntityState<Lesson> {

}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  } else {
    return l1.seqNo - l2.seqNo;
  }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSeqNo
});

const initialLessonsState = adapter.getInitialState();

export function lessonsReducer(state = initialLessonsState, { type, payload }: CourseActions) {
  switch (type) {
    case CourseActionTypes.LessonsPageLoaded:
      return adapter.addMany(payload, state);
    default:
      return state;
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
