using RandomizedLinAlg
using Test, Random, LinearAlgebra

@testset "IDfact" begin
    Random.seed!(1)
    M = randn(4,5)
    k = 3

    F = idfact(M, k, 3)
    @test norm(F.B * F.P - M) ≤ 2svdvals(M)[k + 1]
end
