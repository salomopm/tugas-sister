const mysql = require("mysql2/promise");

// Konfigurasi koneksi ke database MySQL
const dbConfig = {
    host: "localhost",
    port:3306,
    user: "root",
    password: "", // Ganti dengan password MySQL Anda
    database: "tugas_sister",
};

// Fungsi untuk operasi CRUD
const service = {
    CRUDService: {
        CRUDServicePort: {
            // Create operation
            async create({ data }) {
                try {
                    // Destructuring data
                    const { nim, nama, umur, tinggi, hobi } = data;

                    // Membuat koneksi ke database
                    const connection = await mysql.createConnection(dbConfig);

                    // Menjalankan query insert
                    const [result] = await connection.execute(
                        "INSERT INTO mahasiswa (nim, nama, umur, tinggi, hobi) VALUES (?,?,?,?,?)",
                        [nim, nama, umur, tinggi, hobi]
                    );

                    // Menutup koneksi
                    await connection.end();

                    // Mengembalikan pesan
                    return { message: `Data created with ID ${result.insertId}` };
                } catch (error) {
                    console.error("Create Error:", error);
                    throw new Error("Failed to create data");
                }
            },

            // Read operation
            async read({ id }) {
                try {
                    // Membuat koneksi ke database
                    const connection = await mysql.createConnection(dbConfig);

                    // Menjalankan query select
                    const [rows] = await connection.execute("SELECT * FROM mahasiswa WHERE id = ?", [id]);

                    // Menutup koneksi
                    await connection.end();

                    // Mengecek apakah data ditemukan
                    if (rows.length > 0) {
                        return { data: rows[0] }; // Mengembalikan data mahasiswa
                    } else {
                        throw new Error("Data not found");
                    }
                } catch (error) {
                    console.error("Read Error:", error);
                    throw new Error("Failed to read data");
                }
            },

            // Update operation
            async update({ id, data }) {
                try {
                    // Destructuring data
                    const { nim, nama, umur, tinggi, hobi } = data;

                    // Membuat koneksi ke database
                    const connection = await mysql.createConnection(dbConfig);

                    // Menjalankan query update
                    const [result] = await connection.execute(
                        "UPDATE mahasiswa SET nim = ?, nama = ?, umur = ?, tinggi = ?, hobi = ? WHERE id = ?",
                        [nim, nama, umur, tinggi, hobi, id]
                    );

                    // Menutup koneksi
                    await connection.end();

                    // Mengecek apakah data terupdate
                    if (result.affectedRows > 0) {
                        return { message: `Data with ID ${id} updated.` };
                    } else {
                        throw new Error("Data not found");
                    }
                } catch (error) {
                    console.error("Update Error:", error);
                    throw new Error("Failed to update data");
                }
            },

            // Delete operation
            async delete({ id }) {
                try {
                    // Membuat koneksi ke database
                    const connection = await mysql.createConnection(dbConfig);

                    // Menjalankan query delete
                    const [result] = await connection.execute("DELETE FROM mahasiswa WHERE id = ?", [id]);

                    // Menutup koneksi
                    await connection.end();

                    // Mengecek apakah data terhapus
                    if (result.affectedRows > 0) {
                        return { message: `Data with ID ${id} deleted.` };
                    } else {
                        throw new Error("Data not found");
                    }
                } catch (error) {
                    console.error("Delete Error:", error);
                    throw new Error("Failed to delete data");
                }
            },
        },
    },
};

module.exports = service;
