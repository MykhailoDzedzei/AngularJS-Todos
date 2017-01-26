"use strict";

import {conf} from "../config/configs";

let socket = conf.host + ":" + conf.port + "/";

export default function ($http) {
    this.register = (data) => {
        return $http.post(socket + 'register', data);
    };
    this.sendData = (data) => {
        return $http.post(socket + 'notes', data);
    };
    this.getAllNotes = () => {
        return $http.get(socket + 'notes');
    };
    this.editNote = (data) => {
        return $http.put(socket + 'notes/' + data._id, data);
    };
    this.deleteNote = (data) => {
        return $http.delete(socket + 'notes/' + data._id, data);
    }
};

