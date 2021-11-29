const getAllDogs = async () => {
    try {
      const response = await fetch('http://localhost:8080/dog_list', { 
          method: 'GET',
          mode: 'cors',
        });
      const data = await response.json();
  
      return data
    }
    catch (e) {
      console.log(e)
    }
  }
  
  const addDog = async (data) => {
    const response = await fetch('http://localhost:8080/new_dog', {
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
  
  const updateDog = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/update_dog', {
        method: 'PUT', 
        mode: 'cors', 
        credentials: 'same-origin', 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data), 
      });
    
      return response; 
    } catch (e) {
      console.log(e)
    }

  }
  
  export {addDog, getAllDogs, updateDog}