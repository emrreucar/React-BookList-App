import React, { useState, useEffect } from "react";
import View from "./components/View";
import "./App.css";

//! oluşturduğumuz localstorage'i get etmemiz gerek..
const getDatafromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  //! tüm kitaplar için state
  const [books, setBooks] = useState(getDatafromLS());

  //! inputlar için state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleAddBookSubmit = (e) => {
    e.preventDefault();

    //! objelerimi oluşturuyorum
    let book = {
      title,
      author,
      isbn,
    };
    setBooks([...books, book]);

    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  const deleteBook = (isbn) => {
    // console.log(isbn);
    const filteredBooks = books.filter((element, index) => {
      return element.isbn !== isbn;
    });
    setBooks(filteredBooks);
  }

  //! girilen bilgileri localstorage'de kaydedelim
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <h1> Kitap Listesi Uygulaması </h1>
      <p>Kitaplarını ekle ve yan ekranda gör 😍</p>
      <div className="main">
        <div className="form-container">
          <form
            className="form-group"
            autoComplete="off"
            onSubmit={handleAddBookSubmit}
          >
            <label>Kitap Adı</label>
            <input
              type="text"
              className="form-control"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <br />
            <label>Yazar Adı</label>
            <input
              type="text"
              className="form-control"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />{" "}
            <br />
            <label>Barkod Numarası</label>
            <input
              type="text"
              className="form-control"
              required
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />{" "}
            <br />
            <button type="submit" className="btn btn-success btn-md">
              EKLE
            </button>
          </form>
        </div>

        <div className="view-container">
          {books.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Barkod Numarası</th>
                      <th>Kitap Adı</th>
                      <th>Yazar Adı</th>
                      <th>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook}/>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-danger btn-md" onClick={() => setBooks([])}>Hepsini Sil</button>
            </>
          )}
          {books.length < 1 && <div>Henüz bir kitap eklenmedi...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
