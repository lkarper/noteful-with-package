const NotesService = {
    fetchAllNotes() {
        const p = new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/notes')
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    }
                    throw new Error(response.message);
                })
                .then(notes => {
                   resolve(notes);
                })
                .catch(error => {
                    reject(error);
                });
        })
        return p;
    },
    fetchNoteById(id) {
        const p = new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/notes/${id}`)
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    }
                    throw new Error(response.message);
                })
                .then(note => {
                resolve(note);
                })
                .catch(error => {
                    reject(error);
                });
        })
        return p;
    }
}

export default NotesService;