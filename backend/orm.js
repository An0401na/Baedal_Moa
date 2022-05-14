const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("test", "damosa", "Wlqrkrhtlvek1!", {
    host: "203.249.22.52",
    port: "8888",
    dialect: "mysql",
    directory: './models',
    additional: {
        timestamps: false
    }
})

auto.run((err) => {
    if (err) console.log(err);
})