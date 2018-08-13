using RandomizedLinAlg
using Test, Random, LinearAlgebra

@testset "ID" begin
    Random.seed!(1)
    M = randn(4,5)
    k = 3

    F = id(M, k, 3)
    @test norm(F.B * F.P - M) ≤ 2svdvals(M)[k + 1]
end
