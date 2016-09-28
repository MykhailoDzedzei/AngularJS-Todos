"use strict";

import {conf} from "../config/configs";

let socket = conf.host + ":" + conf.port + "/";

export default function ($http) {
    this.sendData = (data) => {
        return $http.post(socket + 'add', data);
    };
    this.getAllNotes = () => {
        return $http.get(socket + 'allNotes');
    };
    this.editNote = (data) => {
        return $http.post(socket + 'edit', data);
    };
    this.deleteNote = (data) => {
        return $http.post(socket + 'delete', data);
    }
};

