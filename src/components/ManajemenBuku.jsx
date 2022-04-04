import React, {useEffect, useState} from 'react';
import TabelBuku from './TabelBuku';
import axios from "axios"


function ManajemenBuku () {
    //PART DATA
    const [formMode, setFormMode] = useState("");
    const [books, setBooks] = useState([]);
    const [inputForm, setInputForm] = useState();

    //PART EVENT HANDLING
    function showCreateForm() {
        setInputForm("");
        setFormMode("create");
    }
    function showEditForm(book) {
        setInputForm(book);
        setFormMode("edit");
    }

    function deleteOne (book) {
        axios.delete("http://localhost:4000/book/delete/" + book._id)
            .then(() => {
                retrieveData();
                alert("Data berhasil dihapus!")
            })
            .catch((error) => {console.log(error.response)})
    }

    useEffect(() => {
        retrieveData();
    }, []);

    function retrieveData() {
        axios.get("http://localhost:4000/book")
            .then((response) => { setBooks(response.data) })
            .catch(function (error) { console.log(error.response.data)})
    }

    function handleJudul (e) {
        setInputForm({...inputForm, judul: e.target.value})
    }

    function handlePeminjam (e) {
        setInputForm({...inputForm, peminjam: e.target.value})
    }

    function submitForm (event) {
        event.preventDefault();
        if (formMode === "create") {
            axios.post("http://localhost:4000/book/add", inputForm)
            .then(() => {
                alert("Data berhasil ditambahkan!");
                retrieveData();
            })
            .catch((error) => {console.log(error.response)})
        }

        if (formMode === "edit") {
            axios.put("http://localhost:4000/book/update/" + inputForm._id, inputForm)
            .then(() => {
                retrieveData();
                alert("Data berhasil diubah!");
            })
            .catch((error) => {console.log(error.response)})
        }
        
    }



    return (
        <div className="container mt-3">
            <h1 className="text-center">Manajemen Buku Perpustakaan</h1>

            <button className="btn btn-sm btn-primary my-2" onClick={showCreateForm}>
                Tambah buku
            </button>

            { /* input form */ }
            {formMode !== "" && (
                <div id="form" className="card py-2 my-3 bg-secondary">
                <div className="card-body">
                    <h4>Form Buku</h4>
                    <form className="row" onSubmit={submitForm}>
                        <div className="col-6">
                            <input
                            type="text"
                            name="judul"
                            className="form-control mx-2"
                            placeholder="judul..."
                            value={inputForm.judul || ""}
                            onChange={handleJudul}
                            />
                        </div>
                        <div className="col-4">
                            <input
                            type="text"
                            name="peminjam"
                            className="form-control mx-2"
                            placeholder="peminjam..."
                            value={inputForm.peminjam || ""}
                            onChange={handlePeminjam}
                            />
                        </div>
                        <div className="col-2">
                            <input
                            type="submit" className="btn btn-success" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
            )}
            {/*tabel data buku*/}
            <TabelBuku showEdit={showEditForm} books={books} requestToDelete={deleteOne} />
        </div>
    );
}

export default ManajemenBuku;