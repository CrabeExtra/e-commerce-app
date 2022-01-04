const setEditModal = (id) => {
    // We will implement this later
}

const deleteItem = (id) => {
    // We will implement this later
}

const loadItems = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/items", false);
    xhttp.send();

    const items = JSON.parse(xhttp.responseText);

    for (let item of items) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${item.id}</h6>
                        
                        <div>Price: ${item.price}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${item.id})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('items').innerHTML = document.getElementById('items').innerHTML + x;
    }
}

loadItems();