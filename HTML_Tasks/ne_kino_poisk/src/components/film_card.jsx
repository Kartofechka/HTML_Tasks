

export default function film_card({ film }){
    return(
        <>
            <div className="film-card">
            <img src={film.preview} alt={film.name} />
            <h3>{film.name}</h3>
            <p>{film.year} • {film.category}</p>
            <p>Рейтинг: {film.rating}</p>
            </div>
        </>
    )
}