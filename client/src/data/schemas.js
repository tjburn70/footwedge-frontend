import { schema } from 'normalizr';

const TEE_BOX_KEY = 'tee_boxes';
const GOLF_COURSE_KEY = 'golf_courses'

const teeBoxSchema = new schema.Entity(TEE_BOX_KEY);

const golfCourseSchema = new schema.Entity(GOLF_COURSE_KEY, {tee_boxes: [teeBoxSchema]});

export { teeBoxSchema, golfCourseSchema };
