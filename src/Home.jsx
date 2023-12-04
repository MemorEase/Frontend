export default function Home() {
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="logo.jpg"/></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="about">About</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Meet the team!
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a class="dropdown-item" href="meet-us/eli">Eli</a></li>
                    <li><a class="dropdown-item" href="meet-us/bradley">Bradley</a></li>
                    <li><a class="dropdown-item" href="meet-us/rayne">Rayne</a></li>
                    <li><a class="dropdown-item" href="meet-us/anthony">Anthony</a></li>
                </ul>
                </li>
            </ul>
            </div>
            </div>
        </nav>
        <br/><br/><br/><br/><br/>
        <h1 class="text-center">Welcome to MemorEase!</h1>
        <h2 class="text-center">A study tool made by students, for students.</h2>
        <a class="btn btn-primary btn-lg" href="login" role="button">Log In</a>
        <a class="btn btn-secondary btn-lg" href="signup" role="button">Sign Up</a>
        </>
    )
}