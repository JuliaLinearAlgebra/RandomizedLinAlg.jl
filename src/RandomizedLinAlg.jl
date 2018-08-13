"""
Main module for `RandomizedLinAlg.jl` -- a Julia package
for randomized methods in numerical linear algebra.
"""
module RandomizedLinAlg

using Random, LinearAlgebra

include("factorization.jl")
include("rlinalg.jl")
include("rsvd.jl")
include("rsvd_fnkz.jl")

end
