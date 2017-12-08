using Documenter, RandomizedAlgorithms

makedocs(
    modules = [RandomizedAlgorithms],
    format = :html,
    doctest = false,
    clean = true,
    sitename = "RandomizedAlgorithms.jl",
    pages = [
        "Home" => "index.md",
    ]
)

deploydocs(
    repo = "github.com/haampie/RandomizedAlgorithms.jl.git",
    target = "build",
    osname = "linux",
    julia  = "0.6",
    deps = nothing,
    make = nothing,
)
