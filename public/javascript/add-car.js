async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="vin-number"]').value;
    const post_url = document.querySelector('input[name="vehicle-url"]').value;
  
    const response = await fetch(`/api/vehicles`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-vehicle').addEventListener('submit', newFormHandler);