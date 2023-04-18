import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';
function App() {
  const [movieList, setMovieList] = useState([])
  const [movieName, setmovieName] = useState("")
  const [movieYear, setmovieYear] = useState(0)
  const [oscar, setOscar] = useState(false)
  const [updatedName, setUpdatedName] = useState("")
  const [file, setFile] = useState(null)
  const moviesCollectionRef = collection(db, "movies") //getting collection
  const getMovies = async () => {
    try {

      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => (
        { ...doc.data(), id: doc.id }
      ))
      setMovieList(filteredData)
      // console.log(filteredData)
    } catch (error) {
      // console.log(error.message)
    }
  }
  useEffect(() => {

    getMovies()

  }, [])
  const deleteMovie = async (id) => {

    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovies()
    } catch (error) {
      console.log(error.message)
    }
  }
  const uploadFile = async () => {
    if (!file) {
      return
    }
    const filesFolderRef = ref(storage, `projectFiles/${file.name}`)
    try {
      await uploadBytes(filesFolderRef, file)
    } catch (error) {
      console.log(error.message)
    }
  }
  const updateMovie = async (id) => {

    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, { name: updatedName })
      getMovies()
    } catch (error) {
      console.log(error.message)
    }
  }
  const submitMovie = async () => {
    try {

      await addDoc(moviesCollectionRef, {
        name: movieName,
        year: movieYear,
        oscar: oscar,
        userId: auth?.currentUser?.uid
      })
      getMovies()
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder='Movie Name...' onChange={(e) => setmovieName(e.target.value)} />
        <input placeholder='Released Year' type='number' onChange={(e) => setmovieYear(Number(e.target.value))} />
        <input type='checkbox' checked={oscar} onChange={(e) => { setOscar(e.target.checked) }} />
        <label>Received an Oscar</label>
        <button onClick={submitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.oscar ? "green" : "red" }}>{movie.name}</h1>
            <p>Year: {movie.year}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new name' onChange={(e) => setUpdatedName(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>Update Name</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
