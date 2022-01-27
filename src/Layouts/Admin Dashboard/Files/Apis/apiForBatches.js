//getting API for showing all the data
import axios from 'axios';

export const getBatches = (gender) => (
	console.log(gender),
	axios.post(`http://localhost:7000/batchCreation`)
		.then(res => res.data, )
)

export const getBatchsAll = (gender) => (
	console.log(gender),
	axios.post(`http://localhost:7000/batchCreation`)
		.then(res => res.data, )
)
//getting API for inserting the data
export const createBatchs = (todo) => fetch("http://localhost:7000/batchCreation/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updateBatch = (todo, id) => fetch(`http://localhost:7000/batchCreation/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getBatch = (id) => fetch(`http://localhost:7000/batchCreation/${id}`).then(res => res.json())

export const getRegisterationbatchCreation = id => (
	console.log(id),
	axios.post(`http://localhost:7000/batchCreation/specific/${id}`)
		.then(res => res.data, )
		
)

export const getRegisterationbatchCreationById = id => (
	console.log(id),
	axios.post(`http://localhost:7000/batchCreation/specific/id/${id}`)
		.then(res => res.data, )
)