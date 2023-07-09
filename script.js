function postData(event) {
    event.preventDefault();
  
    var name = document.getElementById("name").value;
    var data = {
      name: name
    };
  
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.ok) {
          console.log('Data sent successfully!');
          return response.json();
        }
        throw new Error('Error sending data.');
      })
      .then(function(data) {
        console.log('Response:', data);
        displayLogs(data);
      })
      .catch(function(error) {
        console.log('Error:', error.message);
      });
  }
  
  function displayLogs(logs) {
    var logList = document.getElementById('logList');
    logList.innerHTML = '';
  
    logs.forEach(function(log) {
      var listItem = document.createElement('li');
      listItem.textContent = log.timestamp + ': ' + log.name;
      logList.appendChild(listItem);
    });
  }
  