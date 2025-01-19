import Movies from "../Pages/Movies/movies";
import Home from "../Pages/Home/home";
import Directors from "../Pages/Directors/directors";
import Genres from "../Pages/Genres/genres";
import MovieDetails from "../Pages/Movies/MovieDetails/movieDetails";
import DirectorDetails from "../Pages/Directors/DirectorsDetails/directorDetails";
import GenreMovies from "../Pages/Genres/GenreMovies/genreMovies";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import AuthForm from "../Components/UI/AuthForm/AuthForm";
import MovieEditor from "../Pages/AdminPanel/MoviePanel/MovieEditor/MovieEditor";
import GenreEditor from "../Pages/AdminPanel/GenreEditor/GenreEditor/GenreEditor";
import DirectorEditor from "../Pages/AdminPanel/DirectorEditor/DirectorEditor/DirectorEditor";
import ProtectedRoute from "../Components/ProtectedRoute";
import Privacy from "../Pages/Privacy/privacy";

export const publicRoutes = [
    {path: '/', component: <Home/>, exact: true},
    {path: '/privacy', component: <Privacy/>, exact: true},

    {/*Фильмы*/},
    {path: '/movies', component: <Movies/>, exact: true},
    {path: '/movies/:movie', component: <MovieDetails/>, exact: true},

    {/*Режиссёры*/},
    {path: '/directors', component: <Directors/>, exact: true},
    {path: '/directors/:fullNameEn', component: <DirectorDetails/>, exact: true},

    {/*Жанры*/},
    {path: '/genres', component: <Genres/>, exact: true},
    {path: '/genres/:genre', component: <GenreMovies/>, exact: true},

    {/*Админская панель*/},
    {path: '/admin', component: <ProtectedRoute><AdminPanel/></ProtectedRoute>, exact: true},
    {path: '/admin/movies', component: <ProtectedRoute><MovieEditor/></ProtectedRoute>, exact: true},
    {path: '/admin/directors', component: <ProtectedRoute><DirectorEditor/></ProtectedRoute>, exact: true},
    {path: '/admin/genres', component: <ProtectedRoute><GenreEditor/></ProtectedRoute>, exact: true},

    {/*Авторизация*/},
    {path: '/auth', component: <AuthForm/>, exact: true},
]

export default publicRoutes;
