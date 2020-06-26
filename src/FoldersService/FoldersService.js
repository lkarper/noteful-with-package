const FoldersService = {
    fetchAllFolders() {
        const p = new Promise((resolve, reject) => {
            fetch('http://localhost:8000/api/folders')
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    }
                    throw new Error(response.message);
                })
                .then(folders => {
                    resolve(folders);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        })
        return p;
    },
    fetchFolderById(id) {
        const p = new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/api/folders/${id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.message);
                })
                .then(folder => {
                    resolve(folder);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        })
        return p;
    }
}

export default FoldersService;