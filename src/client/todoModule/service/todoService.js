export default function($http) {
        this.sendData = (data) => {
            return $http.post('http://localhost:3000/add', data);
        };
        this.getAllNotes = () => {
            return $http.get('http://localhost:3000/allNotes');
        };
        this.editNote = (data) => {
            return $http.post('http://localhost:3000/edit', data);
        };
        this.deleteNote = (data) => {
            return $http.post('http://localhost:3000/delete', data);
        }
    };

