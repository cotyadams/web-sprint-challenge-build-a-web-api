const PORT = process.env.PORT || 9000;
const express = require("express");
const server = require("./api/server.js");
// import actions handler

server.use(express.json());

server.listen(PORT, () => { console.log(`\n=== Server listening on port ${PORT} ===\n`) })