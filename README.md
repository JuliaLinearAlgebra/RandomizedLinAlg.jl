# RandomizedLinAlg.jl

[![Build Status](https://travis-ci.org/haampie/RandomizedLinAlg.jl.svg?branch=master)](https://travis-ci.org/haampie/RandomizedLinAlg.jl)
[![Coverage Status](https://coveralls.io/repos/github/haampie/RandomizedLinAlg.jl/badge.svg?branch=master)](https://coveralls.io/github/haampie/RandomizedLinAlg.jl?branch=master)

RandomizedLinAlg.jl is a [Julia](https://julialang.org/) package that provides randomized algorithms for numerical linear algebra as advocated in [1].

This package was split off from [IterativeSolvers.jl](https://github.com/JuliaMath/IterativeSolvers.jl) as randomized algorithms were not considered well-established and potentially unstable.

See the [**manual**](https://haampie.github.io/RandomizedLinAlg.jl/latest/) for the available methods.

[1]: Halko, Nathan, Per-Gunnar Martinsson, and Joel A. Tropp. "Finding structure with randomness: Probabilistic algorithms for constructing approximate matrix decompositions." SIAM review 53.2 (2011): 217-288.