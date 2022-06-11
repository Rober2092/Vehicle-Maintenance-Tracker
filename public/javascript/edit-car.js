async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="vin-number"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-vehicle').addEventListener('submit', editFormHandler);