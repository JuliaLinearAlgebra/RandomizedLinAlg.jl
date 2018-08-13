#########################################################
## Randomized singular value and eigen- decompositions ##
########################################################

# This file provides a rudimentary implementation of the randomized singular
# value decomposition and spectral (eigen-) decomposition as described in
# [^Halko2011].

import LinearAlgebra: Eigen, SVD

export rsvd, reigen

"""
    rsvd(A, n, p=0)

Compute partial singular value decomposition of `A` using a randomized
algorithm.

# Arguments

`A`: input matrix.

`n::Int`: number of singular value/vector pairs to find.

`p::Int=0`: number of extra vectors to include in computation.

# Output

`::SVD`: singular value decomposition.

!!! warning "Accuracy"
    This variant of the randomized singular value decomposition is the most
    commonly found implementation but is not recommended for accurate
    computations, as it often has trouble finding the `n` largest singular pairs,
    but rather finds `n` large singular pairs which may not necessarily be the
    largest.

# Implementation note

This function calls `rrange`, which uses naive randomized rangefinding to
compute a basis for a subspace of dimension `n` (Algorithm 4.1 of
[^Halko2011]), followed by `svd_restricted()`, which computes the
exact SVD factorization on the restriction of `A` to this randomly selected
subspace (Algorithm 5.1 of [^Halko2011]).

Alternatively, you can mix and match your own randomized algorithm using
any of the randomized range finding algorithms to find a suitable subspace
and feeding the result to one of the routines that computes the `SVD`
restricted to that subspace.
"""
function rsvd(A, n::Int, p::Int=0)
    Q = rrange(A, n+p)
    svd_restricted(A, Q, n)
end

"""
    rsvdvals(A, n, p=0)

Compute partial singular value decomposition of `A` using a randomized
algorithm.

# Arguments

- `A`: input matrix;
- `n::Int`: number of singular value/vector pairs to find;
- `p::Int=0`: number of extra vectors to include in computation.

# Output

- `::Vector`: estimated singular values of `A`.

!!! warning "Accuracy"
    This variant of the randomized singular value decomposition is the most
    commonly found implementation but is not recommended for accurate
    computations, as it often has trouble finding the `n` largest singular pairs,
    but rather finds `n` large singular pairs which may not necessarily be the
    largest.

# Implementation note

This function calls `rrange`, which uses naive randomized rangefinding to
compute a basis for a subspace of dimension `n` (Algorithm 4.1 of
[^Halko2011]), followed by `svd_restricted()`, which computes the
exact SVD factorization on the restriction of `A` to this randomly selected
subspace (Algorithm 5.1 of [^Halko2011]).

Alternatively, you can mix and match your own randomized algorithm using
any of the randomized range finding algorithms to find a suitable subspace
and feeding the result to one of the routines that computes the `SVD`
restricted to that subspace.
"""
function rsvdvals(A, n::Int, p::Int=0)
    Q = rrange(A, n+p)
    svdvals_restricted(A, Q, n)
end

"""
    rrange(A, r=0)

Compute an orthonormal basis for a subspace of `A` of dimension `r` using
naive randomized rangefinding.

# Arguments

- `A`: Input matrix. Must support `size(A)` and premultiply.
- `r::Int = 0`: The number of basis vectors to compute.

# Output

- `::Matrix`: matrix of dimension `size(A,1) x r` containing the basis
vectors of the computed subspace of `A`.

!!! warning "Warning"
    The Reference explicitly discourages using this algorithm.

# Implementation note

Whereas [^Halko2011] recommends classical Gram-Schmidt with double
reorthogonalization, we instead compute the basis with `qr()`, which
for dense `A` computes the QR factorization using Householder reflectors.
"""
function rrange(A, l::Int=0)
    m, n = size(A)
    if l > m
	    throw(ArgumentError("Cannot find $l linearly independent vectors of $m x $n matrix"))
    end
    Ω = randn(n, l)
    Y = A*Ω
    Q = Matrix(qr!(Y).Q)
    @assert m==size(Q, 1)
    @assert l==size(Q, 2)
    return Q
end

"""
    rrange_adaptive(A, r, ϵ=eps(); maxiter=10)

Compute an orthogonal basis for a subspace of `A` of dimension `l` using adaptive
randomized rangefinding.

Similar to `rrange`, but determines the oversampling parameter adaptively given
a threshold `ϵ`.

# Arguments

- `A`: input matrix. Must support `size(A)` and premultiply.
- `r::Integer`: number of basis vectors to compute.
- `ϵ::Real = eps()`: threshold to determine adaptive fitting.

## Keywords

- `maxiter::Int = 10`: maximum number of iterations to run.

# Output

`::Matrix`: matrix of dimension `size(A,1)` x l containing the basis
vectors of the computed subspace of `A`.

# References

Algorithm 4.2 of [^Halko2011]
"""
function rrange_adaptive(A, r::Integer, ϵ::Real=eps(); maxiter::Int=10)
    m, n = size(A)

    Ω = randn(n,r)
    Y = A*Ω
    Q = zeros(m,0)

    tol = ϵ / (10*√(2/π))
    for j=1:maxiter
        Tol = maximum([norm(Y[:,i]) for i=j:(j+r-1)])
        Tol > tol || break

        y = view(Y,:,j)
        y = Y[:,j] = y - Q*(Q'y)
        q = y/norm(y)
        Q = [Q q]

        ω = randn(n)
        y = A*ω
        y = y - Q*(Q'y)
        Y = [Y y]
        Yb = view(Y, :, (j+1):(j+r-1))
        Yb = Y[:, (j+1):(j+r-1)] = Yb - q * q'Yb

        j==maxiter && warn("Maximum number of iterations reached with norm $Tol > $tol")
    end
    Q
end

basis(V) = Matrix(qr(V).Q)

"""
    rrange_si(A, l; At=A', q=0)

Compute an orthonormal basis for a subspace of `A` of dimension `l` using
randomized rangefinding by subspace iteration.

*Note:* Running with `q=0` is functionally equivalent to `rrange`.

# Arguments

- `A`: input matrix. Must support `size(A)` and premultiply.
- `l::Int`: number of basis vectors to compute.

## Keywords

- `At = A'`: transpose of `A`.
- `q::Int = 0`: number of subspace iterations.
- `p` : oversampling parameter. The number of extra basis vectors to use
  in the computation, which get discarded at the end.

# Output

- `::Matrix`: A dense matrix of dimension `size(A,1) x l` containing the basis
  vectors of the computed subspace of `A`.

# Implementation note

Whereas the Reference recommends classical Gram-Schmidt with double
reorthogonalization, we instead compute the basis with `qr()`, which
for dense A computes the QR factorization using Householder reflectors.

# References

Algorithm 4.4 of [^Halko2011]
"""
function rrange_si(A, l::Int; At=A', q::Int=0)
    n = size(A, 2)
    Ω = randn(n,l+p)
    Y = A*Ω
    Q = basis(Y)
    for iter=1:q #Do some power iterations
        Ỹ=At*Q
        Q̃=basis(Ỹ)
        Y=A*Q̃
        Q=basis(Y)
    end
    Q
end

"""
    rrange_f(A, l)

Compute an orthonormal basis for a subspace of `A` of dimension `l` using
naive randomized rangefinding using stochastic randomized Fourier transforms.

*Note:* similar to `rrange`, but does not use gaussian random matrices.

# Arguments

- `A` : input matrix. Must support `size(A)` and premultiply.
- `l::Int` : number of basis vectors to compute.
- `p::Int = 0` : oversampling parameter. The number of extra basis vectors to use
  in the computation, which get discarded at the end.

# Output

- `::Matrix`: matrix of dimension `size(A,1)` x `l` containing the basis
  vectors of the computed subspace of `A`.

# Implementation note

Whereas the Reference recommends classical Gram-Schmidt with double
reorthogonalization, we instead compute the basis with `qr()`, which
for dense `A` computes the QR factorization using Householder reflectors.

# References

Algorithm 4.5 of [^Halko2011]
"""
function rrange_f(A, l::Int)
    n = size(A, 2)
    Ω = srft(l+p)
    Y = A*Ω
    Q = Matrix(qr!(Y).Q)
end

"""
    svd_restricted(A, Q, n)

Compute the SVD factorization of `A` restricted to the subspace spanned by `Q`
using exact projection.

# Arguments

- `A`: input matrix. Must support postmultiply.
- `Q`: matrix containing basis vectors of the subspace whose restriction to is
  desired.

# Output

`::SVD`: singular value decomposition.

# References

Algorithm 5.1 of [^Halko2011]
"""
function svd_restricted(A, Q, n::Int)
    B=Q'A
    S=svd!(B)
    SVD((Q*S.U)[:, 1:n], S.S[1:n], S.Vt[1:n, :])
end

"""
    svdvals_restricted(A, Q, n)

Compute the singular values of `A` restricted to the subspace spanned by `Q`
using exact projection.

# Arguments

- `A`: input matrix. Must support postmultiply.
- `Q`: matrix containing basis vectors of the subspace whose restriction to is
  desired.

# Output

- `::Vector`: estimated singular values of `A`.

# References

Algorithm 5.1 of [^Halko201]
"""
function svdvals_restricted(A, Q, n::Int)
    B=Q'A
    S=svdvals!(B)[1:n]
end

"""
    svd_re(A, Q)

Compute the SVD factorization of `A` restricted to the subspace spanned by `Q`
using row extraction.

*Note:* Remark 5.2 of [^Halko2011] recommends input of `Q` of the form `Q=A*Ω`
where `Ω` is a sample computed by `randn(n,l)` or even `srft(l)`.

# Arguments

- `A`: input matrix. Must support postmultiply
- `Q`: matrix containing basis vectors of the subspace whose restriction to is
  desired. Need not be orthogonal or normalized.

# Output

- `::SVD`: singular value decomposition.

# See also

A faster but less accurate variant of [`svd_restricted`](@ref) which uses the
interpolative decomposition `id`.

# References

Algorithm 5.2 of [^Halko2011]
"""
function svd_re(A, Q)
    F = id(Q)
    X, J = F[:B], F[:P]
    R′, W′= qr(A[J, :])
    Z = X*R′
    S=svd(Z)
    SVD(S.U, S.S, S.Vt * W′)
end

"""
    eigen_restricted(A, Q)

Compute the spectral (`Eigen`) factorization of `A` restricted to the subspace
spanned by `Q` using row extraction.

# Arguments

- `A::Hermitian`: input matrix. Must be `Hermitian` and support pre- and post-multiply.
- `Q`: orthonormal matrix containing basis vectors of the subspace whose
  restriction to is desired.

# Output

- `::LinearAlgebra.Eigen`: eigen factorization.

# References

Algorithm 5.3 of [^Halko2011]
"""
function eigen_restricted(A::Hermitian, Q)
    B = Q'A*Q
    E = eigen!(B)
    Eigen(E.values, Q*E.vectors)
end

"""
    eigen_re(A, Q)

Compute the spectral (`Eigen`) factorization of `A` restricted to the subspace
spanned by `Q` using row extraction.

*Note:* Remark 5.2 of [^Halko2011] recommends input of `Q` of the form `Q=A*Ω`
where `Ω` is a sample computed by `randn(n,l)` or even `srft(l)`.

# Arguments

- `A::Hermitian`: input matrix. Must be `Hermitian` and support pre- and post-multiply.
- `Q`: matrix containing basis vectors of the subspace whose restriction to is
  desired. Need not be orthogonal or normalized.

# Output

- `::LinearAlgebra.Eigen`: eigen factorization.

# See also

A faster but less accurate variant of `eigen_restricted()` which uses the
interpolative decomposition `id()`.

# References

Algorithm 5.4 of [^Halko2011]
"""
function eigen_re(A::Hermitian, Q)
    X, J = id(Q)
    F = qr!(X)
    V, R = F.Q, F.R
    Z=R*A[J, J]*R'
    E=eigen(Z)
    Eigen(E.values, V*E.vectors)
end

"""
    eigen_nystrom(A, Q)

Compute the spectral (`Eigen`) factorization of `A` restricted to the subspace
spanned by `Q` using the Nyström method.

# Arguments

- `A`: input matrix. Must be positive semidefinite.
- `Q`: orthonormal matrix containing basis vectors of the subspace whose
  restriction to is desired.

# Output

- `::LinearAlgebra.Eigen`: eigen factorization.

# See also

More accurate than [`eigen_restricted`](@ref) but is restricted to matrices
that can be Cholesky decomposed.

# References

Algorithm 5.5 of [^Halko2011]
"""
function eigen_nystrom(A, Q)
    B₁=A*Q
    B₂=Q'*B₁
    C=cholesky!(Hermitian(B₂))
    F=B₁/C
    S=svd!(F)
    Eigen(S.S.^2, S.U)
end

"""
    eigfact_onepass(A, Ω)

Compute the spectral (`Eigen`) factorization of `A` using only one matrix
product involving `A`.

# Arguments

- `A::Hermitian`: input matrix.
- `Ω`: sample matrix for the column space, e.g. `randn(n, l)` or `srft(l)`.
- `Ω̃;`: sample matrix for the row space. Not neeeded for `Hermitian` matrices.
- `At = A'`: computes transpose of input matrix.

# Output

- `::Base.LingAlg.Eigen`: eigen factorization.

# References

Algorithm 5.6 of [^Halko2011]
"""
function eigen_onepass(A::Hermitian, Ω)
    Y=A*Ω; Q = Matrix(qr!(Y).Q)
    B=(Q'Y)\(Q'Ω)
    E=eigen!(B)
    Eigen(E.values, Q*E.vectors)
end
function eigen_onepass(A, Ω, Ω̃; At=A')
    Y=A *Ω; Q = Matrix(qr!(Y).Q)
    Ỹ=At*Ω; Q̃ = Matrix(qr!(Ỹ).Q)
    #Want least-squares solution to (5.14 and 5.15)
    B=(Q'Y)\(Q̃'Ω)
    B̃=(Q̃'Ỹ)\(Q'Ω̃)
    #Here is a very very very hacky way to solve the problem
    B=0.5(B + B̃')
    E=eigen!(B)
    Eigen(E.values, Q*E.vectors)
end

"""
    reigen(A, l)

Compute the spectral (`Eigen`) decomposition of `A` using a randomized
algorithm.

# Arguments

- `A`: input matrix.
- `l::Int`: number of eigenpairs to find.

# Output

- `::LinearAlgebra.Eigen`: eigen decomposition.

# Implementation note

This is a wrapper around `eigen_onepass()` which uses the randomized
samples found using `srft(l)`.
"""
reigen(A::Hermitian, l::Int) = eigen_onepass(A, srft(l))
reigen(A, l::Int) = eigen_onepass(A, srft(l), srft(l))
