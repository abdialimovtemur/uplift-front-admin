// types/courses.ts
export interface Course {
  _id: string
  title: string
  description: string
  rating: number
  duration: string
  totalLessons: number
  level: string
  picture: string
  ratingCount: number
  instructor?: Instructor
  units?: CourseUnit[]
  createdAt?: string
  updatedAt?: string
}

export interface Instructor {
  _id: string
  name: string
  email: string
  avatar?: string
  bio?: string
}

export interface CourseUnit {
  _id: string
  title: string
  description?: string
  order: number
  courseId: string
  sections?: CourseSection[]
  createdAt?: string
  updatedAt?: string
}

export interface CourseSection {
  _id: string
  title: string
  description?: string
  duration?: string
  order: number
  unitId: string
  content?: string
  videoUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCourseData {
  title: string
  description: string
  duration: string
  level: string
  picture?: File
}

export interface UpdateCourseData {
  title?: string
  description?: string
  duration?: string
  level?: string
  picture?: File
}