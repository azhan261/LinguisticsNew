//getting API for showing all the data
import axios from 'axios';

export const getPayments = (gender) => (
	console.log(gender),
	axios.post(`http://localhost:7000/paymentCreation`)
		.then(res => res.data, )
)

export const getPaymentsAll = (gender) => (
	console.log(gender),
	axios.post(`http://localhost:7000/paymentCreation`)
		.then(res => res.data, )
)
export const getPaymentsSpecific = id => (
	console.log(id),
	axios.post(`http://localhost:7000/paymentCreation/specific/${id}`)
		.then(res => res.data, )
)

//getting API for inserting the data
export const createPayments = (todo) => fetch("http://localhost:7000/paymentCreation/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updatePayment = (todo, id) => fetch(`http://localhost:7000/paymentCreation/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getPayment = (id) => fetch(`http://localhost:7000/paymentCreation/${id}`).then(res => res.json())

export const getRegisterationpaymentCreation = id => (
	console.log(id),
	axios.post(`http://localhost:7000/paymentCreation/specific/${id}`)
		.then(res => res.data, )
		
)

export const getRegisterationpaymentCreationById = id => (
	console.log(id),
	axios.post(`http://localhost:7000/paymentCreation/specific/id/${id}`)
		.then(res => res.data, )
)