const app = require("./src/app")
const PORT =  process.env.PORT || 3030

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})