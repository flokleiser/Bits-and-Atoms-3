fetch('datasets/temp.json')
    .then(response => response.json())
    .then(data => {
        document.body.innerHTML = `<p1>${JSON.stringify(data, null, 2)}</p1>`;
    })
    // .then(data => { console.log(data) })
    .catch(error => {
        console.error('Error:', error);
    });
