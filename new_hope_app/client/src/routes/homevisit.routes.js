
const getAllHomevisit = async () => {
    try {
      const response = await fetch('http://localhost:8080/homevisit_list', { mode: 'cors' });
      const data = await response.json();
  
      return data
    }
    catch (e) {
      console.log(e)
    }
  }
  
  const addHomevisit = async (data) => {
    const response = await fetch('http://localhost:8080/new_homevisit', {
      method: 'POST', 
      mode: 'cors', 
      credentials: 'same-origin', 
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), 
    });
  
    return response; 
  }

  const updateHomevisit = async (data) => {
    const response = await fetch('http://localhost:8080/update_homevisit', {
      method: 'POST', 
      mode: 'cors', 
      credentials: 'same-origin', 
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), 
    });
  
    return response; 
  }
  
  export {addHomevisit, getAllHomevisit, updateHomevisit}