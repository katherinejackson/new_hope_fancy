
const getAllStaff = async () => {
    try {
      const response = await fetch('http://localhost:8080/staff_list', { mode: 'cors' });
      const data = await response.json();
  
      return data
    }
    catch (e) {
      console.log(e)
    }
  }
  
  const addStaff = async (data) => {
    console.log('here1')
    const response = await fetch('http://localhost:8080/new_staff', {
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

  const updateStaff = async (data) => {
    const response = await fetch('http://localhost:8080/update_staff', {
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
  
  export {addStaff, getAllStaff, updateStaff}
  
  