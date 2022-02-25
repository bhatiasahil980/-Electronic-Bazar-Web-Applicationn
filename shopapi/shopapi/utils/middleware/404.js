// app.get("*", (request, response) => {
//   response.send("OOPS U Type Something Wrong in URL");
// });
module.exports = function (request, response) {
  response.send("OOPS U Type Something Wrong in URL");
};
