__precompile__(true)
"""
Main module for `RandomizedAlgorithms.jl` -- a Julia package
for randomized methods in numerical linear algebra.
"""
module RandomizedAlgorithms

include("rlinalg.jl")
include("rsvd.jl")
include("rsvd_fnkz.jl")

end
