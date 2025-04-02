import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  note: "api/",
};

function getNotes(token, callback) {
  let request = new Request(HOST.backend_api + endpoint.note, {
    method: "GET",
    headers: {
      Authorization: "Token " + token,
    },
  });
  console.log(request.url);
  console.log("token = ", token);
  RestApiClient.performRequest(request, callback);
}

function getNoteById(token, id, callback) {
  let request = new Request(HOST.backend_api + endpoint.note + id, {
    method: "GET",
    headers: {
      Authorization: "Token " + token,
    },
  });

  console.log(request.url);
  console.log("token = ", token);
  RestApiClient.performRequest(request, callback);
}

function postNote(token, note, callback) {
  let request = new Request(HOST.backend_api + endpoint.note + "create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify(note),
  });

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

function deleteNote(token, note_id, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.note + "delete/" + note_id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    }
  );

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

function updateNote(token, note, note_id, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.note + "update/" + note_id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(note),
    }
  );

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

export { getNotes, getNoteById, postNote, deleteNote, updateNote };
