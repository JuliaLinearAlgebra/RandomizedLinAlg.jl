using Documenter, RandomizedLinAlg

makedocs(
    modules = [RandomizedLinAlg],
    format = Documenter.HTML(),
    doctest = false,
    clean = true,
    sitename = "RandomizedLinAlg.jl",
    pages = [
        "Home" => "index.md",
    ]
)

deploydocs(
    repo = "github.com/haampie/RandomizedLinAlg.jl.git",
    target = "build"
)
