//getting API for showing all the data
import axios from 'axios';
import { name } from 'faker/locale/en_AU_ocker';



export const getTeachers = (subjectChoosenForApplication, gender) => (
	console.log(subjectChoosenForApplication, gender),
	axios.post(`http://localhost:7000/teachers/`)
		.then(res => res.data, )
)


export const getTeacherBatch = (batch) => (
	console.log(batch),
	axios.post(`http://localhost:7000/teachers/admin/batch/${batch}`)
		.then(res => res.data, )
)


export const getProjectManager = (name) => (
	console.log(name),
	axios.post(`http://localhost:7000/teachers/admin/batch/projectManager/${name}`)
		.then(res => res.data, )
)

//getting API for inserting the data
export const createTeachers = (todo) => fetch("http://localhost:3001/teachers/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updateTeacher = (todo, id) => fetch(`http://localhost:7000/teachers/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

export const updateCoursePlannings = (todo, id) => fetch(`http://localhost:7000/teachers/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getTeacher = (id) => fetch(`http://localhost:3001/teachers/${id}`).then(res => res.json())